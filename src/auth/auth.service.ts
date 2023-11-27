import {
  ForbiddenException,
  Injectable,
  NotFoundException,
  UnauthorizedException
} from '@nestjs/common';
import { UserService } from '../user/user.service';
import { SignInDto } from './dto/sign-in.dto';
import { comparePasswords, encryptPassword } from '../utils/encrypt-utils';
import { JwtService } from '@nestjs/jwt';
import { User } from '../user/user.entity';
import { CreateUserDto } from '../user/dto/create-user.dto';
import { QueryFailedError } from 'typeorm';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UserService,
    private config: ConfigService,
    private jwt: JwtService
  ) {}

  async signIn({ email, password }: SignInDto): Promise<unknown> {
    const isProduction =
      this.config.get<string>('NODE_ENV') === 'development' ? false : true;

    const user = await this.usersService.findOneByEmail(email);

    if (!user)
      throw new NotFoundException(
        'Account not found. Please check your email and try again.'
      );

    const match = await comparePasswords(password, user.password);
    if (!match) throw new UnauthorizedException();

    const token = await this.signToken(user.id, user.email);

    return {
      access_token: token,
      username: user.username
    };
  }

  async signUp(createUserDto: CreateUserDto) {
    try {
      const { password, email, username } = createUserDto;
      const hash = await encryptPassword(password);

      const user = new User();
      user.username = username;
      user.email = email;
      user.password = hash;

      return await user.save();
    } catch (error) {
      if (error instanceof QueryFailedError)
        throw new ForbiddenException('Credencials already taken.');

      throw error;
    }
  }

  signToken(userId: number, email: string): Promise<string> {
    const payload = { id: userId, email };
    const ACCESS_TOKEN = this.config.getOrThrow('ACCESS_TOKEN');
    const ACCESS_TOKEN_EXPDATE = this.config.getOrThrow('ACCESS_TOKEN_EXPDATE');

    return this.jwt.signAsync(payload, {
      secret: ACCESS_TOKEN,
      expiresIn: ACCESS_TOKEN_EXPDATE
    });
  }
}
