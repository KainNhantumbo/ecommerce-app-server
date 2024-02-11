import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  BaseEntity,
  OneToMany,
  Relation
} from 'typeorm';
import { OrderItem } from './orderItem.entity';

@Entity()
export class Order extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @OneToMany(() => OrderItem, (orderItem) => orderItem.order)
  orderItems: Relation<OrderItem[]>;

  @Column({ type: 'bool', default: false })
  isPaid: boolean;

  @Column({ nullable: false })
  phone: string;

  @Column({ default: '' })
  address: string;

  @CreateDateColumn({})
  createdAt: string;

  @UpdateDateColumn({})
  updatedAt: string;
}
