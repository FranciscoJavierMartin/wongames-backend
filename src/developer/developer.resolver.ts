import { Resolver, Query, Args, Int } from '@nestjs/graphql';
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
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.developerService.findOne(id);
  }
}
