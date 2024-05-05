import { Module } from '@nestjs/common';
import { PublisherService } from './publisher.service';
import { PublisherResolver } from './publisher.resolver';

@Module({
  providers: [PublisherResolver, PublisherService],
})
export class PublisherModule {}
