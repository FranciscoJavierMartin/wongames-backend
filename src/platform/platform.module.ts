import { Module } from '@nestjs/common';
import { PlatformService } from './platform.service';
import { PlatformResolver } from './platform.resolver';

@Module({
  providers: [PlatformResolver, PlatformService],
})
export class PlatformModule {}
