import { Injectable, Logger } from '@nestjs/common';
import { CreateDeveloperInput } from './dto/create-developer.input';
import { Developer } from './schemas/developer.schema';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class DeveloperService {
  private readonly logger = new Logger(DeveloperService.name);

  constructor(
    @InjectModel(Developer.name)
    private developerModel: Model<Developer>,
  ) {}

  public async create(
    createDeveloperInput: CreateDeveloperInput,
  ): Promise<void> {
    await this.developerModel.findOneAndUpdate(
      createDeveloperInput,
      createDeveloperInput,
      { upsert: true },
    );

    this.logger.log(`Created ${createDeveloperInput.name} developer`);
  }

  public async findAll(): Promise<Developer[]> {
    return this.developerModel.find().exec();
  }

  public async findOne(search: string): Promise<Developer> {
    return this.developerModel
      .findOne({
        $or: [{ name: search }, { slug: search }],
      })
      .exec();
  }
}
