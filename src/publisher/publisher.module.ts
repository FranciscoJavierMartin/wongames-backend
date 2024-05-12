import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { PublisherService } from '@publisher/publisher.service';
import { PublisherResolver } from '@publisher/publisher.resolver';
import {
  Publisher,
  PublisherSchema,
} from '@publisher/schemas/publisher.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Publisher.name, schema: PublisherSchema },
    ]),
  ],
  providers: [PublisherResolver, PublisherService],
  exports: [PublisherService],
})
export class PublisherModule {}
