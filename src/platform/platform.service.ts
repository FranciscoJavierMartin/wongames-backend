import { Injectable, Logger } from '@nestjs/common';
import { CreatePlatformInput } from './dto/create-platform.input';
import { InjectModel } from '@nestjs/mongoose';
import { Platform } from './schemas/platform.schema';
import { Model } from 'mongoose';

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

  public async findAll(): Promise<Platform[]> {
    return this.platformModel.find().exec();
  }

  public async findOne(search: string): Promise<Platform> {
    return this.platformModel
      .findOne({
        $or: [{ name: search }, { slug: search }],
      })
      .exec();
  }
}
