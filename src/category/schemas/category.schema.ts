import { Field, ObjectType } from '@nestjs/graphql';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';
import { Game } from 'src/game/schemas/game.shema';

@ObjectType()
@Schema({ toJSON: { virtuals: true } })
export class Category {
  @Field(() => String)
  @Prop({ unique: true, isRequired: true })
  name: string;

  @Field(() => String)
  @Prop()
  slug: string;

  @Field(() => [Game])
  @Prop({
    type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Game' }],
    default: [],
  })
  games: Game[];
}

export type CategoryDocument = HydratedDocument<Category>;
export const CategorySchema = SchemaFactory.createForClass(Category);
