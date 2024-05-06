import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Game } from './schemas/game.shema';
import { CreateGameInput } from './dto/create-game.input';
import { UpdateGameInput } from './dto/update-game.input';
import { CategoryService } from 'src/category/category.service';
import { DeveloperService } from 'src/developer/developer.service';
import { PlatformService } from 'src/platform/platform.service';
import { PublisherService } from 'src/publisher/publisher.service';

@Injectable()
export class GameService {
  constructor(
    @InjectModel(Game.name) private gameModel: Model<Game>,
    private readonly categoryService: CategoryService,
    private readonly developerService: DeveloperService,
    private readonly platformService: PlatformService,
    private readonly publisherService: PublisherService,
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

  public async populate(options: object) {
    
    // const createdGame = new this.gameModel({ name: new Date().toTimeString() });
    // return createdGame.save();
    // return await this.categoryService.findAll();
  }
}
