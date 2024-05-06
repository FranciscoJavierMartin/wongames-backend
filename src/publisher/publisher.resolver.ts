import { Resolver, Query, Args, Int } from '@nestjs/graphql';
import { PublisherService } from './publisher.service';
import { Publisher } from './schemas/publisher.schema';

@Resolver(() => Publisher)
export class PublisherResolver {
  constructor(private readonly publisherService: PublisherService) {}

  @Query(() => [Publisher], { name: 'publisher' })
  findAll() {
    return this.publisherService.findAll();
  }

  @Query(() => Publisher, { name: 'publisher' })
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.publisherService.findOne(id);
  }
}
