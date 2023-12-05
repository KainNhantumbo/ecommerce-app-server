import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  BaseEntity
} from 'typeorm';
import { Store } from './store.entity';
import { Billboard } from './billboard.entity';

@Entity()
export class Category extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  store: Store;

  @Column()
  billboard: Billboard;

  @Column()
  name: string;

  @Column()
  products: string;

  @CreateDateColumn({})
  createdAt: string;

  @UpdateDateColumn({})
  updatedAt: string;
}
