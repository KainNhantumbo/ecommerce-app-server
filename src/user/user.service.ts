import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>
  ) {}

  getUserById(id: number): Promise<User | null> {
    return this.usersRepository.findOneBy({ id });
  }

  // async createUser(userDto: any): Promise<User> {
  //   const user = await this.usersRepository.create();
  //   return user;
  // }

  // async updateUser() {

  // }

  async deleteUser(id: number): Promise<void> {
    const result = await this.usersRepository.delete(id);

    if (result.affected < 1)
      throw new BadRequestException(
        'Failed to delete your account. Please, try again later.'
      );
  }
}
