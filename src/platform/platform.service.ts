import { Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { CreatePlatformInput } from './dto/create-platform.input';
import { Platform } from './schemas/platform.schema';
import { Game } from 'src/game/schemas/game.shema';

@Injectable()
export class PlatformService {
  private readonly logger = new Logger(PlatformService.name);

  constructor(
    @InjectModel(Platform.name)
    private platformModel: Model<Platform>,
  ) {}

  public async create(createPlatformInput: CreatePlatformInput): Promise<void> {
    await this.platformModel.findOneAndUpdate(
      createPlatformInput,
      createPlatformInput,
      { upsert: true },
    );

    this.logger.log(`Created ${createPlatformInput.name} platform`);
  }

  public async addGame(
    platformId: Types.ObjectId,
    gameId: Types.ObjectId,
  ): Promise<void> {
    await this.platformModel.findByIdAndUpdate(platformId, {
      $push: {
        games: gameId,
      },
    });
  }

  public async findAll(): Promise<Platform[]> {
    return this.platformModel.find().populate('games', null, Game.name).exec();
  }

  public async findOne(search: string): Promise<Platform> {
    return this.platformModel
      .findOne({
        $or: [{ name: search }, { slug: search }],
      })
      .populate('games', null, Game.name)
      .exec();
  }

  public async purge(): Promise<void> {
    await this.platformModel.deleteMany();
  }
}
