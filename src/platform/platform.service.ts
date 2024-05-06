import { Injectable } from '@nestjs/common';
import { CreatePlatformInput } from './dto/create-platform.input';
import { UpdatePlatformInput } from './dto/update-platform.input';
import { InjectModel } from '@nestjs/mongoose';
import { Platform } from './schemas/platform.schema';
import { Model } from 'mongoose';

@Injectable()
export class PlatformService {
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
  }

  public async findAll(): Promise<Platform[]> {
    return this.platformModel.find().exec();
  }

  findOne(id: number) {
    return `This action returns a #${id} platform`;
  }

  update(id: number, updatePlatformInput: UpdatePlatformInput) {
    return `This action updates a #${id} platform`;
  }

  remove(id: number) {
    return `This action removes a #${id} platform`;
  }
}
