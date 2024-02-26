import { Schema, SchemaFactory, Prop, raw } from '@nestjs/mongoose';
import type { HydratedDocument } from 'mongoose';

export interface IProduct {
  readonly name: string;
  readonly price: number;
  readonly specs: string;
  readonly description: string;
  readonly isFeatured: boolean;
  readonly isArchived: boolean;
  readonly category: { label: string; value: string };
  readonly images: Array<{ id: string; publicId: string; url: string }>;
  readonly sizes: Array<{ id: string; label: string; value: string }>;
  readonly colors: Array<{ id: string; label: string; value: string }>;
}

export interface ProductDocument extends HydratedDocument<Product> {}

@Schema({ timestamps: true })
export class Product implements IProduct {
  @Prop({ type: String, required: true, maxlength: 64, minlength: 5 })
  name: string;

  @Prop({ type: String, required: true, maxlength: 256, minlength: 5 })
  description: string;

  @Prop({ type: String, maxlength: 2048, default: '' })
  specs: string;

  @Prop({ type: Number, required: true, min: 0 })
  price: number;

  @Prop({ type: Boolean, default: false })
  isArchived: boolean;

  @Prop({ type: Boolean, default: false })
  isFeatured: boolean;

  @Prop(
    raw({
      label: { type: String, required: true },
      value: { type: String, required: true }
    })
  )
  category: { label: string; value: string };

  @Prop(
    raw([
      {
        id: { type: String, required: true },
        label: { type: String, required: true },
        value: { type: String, required: true }
      }
    ])
  )
  colors: Array<{ id: string; label: string; value: string }>;

  @Prop(
    raw([
      {
        id: { type: String, required: true },
        label: { type: String, required: true },
        value: { type: String, required: true }
      }
    ])
  )
  sizes: Array<{ id: string; label: string; value: string }>;

  @Prop(
    raw([
      {
        id: { type: String, required: true },
        publicId: { type: String, required: true },
        url: { type: String, required: true }
      }
    ])
  )
  images: Array<{ id: string; publicId: string; url: string }>;
}

export const ProductSchema = SchemaFactory.createForClass(Product);
