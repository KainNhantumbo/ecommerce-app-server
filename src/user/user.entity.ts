import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  BaseEntity,
  JoinColumn
} from 'typeorm';
import { roles } from './dto/create-user.dto';

@Entity()
export class User extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @JoinColumn()
  @Column({ length: 64, default: '' })
  firstName: string;

  @Column({ length: 64, default: '' })
  lastName: string;

  @Column({ unique: true })
  email: string;

  @Column({ nullable: false })
  password: string;

  @Column({ enum: [...roles], default: 'USER' })
  role: string;

  @Column({ default: '' })
  employeeId: string;

  @CreateDateColumn({})
  createdAt: string;

  @UpdateDateColumn({})
  updatedAt: string;
}
