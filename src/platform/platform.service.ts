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

  create(createPlatformInput: CreatePlatformInput) {
    return 'This action adds a new platform';
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
