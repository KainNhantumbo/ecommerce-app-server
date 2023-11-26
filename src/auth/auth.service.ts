import {
  Injectable,
  NotFoundException,
  UnauthorizedException
} from '@nestjs/common';
import { UserService } from '../user/user.service';
import { SignInDto } from './dto/sign-in.dto';
import { comparePasswords } from '../utils/encrypt-utils';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(private usersService: UserService) {}

  async signIn({ email, password }: SignInDto): Promise<unknown> {
    const isProduction = process.env.NODE_ENV === 'development' ? false : true;
    const user = await this.usersService.findOne(email);

    if (!user)
      throw new NotFoundException(
        'Account not found. Please check your email and try again.'
      );

    const match = await comparePasswords(password, user.password);
    if (!match) throw new UnauthorizedException();


    // const accessToken = await createToken(
    //   { id: String(user.id) },
    //   process.env.ACCESS_TOKEN,
    //   process.env.ACCESS_TOKEN_EXPDATE
    // );
    // const refreshToken = await createToken(
    //   { id: String(user.id) },
    //   process.env.REFRESH_TOKEN,
    //   process.env.REFRESH_TOKEN_EXPDATE
    // );

    // res
    //   .status(200)
    //   .cookie('userToken', refreshToken, {
    //     httpOnly: true,
    //     secure: PROD_ENV && true,
    //     sameSite: 'strict',
    //     expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)
    //   })
    //   .json({
    //     id: String(user.id),
    //     token: accessToken,
    //     email: user.email,
    //     name: `${user.first_name} ${user.last_name}`
    //   });
    return;
  }

  
}
