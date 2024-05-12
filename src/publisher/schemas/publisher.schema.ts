import { Field, ObjectType } from '@nestjs/graphql';
import { HydratedDocument, Types } from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Game } from '@game/schemas/game.shema';

@ObjectType()
@Schema({ toJSON: { virtuals: true } })
export class Publisher {
  @Field(() => String)
  @Prop({ type: Types.ObjectId })
  _id: Types.ObjectId;

  @Field(() => String)
  @Prop({ isRequired: true })
  name: string;

  @Field(() => String)
  @Prop()
  slug: string;

  @Field(() => [Game])
  @Prop({
    type: [{ type: Types.ObjectId, ref: 'Game' }],
    default: [],
  })
  games: Game[];
}

export type PublisherDocument = HydratedDocument<Publisher>;
export const PublisherSchema = SchemaFactory.createForClass(Publisher);
