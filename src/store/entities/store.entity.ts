import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  BaseEntity,
  OneToMany,
  JoinColumn,
  OneToOne
} from 'typeorm';
import { Order } from '../../order/entities/order.entity';
import { Product } from '../../product/entities/product.entity';
import { Size } from '../../product/entities/size.entity';
import { Category } from './category.entity';
import { User } from '../../user/user.entity';

@Entity()
export class Store extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 64 })
  name: string;

  @OneToOne(() => User, (user) => user.id)
  userId: string;

  @Column()
  billboards: string;

  @OneToOne(() => Category, {
    cascade: true,
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE'
  })
  category: Category;

  @OneToMany(() => Product, (product) => product.storeId, {
    cascade: true,
    onDelete: 'CASCADE'
  })
  @JoinColumn({ referencedColumnName: 'id' })
  products: Product[];

  @OneToMany(() => Size, (sizes) => sizes.storeId, {
    cascade: true,
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE'
  })
  @JoinColumn()
  sizes: Size[];

  @OneToMany(() => Order, (order) => order.storeId, {
    cascade: true,
    onDelete: 'CASCADE'
  })
  @JoinColumn()
  orders: Order[];

  @CreateDateColumn({})
  createdAt: string;

  @UpdateDateColumn({})
  updatedAt: string;
}
