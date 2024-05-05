import { Injectable } from '@nestjs/common';
import { CreatePublisherInput } from './dto/create-publisher.input';
import { UpdatePublisherInput } from './dto/update-publisher.input';

@Injectable()
export class PublisherService {
  create(createPublisherInput: CreatePublisherInput) {
    return 'This action adds a new publisher';
  }

  findAll() {
    return `This action returns all publisher`;
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
