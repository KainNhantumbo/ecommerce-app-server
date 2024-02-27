import {
  BadRequestException,
  Injectable,
  NotFoundException
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Product } from '../product/product.schema';
import { CreateOrderDto } from './dto/create-order.dto';
import { Order } from './order.schema';
import { isMongoId } from 'class-validator';

@Injectable()
export class OrderService {
  constructor(
    @InjectModel(Order.name) private order: Model<Order>,
    @InjectModel(Product.name) private product: Model<Product>
  ) {}

  async create(createOrderDto: CreateOrderDto) {
    const { items, ...data } = createOrderDto;

    const foundProducts = await this.product
      .find({
        _id: { $in: items.map((item) => item.productId) }
      })
      .select('name price');

      console.log(foundProducts)

    return await this.order.create({
      ...data,
      items: foundProducts.map((product) => {
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
      })
    });
  }

  async findAll() {
    return await this.order.find().lean();
  }

  async findOne(id: string) {
    if (!isMongoId(id))
      throw new BadRequestException(
        'Invalid resource ID. Please correct and try again.'
      );
    return await this.order.findOne({ _id: id }).lean();
  }

  async remove(id: string) {
    if (!isMongoId(id))
      throw new BadRequestException(
        'Invalid resource ID. Please correct and try again.'
      );
    const foundOrder = await this.order.findOneAndDelete({ _id: id }).lean();
    if (!foundOrder) throw new NotFoundException('Order not found');
  }
}
