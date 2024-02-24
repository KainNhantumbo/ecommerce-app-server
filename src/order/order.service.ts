import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Product } from '../product/product.schema';
import { CreateOrderDto } from './dto/create-order.dto';
import { Order } from './order.schema';

@Injectable()
export class OrderService {
  constructor(
    @InjectModel(Order.name) private order: Model<Order>,
    @InjectModel(Product.name) private product: Model<Product>
  ) {}

  async create(createOrderDto: CreateOrderDto) {
    const { items, ...data } = createOrderDto;

    const cart = (
      await this.product
        .find({
          _id: { $in: items.map((item) => item.productId) }
        })
        .select('name price')
    ).map((product) => {
      for (const item of items) {
        if (item.productId === String(product._id)) {
          return {
            name: product.name,
            productId: product._id,
            price: product.price,
            sizes: item.sizes,
            colors: item.colors,
            quantity: item.quantity
          };
        }
      }
    });

    return this.order.create({
      ...data,
      items: cart
    });
  }

  async findAll() {
    return this.order.find().lean();
  }

  async remove(id: string) {
    const foundOrder = await this.order.findOneAndDelete({ _id: id });
    if (!foundOrder) throw new NotFoundException('Order not found');
  }
}
