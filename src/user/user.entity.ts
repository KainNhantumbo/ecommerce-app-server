import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  BaseEntity,
  JoinColumn
} from 'typeorm';

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

  @Column()
  password: string;

  @CreateDateColumn({})
  created_at: string;

  @UpdateDateColumn({})
  updated_at: string;
}
