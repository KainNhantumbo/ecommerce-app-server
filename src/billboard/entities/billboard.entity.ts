import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  BaseEntity,
  OneToOne,
  Relation,
  JoinColumn
} from 'typeorm';
import { Image } from '../../product/entities/image.entity';

@Entity()
export class Billboard extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  label: string;

  @OneToOne(() => Image, (image) => image, { cascade: true })
  @JoinColumn()
  image: Relation<Image>;

  @CreateDateColumn({})
  createdAt: string;

  @UpdateDateColumn({})
  updatedAt: string;
}
