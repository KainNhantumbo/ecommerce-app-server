import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  BaseEntity,
  OneToMany,
  JoinColumn,
  OneToOne,
  Relation
} from 'typeorm';
import { Image } from './image.entity';
import { Color } from './color.entity';
import { Size } from './size.entity';
import { Category } from './category.entity';
import { OrderItem } from '../../order/entities/orderItem.entity';

@Entity()
export class Product extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: false, unique: true })
  name: string;

  @Column({ default: 0 })
  price: number;

  @Column({ default: false })
  isFeatured: boolean;

  @Column({ default: false })
  isArchived: boolean;

  @OneToMany(() => Color, (colors) => colors.product)
  colors: Relation<Color[]>;

  @OneToMany(() => Image, (image) => image.product)
  images: Relation<Image[]>;

  @OneToMany(() => Size, (size) => size.products)
  sizes: Relation<Size[]>;

  @OneToOne(() => Category, (category) => category.product)
  @JoinColumn()
  category: Relation<Category>;

  @OneToOne(() => OrderItem, (orderItem) => orderItem.product)
  orderItem: Relation<OrderItem>;

  @CreateDateColumn({})
  createdAt: string;

  @UpdateDateColumn({})
  updatedAt: string;
}
