import {
  ForbiddenException,
  Injectable,
  NotFoundException,
  UnauthorizedException
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { DecodedPayload } from 'src/types';
import { QueryFailedError } from 'typeorm';
import { CreateUserDto } from '../user/dto/create-user.dto';
import { User } from '../user/user.schema';
import { comparePasswords, encryptPassword } from '../utils/encrypt-utils';
import { SignInDto } from './dto/sign-in.dto';

@Injectable()
export class AuthService {
  private isProduction: boolean;

  constructor(
    private config: ConfigService,
    private jwt: JwtService,
    @InjectModel(User.name) private user: Model<User>
  ) {
    this.isProduction =
      this.config.getOrThrow<string>('NODE_ENV') === 'development'
        ? false
        : true;
  }

  async signIn({ email, password }: SignInDto) {
    const user = await this.user.findOne({ email }).lean();

    if (!user)
      throw new NotFoundException(
        'Account not found. Please check your email and try again.'
      );

    const match = await comparePasswords(password, user.password);
    if (!match) throw new UnauthorizedException();

    const access_token = await this.signAccessToken(
      user._id.toString(),
      user.email
    );
    const refresh_token = await this.signRefreshToken(
      user._id.toString(),
      user.email
    );

    return {
      access_token,
      refresh_token,
      isProduction: this.isProduction,
      user: {
        id: user._id,
        email: user.email,
        name: `${user.firstName} ${user.lastName}`
      }
    };
  }

  async signUp(createUserDto: CreateUserDto) {
    try {
      const { password, ...rest } = createUserDto;
      const hash = await encryptPassword(password);
      return await this.user.create({
        ...rest,
        password: hash
      });
    } catch (error) {
      if (error instanceof QueryFailedError)
        throw new ForbiddenException('Credentials already taken.');

      throw error;
    }
  }

  async revalidateToken(token: unknown) {
    if (!token) throw new UnauthorizedException();

    const payload = this.jwt.decode<DecodedPayload | null>(String(token));

    if (!payload) throw new UnauthorizedException();

    const user = await this.user.findOne({ email: payload.email });

    if (!user) throw new NotFoundException('Resource not found: unauthorized.');

    const access_token = await this.signAccessToken(
      user._id.toString(),
      user.email
    );

    return {
      id: user._id,
      email: user.email,
      token: access_token,
      name: `${user.firstName} ${user.lastName}`
    };
  }

  signOut(token: unknown) {
    if (!token) throw new UnauthorizedException();
    return { isProduction: this.isProduction };
  }

  signAccessToken(userId: string, email: string): Promise<string> {
    const payload = { id: userId, email };
    const ACCESS_TOKEN = this.config.getOrThrow<string>('ACCESS_TOKEN');
    const ACCESS_TOKEN_EXPDATE = this.config.getOrThrow<string>(
      'ACCESS_TOKEN_EXPDATE'
    );

    return this.jwt.signAsync(payload, {
      secret: ACCESS_TOKEN,
      expiresIn: ACCESS_TOKEN_EXPDATE
    });
  }

  signRefreshToken(userId: string, email: string): Promise<string> {
    const payload = { id: userId, email };
    const REFRESH_TOKEN = this.config.getOrThrow<string>('REFRESH_TOKEN');
    const REFRESH_TOKEN_EXPDATE = this.config.getOrThrow<string>(
      'REFRESH_TOKEN_EXPDATE'
    );

    return this.jwt.signAsync(payload, {
      secret: REFRESH_TOKEN,
      expiresIn: REFRESH_TOKEN_EXPDATE
    });
  }
}
