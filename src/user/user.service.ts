import {
  BadRequestException,
  Injectable,
  NotFoundException,
  UnprocessableEntityException
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { isStrongPassword } from 'class-validator';
import { Model } from 'mongoose';
import { encryptPassword } from '../utils/encrypt-utils';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './user.schema';
import { UserQueryDto } from './dto/query-user.dto';

@Injectable()
export class UserService {
  constructor(@InjectModel(User.name) private user: Model<User>) {}

  async findAll({ fields }: UserQueryDto): Promise<User[]> {
    let query = this.user.find();
    if (fields) {
      const strings = String(fields).split(',').join(' ');
      query = query.select(strings)
    }

    const data = await query.lean();

    return data.map((user) => {
      delete user.password;
      return user;
    });
  }

  async findOneById(id: string) {
    const user: User | null = await this.user
      .findOne({ _id: id })
      .select('-password');

    if (!user)
      throw new NotFoundException(
        `User with provided ID ${id}, was not found.`
      );
    return user;
  }

  async updateOne(id: string, { password, ...data }: UpdateUserDto) {
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

    const result = await this.user.findOneAndUpdate(
      { _id: id },
      { ...data, password: hash },
      { runValidators: true, new: true, lean: true }
    );

    if (!result)
      throw new UnprocessableEntityException(
        'Failed to update your data. Please, try again later.'
      );
  }

  async deleteOne(id: string) {
    const user = await this.user.findOneAndDelete({ _id: id });
    if (!user) throw new NotFoundException('Account not found.');
    return { message: 'Account deleted successfully.' };
  }
}
