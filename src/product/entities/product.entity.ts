import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  BaseEntity,
  OneToMany,
  JoinColumn,
  ManyToOne,
  OneToOne,
  Relation
} from 'typeorm';
import { Store } from '../../store/entities/store.entity';
import { Image } from './image.entity';
import { Color } from './color.entity';
import { Size } from './size.entity';
import { Category } from '../../store/entities/category.entity';

@Entity()
export class Product extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Store, (store) => store.products, {
    cascade: true
  })
  storeId: Relation<Store>;

  @OneToOne(() => Category)
  @JoinColumn()
  categoryId: Relation<Category>;

  @Column({ default: '' })
  name: string;

  @Column({ default: 0 })
  price: number;

  @Column({ default: false })
  isFeatured: boolean;

  @Column({ default: false })
  isArchived: boolean;

  @OneToMany(() => Color, (colors) => colors.product, { cascade: true })
  colors: Relation<Color[]>;

  @OneToMany(() => Image, (image) => image.product, {
    cascade: true,
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE'
  })
  images: Relation<Image[]>;

  @OneToMany(() => Size, (size) => size.products)
  size: Relation<Size[]>;

  @OneToOne(() => Category)
  @JoinColumn()
  category: Relation<Category>;

  @CreateDateColumn({})
  createdAt: string;

  @UpdateDateColumn({})
  updatedAt: string;
}
