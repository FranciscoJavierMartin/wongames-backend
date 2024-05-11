import { Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { CreateDeveloperInput } from './dto/create-developer.input';
import { Developer } from './schemas/developer.schema';
import { Game } from 'src/game/schemas/game.shema';

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

  public async addGame(
    developerId: Types.ObjectId,
    gameId: Types.ObjectId,
  ): Promise<void> {
    await this.developerModel.findByIdAndUpdate(developerId, {
      $push: {
        games: gameId,
      },
    });
  }

  public async findAll(): Promise<Developer[]> {
    return this.developerModel.find().populate('games', null, Game.name).exec();
  }

  public async findOne(search: string): Promise<Developer> {
    return this.developerModel
      .findOne({
        $or: [{ name: search }, { slug: search }],
      })
      .populate('games', null, Game.name)
      .exec();
  }

  public async purge(): Promise<void> {
    await this.developerModel.deleteMany();
  }
}
