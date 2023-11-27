import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UserModule } from '../user/user.module';
import { UserService } from '../user/user.service';
import { JwtService } from '@nestjs/jwt';
import { JwtStrategy } from './auth.strategy';

@Module({
  imports: [UserModule],
  controllers: [AuthController],
  providers: [AuthService, UserService, JwtService, JwtStrategy]
})
export class AuthModule {}
