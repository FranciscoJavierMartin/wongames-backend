import { Module } from '@nestjs/common';
import { GameService } from './game.service';
import { GameResolver } from './game.resolver';
import { GameController } from './game.controller';

@Module({
  providers: [GameResolver, GameService],
  controllers: [GameController],
})
export class GameModule {}
