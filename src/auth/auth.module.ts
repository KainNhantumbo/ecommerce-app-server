import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UserService } from '../user/user.service';
import { JwtService } from '@nestjs/jwt';
import { JwtStrategy } from './auth.strategy';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../user/user.entity';

@Module({
  imports: [ TypeOrmModule.forFeature([User])],
  controllers: [AuthController],
  providers: [AuthService, UserService, JwtService, JwtStrategy]
})
export class AuthModule {}
