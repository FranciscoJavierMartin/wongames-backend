import { Module } from '@nestjs/common';
import { DeveloperService } from './developer.service';
import { DeveloperResolver } from './developer.resolver';
import { Developer, DeveloperSchema } from './schemas/developer.schema';
import { MongooseModule } from '@nestjs/mongoose';

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
