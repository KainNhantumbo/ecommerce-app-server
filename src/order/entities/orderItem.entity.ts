import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  BaseEntity,
  Relation,
  JoinColumn,
  ManyToOne
} from 'typeorm';
import { Order } from './order.entity';

@Entity()
export class OrderItem extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Order, (order) => order.orderItems)
  @JoinColumn()
  order: Relation<Order>;

  @Column({ nullable: false })
  productId: number;

  @CreateDateColumn({})
  createdAt: string;

  @UpdateDateColumn({})
  updatedAt: string;
}
