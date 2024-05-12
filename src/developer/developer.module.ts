import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { DeveloperService } from '@developer/developer.service';
import { DeveloperResolver } from '@developer/developer.resolver';
import {
  Developer,
  DeveloperSchema,
} from '@developer/schemas/developer.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Developer.name, schema: DeveloperSchema },
    ]),
  ],
  providers: [DeveloperResolver, DeveloperService],
  exports: [DeveloperService],
})
export class DeveloperModule {}
