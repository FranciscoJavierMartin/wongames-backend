import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

@Schema({ toJSON: { virtuals: true } })
export class Developer {
  @Prop({ unique: true, isRequired: true })
  name: string;

  @Prop()
  slug: string;
}

export type DeveloperDocument = HydratedDocument<Developer>;
export const DeveloperSchema = SchemaFactory.createForClass(Developer);
