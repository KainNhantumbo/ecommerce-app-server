import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  BaseEntity,
  OneToOne,
  Relation
} from 'typeorm';
import { Product } from './product.entity';

@Entity()
export class Category extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @OneToOne(() => Product, (product) => product.category, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
    cascade: true
  })
  product: Relation<Product>;

  @CreateDateColumn({})
  createdAt: string;

  @UpdateDateColumn({})
  updatedAt: string;
}
