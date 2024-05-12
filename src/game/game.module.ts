import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigOptions, v2 as cloudinary } from 'cloudinary';
import { EnvVars } from '@config/index';
import { GameService } from '@game/game.service';
import { GameResolver } from '@game/game.resolver';
import { GameController } from '@game/game.controller';
import { Game, GameSchema } from '@game/schemas/game.shema';
import { CategoryModule } from '@category/category.module';
import { DeveloperModule } from '@developer/developer.module';
import { PlatformModule } from '@platform/platform.module';
import { PublisherModule } from '@publisher/publisher.module';
import { Category, CategorySchema } from '@category/schemas/category.schema';
import {
  Developer,
  DeveloperSchema,
} from '@developer/schemas/developer.schema';
import { Platform, PlatformSchema } from '@platform/schemas/platform.schema';
import {
  Publisher,
  PublisherSchema,
} from '@publisher/schemas/publisher.schema';

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
  providers: [
    {
      inject: [ConfigService],
      provide: 'Cloudinary',
      useFactory: (configService: ConfigService): ConfigOptions =>
        cloudinary.config({
          cloud_name: configService.get(EnvVars.CLOUDINARY_CLOUD_NAME),
          api_key: configService.get(EnvVars.CLOUDINARY_API_KEY),
          api_secret: configService.get(EnvVars.CLOUDINARY_API_SECRET),
        }),
    },
    GameResolver,
    GameService,
  ],
  controllers: [GameController],
})
export class GameModule {}
