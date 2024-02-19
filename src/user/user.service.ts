import {
  BadRequestException,
  Injectable,
  NotFoundException,
  UnprocessableEntityException
} from '@nestjs/common';
import { User } from './user.entity';
import { Repository } from 'typeorm';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { encryptPassword } from '../utils/encrypt-utils';
import { isStrongPassword } from 'class-validator';

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

  async updateOne(
    id: number,
    { password, ...data }: UpdateUserDto
  ): Promise<void> {
    let hash = undefined;

    if (password) {
      const IS_STRONG_PASSWORD = isStrongPassword(password, {
        minLength: 8,
        minLowercase: 2,
        minNumbers: 0,
        minSymbols: 1,
        minUppercase: 0
      });

      if (!IS_STRONG_PASSWORD) {
        throw new BadRequestException(
          'Password must have at least 8 characters, 1 symbol and 2 lowercase letters.'
        );
      }

      hash = await encryptPassword(password);
    }
    
    const result = await this.user.update({ id }, { ...data, password: hash });

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
