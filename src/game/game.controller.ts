import { Controller, Post } from '@nestjs/common';
import { GameService } from './game.service';

@Controller('game')
export class GameController {
  constructor(private readonly gameService: GameService) {}

  @Post('populate')
  public async populate() {
    return this.gameService.populate();
  }
}
