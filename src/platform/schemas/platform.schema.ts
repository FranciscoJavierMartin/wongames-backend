import { Field, ObjectType } from '@nestjs/graphql';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';
import { Game } from 'src/game/schemas/game.shema';

@ObjectType()
@Schema({ toJSON: { virtuals: true } })
export class Platform {
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

export type PlatformDocument = HydratedDocument<Platform>;
export const PlatformSchema = SchemaFactory.createForClass(Platform);
