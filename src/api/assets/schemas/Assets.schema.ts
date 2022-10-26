import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type AssetsDocument = Assets & Document;

@Schema()
export class Assets {
  @Prop()
  name: string;

  @Prop()
  cost: number;

  @Prop()
  type: string;
}

export const AssetsSchema = SchemaFactory.createForClass(Assets);