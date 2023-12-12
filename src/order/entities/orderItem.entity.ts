import {
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  BaseEntity,
  JoinColumn,
  ManyToOne,
  OneToOne,
  Relation,
  Column
} from 'typeorm';
import { Order } from './order.entity';
import { Product } from '../../product/entities/product.entity';

@Entity()
export class OrderItem extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Order, (order) => order.orderItems, {
    cascade: true,
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE'
  })
  @JoinColumn()
  order: Relation<Order>;

  @OneToOne(() => Product, (product) => product.orderItem, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
    cascade: true
  })
  @JoinColumn()
  product: Relation<Product>;

  @Column({ type: 'int' })
  quantity: number;

  @CreateDateColumn({})
  createdAt: string;

  @UpdateDateColumn({})
  updatedAt: string;
}
