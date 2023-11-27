import {
  Injectable,
  NotFoundException,
  UnprocessableEntityException
} from '@nestjs/common';
import { User } from './user.entity';
import { DataSource } from 'typeorm';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UserService {
  constructor(private dataSource: DataSource) {}

  async findOneByEmail(email: string): Promise<User | null> {
    const user: User | null = await this.dataSource
      .getRepository(User)
      .findOne({ where: { email } });

    return user;
  }

  async findOneById(id: number): Promise<User | null> {
    const user: User | null = await this.dataSource
      .getRepository(User)
      .findOne({ where: { id } });

    if (!user)
      throw new NotFoundException(
        `User with provided ID ${id}, was not found.`
      );

    return user;
  }

  async updateOne(id: number, updateUserDto: UpdateUserDto): Promise<void> {
    const result = await this.dataSource
      .getRepository(User)
      .update({ id }, { ...updateUserDto });

    if (result.affected < 1)
      throw new UnprocessableEntityException(
        'Failed to update your data. Please, try again later.'
      );
  }

  async deleteOne(id: number): Promise<{ message: string }> {
    const user = await this.dataSource
      .getRepository(User)
      .findOne({ where: { id } });

    if (user === null) throw new NotFoundException('Account not found.');

    await user.remove();
    return { message: 'Account deleted successfully.' };
  }
}
