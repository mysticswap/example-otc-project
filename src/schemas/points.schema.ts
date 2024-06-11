import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { PointStatus } from 'src/types/points';

export type PointDocument = TestPoint & Document;

@Schema()
export class TestPoint {
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

export const PointSchema = SchemaFactory.createForClass(TestPoint);
