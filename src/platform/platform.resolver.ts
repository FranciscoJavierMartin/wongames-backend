import { Resolver, Query, Args } from '@nestjs/graphql';
import { PlatformService } from '@platform/platform.service';
import { Platform } from '@platform/schemas/platform.schema';

@Resolver(() => Platform)
export class PlatformResolver {
  constructor(private readonly platformService: PlatformService) {}

  @Query(() => [Platform], { name: 'platforms' })
  findAll() {
    return this.platformService.findAll();
  }

  @Query(() => Platform, { name: 'platform' })
  findOne(@Args('search', { type: () => String }) search: string) {
    return this.platformService.findOne(search);
  }
}
