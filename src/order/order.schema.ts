import { Prop, Schema, SchemaFactory, raw } from '@nestjs/mongoose';
import { Types, type HydratedDocument } from 'mongoose';
import { Product } from '../product/product.schema';

export interface IOrder {
  readonly customerName: string;
  readonly phone: string;
  readonly address: string;
  readonly isPaid: boolean;
  readonly items: Array<{
    productId: string;
    quantity: number;
    price: number;
    name: string;
    sizes: string[];
    colors: string[];
  }>;
}

export interface OrderDocument extends HydratedDocument<Order> {}

@Schema({ timestamps: true })
export class Order implements IOrder {
  @Prop({ type: String, maxlength: 64, min: 8 })
  customerName: string;

  @Prop({})
  phone: string;

  @Prop({ type: String })
  address: string;

  @Prop({ type: Boolean, default: false })
  isPaid: boolean;

  @Prop(
    raw({
      productId: { type: Types.ObjectId, ref: Product.name },
      quantity: { type: Number, default: 0, min: 0 },
      sizes: [{ type: String }],
      name: { type: String },
      price: { type: Number, default: 0, min: 0 },
      colors: [{ type: String }]
    })
  )
  items: {
    productId: string;
    quantity: number;
    price: number;
    sizes: string[];
    name: string;
    colors: string[];
  }[];
}

export const OrderSchema = SchemaFactory.createForClass(Order);
