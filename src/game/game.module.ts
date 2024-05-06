import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { GameService } from './game.service';
import { GameResolver } from './game.resolver';
import { GameController } from './game.controller';
import { Game, GameSchema } from './schemas/game.shema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Game.name, schema: GameSchema }]),
  ],
  providers: [GameResolver, GameService],
  controllers: [GameController],
})
export class GameModule {}
