import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  BaseEntity
} from 'typeorm';
import { Store } from './store.entity';

@Entity()
export class Billboard extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;
  
  @Column({ unique: true })
  store: Store;

  @Column()
  label: string;
  
  @Column()
  imageUrl: string;
  
  @Column()
  categories: string;

  @CreateDateColumn({})
  createdAt: string;

  @UpdateDateColumn({})
  updatedAt: string;
}
