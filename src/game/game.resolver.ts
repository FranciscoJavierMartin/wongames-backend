import { Resolver, Query, Args } from '@nestjs/graphql';
import { GameService } from '@game/game.service';
import { Game } from '@game/schemas/game.shema';

@Resolver(() => Game)
export class GameResolver {
  constructor(private readonly gameService: GameService) {}

  @Query(() => [Game], { name: 'games' })
  findAll() {
    return this.gameService.findAll();
  }

  @Query(() => Game, { name: 'game' })
  findOne(@Args('search', { type: () => String }) search: string) {
    return this.gameService.findOne(search);
  }
}
