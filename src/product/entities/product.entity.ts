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

  @Column()
  name: string;

  @Column()
  description: string;

  @Column({ default: '', length: 2048 })
  specs: string;

  @Column({})
  price: number;

  @Column({ default: false })
  isFeatured: boolean;

  @Column({ default: false })
  isArchived: boolean;

  @OneToMany(() => Image, (image) => image.product, {
    cascade: true,
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE'
  })
  @JoinColumn()
  images: Relation<Image[]>;

  @OneToMany(() => Color, (colors) => colors.product, {
    cascade: true,
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE'
  })
  @JoinColumn()
  colors: Relation<Color[]>;

  @OneToMany(() => Size, (size) => size.product, {
    cascade: true,
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE'
  })
  @JoinColumn()
  sizes: Relation<Size[]>;

  @OneToOne(() => Category, (category) => category, {
    cascade: true,
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE'
  })
  @JoinColumn()
  category: Relation<Category>;

  @OneToOne(() => OrderItem, (orderItem) => orderItem.product, {
    cascade: true,
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE'
  })
  orderItem: Relation<OrderItem>;

  @CreateDateColumn({})
  createdAt: string;

  @UpdateDateColumn({})
  updatedAt: string;
}
