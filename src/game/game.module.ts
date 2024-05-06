import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { GameService } from './game.service';
import { GameResolver } from './game.resolver';
import { GameController } from './game.controller';
import { Game, GameSchema } from './schemas/game.shema';
import { CategoryModule } from 'src/category/category.module';
import { DeveloperModule } from 'src/developer/developer.module';
import { PlatformModule } from 'src/platform/platform.module';
import { PublisherModule } from 'src/publisher/publisher.module';
import { Category, CategorySchema } from 'src/category/schemas/category.schema';
import {
  Developer,
  DeveloperSchema,
} from 'src/developer/schemas/developer.schema';
import { Platform, PlatformSchema } from 'src/platform/schemas/platform.schema';
import {
  Publisher,
  PublisherSchema,
} from 'src/publisher/schemas/publisher.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Game.name, schema: GameSchema },
      { name: Category.name, schema: CategorySchema },
      { name: Developer.name, schema: DeveloperSchema },
      { name: Platform.name, schema: PlatformSchema },
      { name: Publisher.name, schema: PublisherSchema },
    ]),
    CategoryModule,
    DeveloperModule,
    PlatformModule,
    PublisherModule,
  ],
  providers: [GameResolver, GameService],
  controllers: [GameController],
})
export class GameModule {}
