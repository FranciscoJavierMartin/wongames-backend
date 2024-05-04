import { Injectable } from '@nestjs/common';
import {Model} from 'mongoose'
import {InjectModel} from '@nestjs/mongoose'
import {Game as GameModel} from './schemas/game.shema'
import { CreateGameInput } from './dto/create-game.input';
import { UpdateGameInput } from './dto/update-game.input';
import { Game } from './entities/game.entity';

@Injectable()
export class GameService {
  constructor(@InjectModel(GameModel.name) private gameModel: Model<Game>){}

  create(createGameInput: CreateGameInput) {
    return 'This action adds a new game';
  }

  findAll(): Game[] {
    return [{ exampleField: 1 }];
  }

  findOne(id: number) {
    return `This action returns a #${id} game`;
  }

  update(id: number, updateGameInput: UpdateGameInput) {
    return `This action updates a #${id} game`;
  }

  remove(id: number) {
    return `This action removes a #${id} game`;
  }

  public async populate() {
    const createdGame = new this.gameModel({name: new Date().toTimeString()})
    return createdGame;
  }
}
