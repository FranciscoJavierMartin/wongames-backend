import { Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { CreateCategoryInput } from '@category/dto/create-category.input';
import { Category } from '@category/schemas/category.schema';
import { Game } from '@game/schemas/game.shema';

@Injectable()
export class CategoryService {
  private readonly logger = new Logger(CategoryService.name);

  constructor(
    @InjectModel(Category.name)
    private categoryModel: Model<Category>,
  ) {}

  public async create(createCategoryInput: CreateCategoryInput): Promise<void> {
    await this.categoryModel.findOneAndUpdate(
      createCategoryInput,
      createCategoryInput,
      { upsert: true },
    );

    this.logger.log(`Created ${createCategoryInput.name} category`);
  }

  public async addGame(
    categoryId: Types.ObjectId,
    gameId: Types.ObjectId,
  ): Promise<void> {
    await this.categoryModel.findByIdAndUpdate(categoryId, {
      $push: {
        games: gameId,
      },
    });
  }

  public async findAll(): Promise<Category[]> {
    return this.categoryModel.find().populate('games', null, Game.name).exec();
  }

  public async findOne(search: string): Promise<Category> {
    return this.categoryModel
      .findOne({
        $or: [{ name: search }, { slug: search }],
      })
      .populate('games', null, Game.name)
      .exec();
  }

  public async purge(): Promise<void> {
    await this.categoryModel.deleteMany();
  }
}
