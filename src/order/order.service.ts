import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Order } from './entities/order.entity';
import { Repository } from 'typeorm';
import { CreateOrderDto } from './dto/create-order.dto';
import { OrderItem } from './entities/orderItem.entity';
import { Product } from '../product/entities/product.entity';

@Injectable()
export class OrderService {
  constructor(
    @InjectRepository(Order) private order: Repository<Order>,
    @InjectRepository(OrderItem) private orderItem: Repository<OrderItem>,
    @InjectRepository(Product) private product: Repository<Product>
  ) {}

  async create(createOrderDto: CreateOrderDto) {
    const { items, ...data } = createOrderDto;

    const cart = await Promise.all(
      items.map(async (item) => {
        const product = await this.product.findOne({
          where: { id: item.productId }
        });

        return {
          product,
          quantity: item.quantity
        };
      })
    );

    return this.order
      .create({
        ...data,
        orderItems: cart.map((item) =>
          this.orderItem.create({
            product: item.product,
            quantity: item.quantity
          })
        )
      })
      .save();
  }

  async findAll() {
    return this.order.find({ relations: { orderItems: true } });
  }

  async remove(id: number) {
    const foundOrder = await this.order.findOne({ where: { id } });

    if (!foundOrder) throw new NotFoundException('Order not found');
    await foundOrder.remove();
  }
}
