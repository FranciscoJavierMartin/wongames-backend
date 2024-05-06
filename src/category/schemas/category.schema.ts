import { Field, ObjectType } from '@nestjs/graphql';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

@ObjectType()
@Schema({ toJSON: { virtuals: true } })
export class Category {
  @Field(() => String)
  @Prop({ unique: true, isRequired: true })
  name: string;

  @Field(() => String)
  @Prop()
  slug: string;
}

export type CategoryDocument = HydratedDocument<Category>;
export const CategorySchema = SchemaFactory.createForClass(Category);
