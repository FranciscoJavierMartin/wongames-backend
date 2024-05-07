import { Injectable, Logger } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import slugify from 'slugify';
import { JSDOM } from 'jsdom';
import {
  UploadApiErrorResponse,
  UploadApiResponse,
  v2 as cloudinary,
} from 'cloudinary';
import { Game, Rating } from './schemas/game.shema';
import { CategoryService } from 'src/category/category.service';
import { DeveloperService } from 'src/developer/developer.service';
import { PlatformService } from 'src/platform/platform.service';
import { PublisherService } from 'src/publisher/publisher.service';
import { Product } from './dto/gog.products';
import { ConfigService } from '@nestjs/config';
import { EnvVars } from 'src/config';

@Injectable()
export class GameService {
  private readonly logger = new Logger(GameService.name);

  constructor(
    @InjectModel(Game.name) private gameModel: Model<Game>,
    private readonly categoryService: CategoryService,
    private readonly developerService: DeveloperService,
    private readonly platformService: PlatformService,
    private readonly publisherService: PublisherService,
    private readonly configService: ConfigService,
  ) {}

  public async findAll(): Promise<Game[]> {
    return this.gameModel.find().exec();
  }

  public async findOne(search: string): Promise<Game> {
    return this.gameModel
      .findOne({
        $or: [{ name: search }, { slug: search }],
      })
      .exec();
  }

  public async populate(options: Record<string, string>) {
    try {
      const query = new URLSearchParams(options);
      const gogApiUrl = `https://catalog.gog.com/v1/catalog?${query.toString()}`;
      const res = await fetch(gogApiUrl);
      const products: Product[] = (await res.json()).products;
      await this.createManyToManyData(products);
      await this.createGames(products);
    } catch (error) {
      this.logger.error(error);
    }
  }

  private async createManyToManyData(products: Product[]): Promise<void> {
    const developersSet = new Set<string>();
    const publishersSet = new Set<string>();
    const categoriesSet = new Set<string>();
    const platformsSet = new Set<string>();

    products.forEach(({ developers, publishers, genres, operatingSystems }) => {
      genres?.forEach(({ name }) => {
        categoriesSet.add(name);
      });

      operatingSystems?.forEach((item) => {
        platformsSet.add(item);
      });

      developers?.forEach((item) => {
        developersSet.add(item);
      });

      publishers?.forEach((item) => {
        publishersSet.add(item);
      });
    });

    await Promise.all([
      ...Array.from(developersSet).map((name) =>
        this.developerService.create({
          name,
          slug: slugify(name, { strict: true, lower: true }),
        }),
      ),
      ...Array.from(publishersSet).map((name) =>
        this.publisherService.create({
          name,
          slug: slugify(name, { strict: true, lower: true }),
        }),
      ),
      ...Array.from(categoriesSet).map((name) =>
        this.categoryService.create({
          name,
          slug: slugify(name, { strict: true, lower: true }),
        }),
      ),
      ...Array.from(platformsSet).map((name) =>
        this.platformService.create({
          name,
          slug: slugify(name, { strict: true, lower: true }),
        }),
      ),
    ]);
  }

  private async createGames(products: Product[]): Promise<void> {
    await Promise.all(
      products.map(async (product: Product) => this.createGame(product)),
    );
  }

  private async createGame(product: Product): Promise<void> {
    const gameCreated = await this.gameModel.findOneAndUpdate(
      { name: product.title },
      {
        name: product.title,
        slug: product.slug,
        price: product.price.finalMoney.amount,
        releaseDate: new Date(product.releaseDate),
        publishedAt: new Date(),
        ...(await this.getGameInfo(product.slug)),
        categories: await Promise.all(
          product.genres.map(
            async ({ name }) => (await this.categoryService.findOne(name))._id,
          ),
        ),
        platforms: await Promise.all(
          product.operatingSystems.map(
            async (name) => (await this.platformService.findOne(name))._id,
          ),
        ),
        developers: await Promise.all(
          product.developers.map(
            async (name) => (await this.developerService.findOne(name))._id,
          ),
        ),
        publisher: await Promise.all(
          product.publishers.map(
            async (name) => (await this.publisherService.findOne(name))._id,
          ),
        ),
      },
      {
        upsert: true,
        new: true,
      },
    );

    const cover: string = await this.saveImage(
      gameCreated._id.toString(),
      product.coverHorizontal,
    ).catch((error) => {
      this.logger.error(error);
      return '';
    });

    const gallery: string[] = await Promise.all(
      product.screenshots
        .slice(0, 5)
        .map(
          async (url: string, index: number) =>
            await this.saveImage(
              `${gameCreated._id}_${index}`,
              `${url.replace('{formatter}', 'product_card_v2_mobile_slider_639')}`,
            ),
        ),
    ).catch((error) => {
      this.logger.error(error);
      return [];
    });

    await this.gameModel.findByIdAndUpdate(gameCreated._id, {
      cover,
      gallery,
    });
  }

  private async getGameInfo(slug: string): Promise<{
    description: string;
    shortDescription: string;
    rating: Rating;
  }> {
    const gogSlug = slug.replaceAll('-', '_').toLowerCase();
    const res = await fetch(`https://www.gog.com/game/${gogSlug}`);
    const body = await res.text();
    const dom = new JSDOM(body);
    const raw_description = dom.window.document.querySelector('.description');
    const description = raw_description.innerHTML;
    const shortDescription = raw_description.textContent.slice(0, 160);
    const ratingElement = dom.window.document.querySelector(
      '.age-restrictions__icon use',
    );
    const rating = ratingElement
      ? (ratingElement
          .getAttribute('xlink:href')
          .replace(/_/g, '')
          .replace('#', '') as Rating)
      : Rating.FREE;

    return {
      shortDescription,
      description,
      rating,
    };
  }

  private async saveImage(gameId: string, imageUrl: string): Promise<string> {
    return new Promise((resolve, reject) => {
      cloudinary.uploader.upload(
        imageUrl,
        {
          public_id: gameId,
          resource_type: 'image',
          overwrite: true,
          folder: this.configService.get(EnvVars.CLOUDINARY_FOLDER),
        },
        (error?: UploadApiErrorResponse, result?: UploadApiResponse) => {
          if (error) {
            reject(error);
          } else {
            resolve(result.url);
          }
        },
      );
    });
  }
}
