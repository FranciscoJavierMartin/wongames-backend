import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

@Schema({ toJSON: { virtuals: true } })
export class Category {
  @Prop({ unique: true, isRequired: true })
  name: string;

  @Prop()
  slug: string;
}

export type CategoryDocument = HydratedDocument<Category>;
export const CategorySchema = SchemaFactory.createForClass(Category);
