import { Document } from 'mongoose';
import { Prop, Schema, SchemaFactory, raw } from '@nestjs/mongoose';

export interface IBillboard extends Document {
  readonly label: string;
  readonly image: {
    publicId: string;
    url: string;
  };
}

@Schema({ timestamps: true })
export class Billboard {
  @Prop({ type: String })
  label: string;

  @Prop(
    raw({
      publicId: { type: String, required: true },
      url: { type: String, required: true }
    })
  )
  image: Record<string, string>;
}

export const BillboardSchema = SchemaFactory.createForClass(Billboard);
