import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Game } from './schemas/game.shema';
import { CreateGameInput } from './dto/create-game.input';
import { UpdateGameInput } from './dto/update-game.input';
import { CategoryService } from 'src/category/category.service';

@Injectable()
export class GameService {
  constructor(
    @InjectModel(Game.name) private gameModel: Model<Game>,
    private readonly categoryService: CategoryService,
  ) {}

  create(createGameInput: CreateGameInput) {
    return 'This action adds a new game';
  }

  public async findAll(): Promise<Game[]> {
    return this.gameModel.find().exec();
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
    // const createdGame = new this.gameModel({ name: new Date().toTimeString() });
    // return createdGame.save();
    // return await this.categoryService.findAll();
  }
}
