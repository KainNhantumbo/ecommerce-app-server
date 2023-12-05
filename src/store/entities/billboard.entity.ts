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
import { Image } from 'src/product/entities/image.entity';
import { Category } from './category.entity';

@Entity()
export class Billboard extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  label: string;

  @OneToOne(() => Image)
  image: Relation<Image>;

  @OneToOne(() => Category)
  category: Relation<Category>;

  @CreateDateColumn({})
  createdAt: string;

  @UpdateDateColumn({})
  updatedAt: string;
}
