import { Prop, Schema, SchemaFactory, raw } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export interface IBillboard {
  readonly label: string;
  readonly image: {
    publicId: string;
    url: string;
  };
}

export interface BillboardDocument extends HydratedDocument<Billboard> {}

@Schema({ timestamps: true })
export class Billboard implements IBillboard {
  @Prop({ type: String })
  label: string;

  @Prop(
    raw({
      publicId: { type: String, required: true },
      url: { type: String, required: true }
    })
  )
  image: { publicId: string; url: string };
}

export const BillboardSchema = SchemaFactory.createForClass(Billboard);
