import { Body, Controller, Post, Req, Res } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignInDto } from './dto/sign-in.dto';
import { CreateUserDto } from '../user/dto/create-user.dto';
import { Request, Response } from 'express';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('/sign-in')
  async signIn(@Res() res: Response, @Body() signInDto: SignInDto) {
    const { access_token, refresh_token, isProduction, user } =
      await this.authService.signIn(signInDto);

    res
      .status(201)
      .cookie('token', refresh_token, {
        httpOnly: true,
        secure: isProduction && true,
        sameSite: 'strict',
        expires: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000)
      })
      .json({
        user,
        token: access_token
      });
  }

  @Post('/sign-up')
  async signUp(@Body() createUserDto: CreateUserDto) {
    return this.authService.signUp(createUserDto);
  }

  @Post('/refresh')
  async revalidateToken(@Req() req: Request) {
    const token = req.cookies['token'];
    return this.authService.revalidateToken(token);
  }
}
