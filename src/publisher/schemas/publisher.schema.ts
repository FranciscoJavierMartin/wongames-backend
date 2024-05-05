import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

@Schema({ toJSON: { virtuals: true } })
export class Publisher {
  @Prop({ unique: true, isRequired: true })
  name: string;

  @Prop()
  slug: string;
}

export type PublisherDocument = HydratedDocument<Publisher>;
export const PublisherSchema = SchemaFactory.createForClass(Publisher);
