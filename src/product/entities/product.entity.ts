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

  @Column({ nullable: false, length: 256 })
  description: string;

  @Column({ default: '', length: 2048 })
  specs: string;

  @Column({})
  price: number;

  @Column({ default: false })
  isFeatured: boolean;

  @Column({ default: false })
  isArchived: boolean;

  @OneToMany(() => Color, (colors) => colors.product, {
    cascade: true
  })
  @JoinColumn()
  colors: Relation<Color[]>;

  @OneToMany(() => Image, (image) => image.product, {
    cascade: true
  })
  @JoinColumn()
  images: Relation<Image[]>;

  @OneToMany(() => Size, (size) => size.products, { cascade: true })
  @JoinColumn()
  sizes: Relation<Size[]>;

  @OneToOne(() => Category, (category) => category, { cascade: true })
  @JoinColumn()
  category: Relation<Category>;

  @OneToOne(() => OrderItem, (orderItem) => orderItem.product, {
    cascade: true
  })
  orderItem: Relation<OrderItem>;

  @CreateDateColumn({})
  createdAt: string;

  @UpdateDateColumn({})
  updatedAt: string;
}
