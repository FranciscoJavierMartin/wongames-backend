import { Controller, Delete, Post, Query } from '@nestjs/common';
import { GameService } from '@game/game.service';

@Controller('game')
export class GameController {
  constructor(private readonly gameService: GameService) {}

  @Post('populate')
  public async populate(@Query() queryParams: object) {
    return this.gameService.populate({
      limit: '48',
      order: 'desc:trending',
      ...queryParams,
    });
  }

  @Delete('purge')
  public async purge() {
    return this.gameService.purge();
  }
}
