import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

@Schema({ toJSON: { virtuals: true } })
export class Platform {
  @Prop({ unique: true, isRequired: true })
  name: string;

  @Prop()
  slug: string;
}

export type PlatformDocument = HydratedDocument<Platform>;
export const PlatformSchema = SchemaFactory.createForClass(Platform);
