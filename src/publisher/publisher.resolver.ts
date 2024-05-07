import { Resolver, Query, Args } from '@nestjs/graphql';
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
  findOne(@Args('search', { type: () => String }) search: string) {
    return this.publisherService.findOne(search);
  }
}
