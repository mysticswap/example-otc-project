import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { PointStatus } from 'src/types/points';

export type PointDocument = Point & Document;

@Schema()
export class Point {
  @Prop()
  address: string;

  @Prop()
  points: number;

  @Prop({ type: String, default: PointStatus.active })
  status: PointStatus;

  @Prop({ type: Date, default: Date.now })
  lastUpdatedExternalAt: Date;

  @Prop({ type: Date, default: Date.now })
  createdAt: Date;

  @Prop({ type: Date, default: Date.now })
  updatedAt: Date;
}

export const PointSchema = SchemaFactory.createForClass(Point);
