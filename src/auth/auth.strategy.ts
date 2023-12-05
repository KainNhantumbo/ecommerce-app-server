import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { User } from '../user/user.entity';
import { DataSource } from 'typeorm';
import { DecodedPayload } from '../types';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    config: ConfigService,
    private dataSource: DataSource
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: config.get('ACCESS_TOKEN')
    });
  }

  validate(payload: DecodedPayload) {
    const user = this.dataSource
      .getRepository(User)
      .exist({ where: { id: payload.id } });

    if (!user) throw new UnauthorizedException();

    return payload;
  }
}
