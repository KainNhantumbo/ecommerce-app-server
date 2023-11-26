import {
  BadRequestException,
  Injectable,
  UnprocessableEntityException
} from '@nestjs/common';
import { User } from './user.entity';
import { DataSource } from 'typeorm';
import { UpdateUserDto } from './dto/update-user.dto';
import { CreateUserDto } from './dto/create-user.dto';

@Injectable()
export class UserService {
  constructor(private dataSource: DataSource) {}

  async findOne(email: string): Promise<User | null> {
    return await this.dataSource.getRepository(User).findOneBy({ email });
  }

  async findOneById(id: number): Promise<User | null> {
    return await this.dataSource.getRepository(User).findOneBy({ id });
  }

  async create(createUserDto: CreateUserDto): Promise<CreateUserDto> {
    return await this.dataSource.transaction(async (manager) => {
      return await manager.save({ ...createUserDto });
    });
  }

  async updateOne(id: number, updateUserDto: UpdateUserDto): Promise<void> {
    const result = await this.dataSource.transaction(async (manager) => {
      return await manager.update(User, { id }, { ...updateUserDto });
    });

    if (result.affected < 1)
      throw new UnprocessableEntityException(
        'Failed to update your data. Please, try again later.'
      );
  }

  async deleteOne(id: number): Promise<void> {
    const result = await this.dataSource.transaction(async (manager) => {
      return await manager.delete(User, { id });
    });

    if (result.affected < 1)
      throw new BadRequestException(
        'Failed to delete your account. Please, try again later.'
      );
  }
}
