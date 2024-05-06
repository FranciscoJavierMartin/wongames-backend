import { Resolver, Query, Args, Int } from '@nestjs/graphql';
import { GameService } from './game.service';
import { Game } from './schemas/game.shema';

@Resolver(() => Game)
export class GameResolver {
  constructor(private readonly gameService: GameService) {}

  @Query(() => [Game], { name: 'games' })
  findAll() {
    return this.gameService.findAll();
  }

  @Query(() => Game, { name: 'game' })
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.gameService.findOne(id);
  }
}
