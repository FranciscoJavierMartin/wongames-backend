import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { PlatformService } from './platform.service';
import { Platform } from './entities/platform.entity';
import { CreatePlatformInput } from './dto/create-platform.input';
import { UpdatePlatformInput } from './dto/update-platform.input';

@Resolver(() => Platform)
export class PlatformResolver {
  constructor(private readonly platformService: PlatformService) {}

  @Mutation(() => Platform)
  createPlatform(@Args('createPlatformInput') createPlatformInput: CreatePlatformInput) {
    return this.platformService.create(createPlatformInput);
  }

  @Query(() => [Platform], { name: 'platform' })
  findAll() {
    return this.platformService.findAll();
  }

  @Query(() => Platform, { name: 'platform' })
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.platformService.findOne(id);
  }

  @Mutation(() => Platform)
  updatePlatform(@Args('updatePlatformInput') updatePlatformInput: UpdatePlatformInput) {
    return this.platformService.update(updatePlatformInput.id, updatePlatformInput);
  }

  @Mutation(() => Platform)
  removePlatform(@Args('id', { type: () => Int }) id: number) {
    return this.platformService.remove(id);
  }
}
