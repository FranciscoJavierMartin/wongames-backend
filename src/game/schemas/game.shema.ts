import { Field, ObjectType } from '@nestjs/graphql';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';
import { Category } from 'src/category/schemas/category.schema';
import { Developer } from 'src/developer/schemas/developer.schema';
import { Platform } from 'src/platform/schemas/platform.schema';
import { Publisher } from 'src/publisher/schemas/publisher.schema';

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
  @Field(() => String)
  @Prop({ type: Types.ObjectId })
  _id: Types.ObjectId;

  @Field({ description: 'Game name' })
  @Prop({ isRequired: true })
  name: string;

  @Prop()
  slug: string;

  @Prop()
  shortDescription: string;

  @Prop()
  description: string;

  @Prop({ isRequired: true, default: 0 })
  price: number = 0;

  @Prop()
  releaseDate: Date;

  @Prop()
  publishedAt: Date;

  // TODO: Add proper type
  @Prop({ type: String, enum: Rating, default: Rating.FREE })
  rating: Rating = Rating.FREE;

  @Prop()
  cover: string;

  @Prop()
  gallery: string[];

  @Field(() => [Category])
  @Prop({ type: [{ type: Types.ObjectId, ref: 'Category' }], default: [] })
  categories: Category[];

  @Field(() => [Platform])
  @Prop({ type: [{ type: Types.ObjectId, ref: 'Platform' }], default: [] })
  platforms: Platform[];

  @Field(() => [Developer])
  @Prop({ type: [{ type: Types.ObjectId, ref: 'Developer' }], default: [] })
  developers: Developer[];

  @Field(() => Publisher)
  @Prop({ type: Types.ObjectId, ref: 'Publisher' })
  publisher: Publisher;
}

export type GameDocument = HydratedDocument<Game>;
export const GameSchema = SchemaFactory.createForClass(Game);
