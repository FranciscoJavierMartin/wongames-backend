import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { PlatformService } from '@platform/platform.service';
import { PlatformResolver } from '@platform/platform.resolver';
import { Platform, PlatformSchema } from '@platform/schemas/platform.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Platform.name, schema: PlatformSchema },
    ]),
  ],
  providers: [PlatformResolver, PlatformService],
  exports: [PlatformService],
})
export class PlatformModule {}
