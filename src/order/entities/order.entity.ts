import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  BaseEntity,
  JoinColumn,
  OneToMany,
  ManyToOne
} from 'typeorm';
import { OrderItem } from './orderItem.entity';
import { Store } from '../../store/entities/store.entity';

@Entity()
export class Order extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Store, (store) => store.orders)
  @JoinColumn({ referencedColumnName: 'id' })
  storeId: Store;

  @OneToMany(() => OrderItem, (orderItem) => orderItem.orderId, {
    cascade: true,
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE'
  })
  orderItems: OrderItem[];

  @Column({ type: 'bool', default: false })
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
