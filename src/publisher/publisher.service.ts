import { Injectable, Logger } from '@nestjs/common';
import { Model, Types } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { CreatePublisherInput } from './dto/create-publisher.input';
import { Publisher } from './schemas/publisher.schema';
import { Game } from 'src/game/schemas/game.shema';

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
    publisherId: Types.ObjectId,
    gameId: Types.ObjectId,
  ): Promise<void> {
    await this.publisherModel.findByIdAndUpdate(publisherId, {
      $push: {
        games: gameId,
      },
    });
  }

  public async findAll(): Promise<Publisher[]> {
    return this.publisherModel.find().populate('games', null, Game.name).exec();
  }

  public async findOne(search: string): Promise<Publisher> {
    return this.publisherModel
      .findOne({
        $or: [{ name: search }, { slug: search }],
      })
      .populate('games', null, Game.name)
      .exec();
  }

  public async purge(): Promise<void> {
    await this.publisherModel.deleteMany();
  }
}
