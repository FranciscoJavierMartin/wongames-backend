import { Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateCategoryInput } from './dto/create-category.input';
import { Category } from './schemas/category.schema';

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

  public async findAll(): Promise<Category[]> {
    return this.categoryModel.find().exec();
  }

  public async findOne(search: string): Promise<Category> {
    return this.categoryModel
      .findOne({
        $or: [{ name: search }, { slug: search }],
      })
      .exec();
  }
}
