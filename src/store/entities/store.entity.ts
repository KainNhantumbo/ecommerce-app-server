import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  BaseEntity
} from 'typeorm';

@Entity()
export class Store extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 64 })
  name: string;

  @Column({ unique: true })
  userId: string;

  @Column()
  billboards: string;
  
  @Column()
  categories: string;

  @Column()
  products: string;
  
  @Column()
  sizes: string;
  
  @Column()
  colors: string;
  
  @Column()
  orders: string;

  @CreateDateColumn({})
  createdAt: string;

  @UpdateDateColumn({})
  updatedAt: string;
}
