import { Resolver, Query, Args } from '@nestjs/graphql';
import { PlatformService } from './platform.service';
import { Platform } from './schemas/platform.schema';

@Resolver(() => Platform)
export class PlatformResolver {
  constructor(private readonly platformService: PlatformService) {}

  @Query(() => [Platform], { name: 'platform' })
  findAll() {
    return this.platformService.findAll();
  }

  @Query(() => Platform, { name: 'platform' })
  findOne(@Args('search', { type: () => String }) search: string) {
    return this.platformService.findOne(search);
  }
}
