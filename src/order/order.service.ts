import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Order } from './entities/order.entity';
import { Repository, FindOperator } from 'typeorm';
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

    const products = await this.product.find({
      where: items.map((item) => ({ id: item }))
    });

    return this.order
      .create({
        ...data,
        orderItems: products.map((product) =>
          this.orderItem.create({ product })
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
