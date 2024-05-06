import { Injectable } from '@nestjs/common';
import { CreatePublisherInput } from './dto/create-publisher.input';
import { UpdatePublisherInput } from './dto/update-publisher.input';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Publisher } from './schemas/publisher.schema';

@Injectable()
export class PublisherService {
  constructor(
    @InjectModel(Publisher.name)
    private publisherModel: Model<Publisher>,
  ) {}

  create(createPublisherInput: CreatePublisherInput) {
    return 'This action adds a new publisher';
  }

  public async findAll(): Promise<Publisher[]> {
    return this.publisherModel.find().exec();
  }

  findOne(id: number) {
    return `This action returns a #${id} publisher`;
  }

  update(id: number, updatePublisherInput: UpdatePublisherInput) {
    return `This action updates a #${id} publisher`;
  }

  remove(id: number) {
    return `This action removes a #${id} publisher`;
  }
}
