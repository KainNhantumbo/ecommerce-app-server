import { Repository } from 'typeorm';
import { DecodedPayload } from '../types';
import { User } from '../user/user.entity';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { Injectable, UnauthorizedException } from '@nestjs/common';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    config: ConfigService,
    @InjectRepository(User) private user: Repository<User>
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: config.get<string>('ACCESS_TOKEN')
    });
  }

  validate(payload: DecodedPayload) {
    const user = this.user.exist({ where: { id: payload.id } });

    if (!user) throw new UnauthorizedException();
    return payload;
  }
}
