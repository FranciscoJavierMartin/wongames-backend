import { Field, ObjectType } from '@nestjs/graphql';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';
import { Category } from 'src/category/schemas/category.schema';

// TODO: Refactor
export enum Rating {
  FREE = 'FREE',
  pegi3 = 'pegi3',
  pegi7 = 'pegi7',
  pegi12 = 'pegi12',
  pegi16 = 'pegi16',
  pegi18 = 'pegi18',
}

@ObjectType()
@Schema()
export class Game {
  @Field({ description: 'Game name' })
  @Prop({ isRequired: true })
  name: string;

  @Prop()
  shortDescription: string;

  @Prop()
  description: string;

  @Prop({ isRequired: true })
  price: number;

  @Prop()
  releaseDate: Date;

  // TODO: Add proper type
  @Prop()
  rating: Rating;

  @Prop()
  cover: string;

  @Prop()
  gallery: string[];

  @Field(() => [Category])
  @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Category' }] })
  categories: Category[];
}

export type GameDocument = HydratedDocument<Game>;
export const GameSchema = SchemaFactory.createForClass(Game);
