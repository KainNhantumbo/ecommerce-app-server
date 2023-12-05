import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  BaseEntity
} from 'typeorm';
import { Store } from '../store/entities/store.entity';

@Entity()
export class Product extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  store: Store;

  @Column()
  category: string;

  @Column()
  name: string;

  @Column()
  price: string;

  @Column()
  isFeatured: string;

  @Column()
  isArchived: string;

  @Column()
  color: string;
  
  @Column()
  images: string;
  
  @Column()
  size: string;
  
  @Column()
  orders: string;

  @Column()
  categories: string;

  @CreateDateColumn({})
  createdAt: string;

  @UpdateDateColumn({})
  updatedAt: string;
}
