import { Injectable } from '@nestjs/common';
import { CreateDeveloperInput } from './dto/create-developer.input';
import { UpdateDeveloperInput } from './dto/update-developer.input';
import { Developer } from './schemas/developer.schema';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class DeveloperService {
  constructor(
    @InjectModel(Developer.name)
    private developerModel: Model<Developer>,
  ) {}

  create(createDeveloperInput: CreateDeveloperInput) {
    return 'This action adds a new developer';
  }

  public async findAll(): Promise<Developer[]> {
    return this.developerModel.find().exec();
  }

  findOne(id: number) {
    return `This action returns a #${id} developer`;
  }

  update(id: number, updateDeveloperInput: UpdateDeveloperInput) {
    return `This action updates a #${id} developer`;
  }

  remove(id: number) {
    return `This action removes a #${id} developer`;
  }
}
