import {
  BaseEntity,
  Entity,
  CreateDateColumn,
  UpdateDateColumn,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  Relation
} from 'typeorm';
import { Product } from './product.entity';

@Entity()
export class Size extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  label: string;

  @Column()
  value: string;

  @ManyToOne(() => Product, (product) => product.sizes)
  product: Relation<Product>;

  @CreateDateColumn()
  createdAt: string;

  @UpdateDateColumn()
  updatedAt: string;
}
