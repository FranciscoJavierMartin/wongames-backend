import { Injectable, Logger } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import slugify from 'slugify';
import { Game, Rating } from './schemas/game.shema';
import { UpdateGameInput } from './dto/update-game.input';
import { CategoryService } from 'src/category/category.service';
import { DeveloperService } from 'src/developer/developer.service';
import { PlatformService } from 'src/platform/platform.service';
import { PublisherService } from 'src/publisher/publisher.service';
import { Product } from './dto/gog.products';

@Injectable()
export class GameService {
  private readonly logger = new Logger(GameService.name);

  constructor(
    @InjectModel(Game.name) private gameModel: Model<Game>,
    private readonly categoryService: CategoryService,
    private readonly developerService: DeveloperService,
    private readonly platformService: PlatformService,
    private readonly publisherService: PublisherService,
  ) {}

  public async findAll(): Promise<Game[]> {
    return this.gameModel.find().exec();
  }

  findOne(id: number) {
    return `This action returns a #${id} game`;
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
      ...Array.from(developersSet).map((name) =>
        this.platformService.create({
          name,
          slug: slugify(name, { strict: true, lower: true }),
        }),
      ),
    ]);
  }

  private async createGames(products: Product[]): Promise<void> {
    await Promise.all(
      products.map(async (product: Product) => this.create(product)),
    );
  }

  private async create(product: Product) {
    this.gameModel.findOneAndUpdate(
      { name: product.title },
      {
        name: product.title,
        slug: product.slug,
        price: product.price.finalMoney.amount,
        releaseDate: new Date(product.releaseDate),
        publishedAt: new Date(),
        ...(await this.getGameInfo(product.slug)),
      },
    );
  }

  private async getGameInfo(slug: string): Promise<{
    description: string;
    shortDescription: string;
    rating: Rating;
  }> {
    return {};
  }
}
