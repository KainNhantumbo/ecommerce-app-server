import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserService } from '../user/user.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(private usersService: UserService) {}

  async signIn(email: string, password: string): Promise<unknown> {
    const user = await this.usersService.findOne(email);

    const match = await bcrypt.compare(password, user.password);

    if (!match) throw new UnauthorizedException();

    // const { password, ...result } = user;
    // TODO: Generate a JWT and return it here
    // instead of the user object
    return ;
  }
}
