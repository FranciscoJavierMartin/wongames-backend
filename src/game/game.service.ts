import { Injectable, Logger } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import slugify from 'slugify';
import { Game } from './schemas/game.shema';
import { CreateGameInput } from './dto/create-game.input';
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

  create(createGameInput: CreateGameInput) {
    return 'This action adds a new game';
  }

  public async findAll(): Promise<Game[]> {
    return this.gameModel.find().exec();
  }

  findOne(id: number) {
    return `This action returns a #${id} game`;
  }

  update(id: number, updateGameInput: UpdateGameInput) {
    return `This action updates a #${id} game`;
  }

  remove(id: number) {
    return `This action removes a #${id} game`;
  }

  public async populate(options: Record<string, string>) {
    try {
      // const query = new URLSearchParams(options);
      // const gogApiUrl = `https://catalog.gog.com/v1/catalog?${query.toString()}`;
      // const res = await fetch(gogApiUrl);
      // const products: Product[] = (await res.json()).products;
      // await this.createManyToManyData(products);
    } catch (error) {
      this.logger.error(error);
    }
    // const createdGame = new this.gameModel({ name: new Date().toTimeString() });
    // return createdGame.save();
    // return await this.categoryService.findAll();
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
}
