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
import { Store } from '../../store/entities/store.entity';

@Entity()
export class Size extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Store, (store) => store.sizes, {
    cascade: true
  })
  storeId: Relation<Store>;

  @Column()
  name: string;

  @Column()
  value: string;

  @ManyToOne(() => Product, (product) => product.size, { cascade: true })
  products: Relation<Product[]>;

  @CreateDateColumn()
  createdAt: string;

  @UpdateDateColumn()
  updatedAt: string;
}
