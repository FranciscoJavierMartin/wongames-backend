import { Injectable, Logger } from '@nestjs/common';
import { Model, Types } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { CreatePublisherInput } from './dto/create-publisher.input';
import { Publisher } from './schemas/publisher.schema';

@Injectable()
export class PublisherService {
  private readonly logger = new Logger(PublisherService.name);

  constructor(
    @InjectModel(Publisher.name)
    private publisherModel: Model<Publisher>,
  ) {}

  public async create(
    createPublisherInput: CreatePublisherInput,
  ): Promise<void> {
    await this.publisherModel.findOneAndUpdate(
      createPublisherInput,
      createPublisherInput,
      { upsert: true },
    );

    this.logger.log(`Created ${createPublisherInput.name} publisher`);
  }

  public async addGame(
    categoryId: Types.ObjectId,
    gameId: Types.ObjectId,
  ): Promise<void> {
    await this.publisherModel.findByIdAndUpdate(categoryId, {
      $push: {
        games: gameId,
      },
    });
  }

  public async findAll(): Promise<Publisher[]> {
    return this.publisherModel.find().exec();
  }

  public async findOne(search: string): Promise<Publisher> {
    return this.publisherModel
      .findOne({
        $or: [{ name: search }, { slug: search }],
      })
      .exec();
  }
}
