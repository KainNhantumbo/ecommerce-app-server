import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  BaseEntity,
  Relation,
  JoinColumn,
  OneToMany
} from 'typeorm';
import { OrderItem } from './orderItem.entity';

@Entity()
export class Order extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: false })
  storeId: number;

  @OneToMany(() => OrderItem, (orderItem) => orderItem.order)
  @JoinColumn()
  orderItems: Relation<Order[]>;

  @Column({ type: 'bool' })
  isPaid: boolean;

  @Column({ nullable: false })
  phone: string;

  @Column({ default: '' })
  adress: string;

  @CreateDateColumn({})
  createdAt: string;

  @UpdateDateColumn({})
  updatedAt: string;
}
