import {
  Field,
  ObjectType,
  Float,
  registerEnumType,
  GraphQLISODateTime,
} from '@nestjs/graphql';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';
import { Category } from '@category/schemas/category.schema';
import { Developer } from '@developer/schemas/developer.schema';
import { Platform } from '@platform/schemas/platform.schema';
import { Publisher } from '@publisher/schemas/publisher.schema';

export enum Rating {
  FREE = 'FREE',
  pegi3 = 'pegi3',
  pegi7 = 'pegi7',
  pegi12 = 'pegi12',
  pegi16 = 'pegi16',
  pegi18 = 'pegi18',
}

registerEnumType(Rating, {
  name: 'Rating',
});

@ObjectType()
@Schema()
export class Game {
  @Field(() => String)
  @Prop({ type: Types.ObjectId })
  _id: Types.ObjectId;

  @Field(() => String, { description: 'Game name' })
  @Prop({ isRequired: true })
  name: string;

  @Field(() => String)
  @Prop()
  slug: string;

  @Field(() => String)
  @Prop()
  shortDescription: string;

  @Field(() => String)
  @Prop()
  description: string;

  @Field(() => Float)
  @Prop({ isRequired: true, default: 0 })
  price: number = 0;

  @Field(() => GraphQLISODateTime)
  @Prop()
  releaseDate: Date;

  @Field(() => GraphQLISODateTime)
  @Prop()
  publishedAt: Date;

  @Field(() => Rating)
  @Prop({ type: String, enum: Rating, default: Rating.FREE })
  rating: Rating = Rating.FREE;

  @Field(() => String)
  @Prop({ default: '' })
  cover: string;

  @Field(() => [String])
  @Prop({ default: [] })
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

  @Field(() => [Publisher])
  @Prop({ type: [{ type: Types.ObjectId, ref: 'Publisher' }], default: [] })
  publishers: Publisher[];
}

export type GameDocument = HydratedDocument<Game>;
export const GameSchema = SchemaFactory.createForClass(Game);
