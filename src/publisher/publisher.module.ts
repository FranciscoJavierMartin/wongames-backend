import { Module } from '@nestjs/common';
import { PublisherService } from './publisher.service';
import { PublisherResolver } from './publisher.resolver';
import { MongooseModule } from '@nestjs/mongoose';
import { Publisher, PublisherSchema } from './schemas/publisher.schema';

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
