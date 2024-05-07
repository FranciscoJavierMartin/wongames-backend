import { Resolver, Query, Args } from '@nestjs/graphql';
import { DeveloperService } from './developer.service';
import { Developer } from './schemas/developer.schema';

@Resolver(() => Developer)
export class DeveloperResolver {
  constructor(private readonly developerService: DeveloperService) {}

  @Query(() => [Developer], { name: 'developers' })
  findAll() {
    return this.developerService.findAll();
  }

  @Query(() => Developer, { name: 'developer' })
  findOne(@Args('search', { type: () => String }) search: string) {
    return this.developerService.findOne(search);
  }
}
