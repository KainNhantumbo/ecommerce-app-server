import {
  Injectable,
  NotFoundException,
  UnprocessableEntityException
} from '@nestjs/common';
import { User } from './user.entity';
import { Repository } from 'typeorm';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class UserService {
  constructor(@InjectRepository(User) private user: Repository<User>) {}

  async findAll(): Promise<User[]> {
    return (await this.user.find({ select: { password: false } })).map(
      (user) => {
        delete user.password;
        return user;
      }
    );
  }

  async findOneById(id: number): Promise<User | null> {
    const user: User | null = await this.user.findOne({
      where: { id }
    });

    if (!user)
      throw new NotFoundException(
        `User with provided ID ${id}, was not found.`
      );

    delete user.password;
    return user;
  }

  async updateOne(id: number, updateUserDto: UpdateUserDto): Promise<void> {
    const result = await this.user.update({ id }, { ...updateUserDto });

    if (result.affected < 1)
      throw new UnprocessableEntityException(
        'Failed to update your data. Please, try again later.'
      );

  }

  async deleteOne(id: number): Promise<{ message: string }> {
    const user = await this.user.findOne({ where: { id } });

    if (!user) throw new NotFoundException('Account not found.');

    await user.remove();
    return { message: 'Account deleted successfully.' };
  }
}
