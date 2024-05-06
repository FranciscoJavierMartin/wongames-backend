import { Resolver, Query, Args, Int } from '@nestjs/graphql';
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
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.platformService.findOne(id);
  }
}
