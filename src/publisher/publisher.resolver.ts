import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { PublisherService } from './publisher.service';
import { Publisher } from './entities/publisher.entity';
import { CreatePublisherInput } from './dto/create-publisher.input';
import { UpdatePublisherInput } from './dto/update-publisher.input';

@Resolver(() => Publisher)
export class PublisherResolver {
  constructor(private readonly publisherService: PublisherService) {}

  @Mutation(() => Publisher)
  createPublisher(@Args('createPublisherInput') createPublisherInput: CreatePublisherInput) {
    return this.publisherService.create(createPublisherInput);
  }

  @Query(() => [Publisher], { name: 'publisher' })
  findAll() {
    return this.publisherService.findAll();
  }

  @Query(() => Publisher, { name: 'publisher' })
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.publisherService.findOne(id);
  }

  @Mutation(() => Publisher)
  updatePublisher(@Args('updatePublisherInput') updatePublisherInput: UpdatePublisherInput) {
    return this.publisherService.update(updatePublisherInput.id, updatePublisherInput);
  }

  @Mutation(() => Publisher)
  removePublisher(@Args('id', { type: () => Int }) id: number) {
    return this.publisherService.remove(id);
  }
}
