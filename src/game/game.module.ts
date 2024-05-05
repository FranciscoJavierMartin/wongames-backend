import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { GameService } from './game.service';
import { GameResolver } from './game.resolver';
import { GameController } from './game.controller';
import { Game, GameSchema } from './schemas/game.shema';
import { Category, CategorySchema } from 'src/category/schemas/category.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Game.name, schema: GameSchema }]),
    MongooseModule.forFeature([
      { name: Category.name, schema: CategorySchema },
    ]),
  ],
  providers: [GameResolver, GameService],
  controllers: [GameController],
})
export class GameModule {}
