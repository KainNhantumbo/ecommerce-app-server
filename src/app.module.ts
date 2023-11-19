import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import configuration from './config/configuration';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';
import { UserModule } from './user/user.module';
import { User } from './user/user.entity';
import { ThrottlerModule } from '@nestjs/throttler';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true, load: [configuration] }),
    ThrottlerModule.forRoot([
      {
        ttl: 60 * 1000,
        limit: 200
      }
    ]),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DATABASE_HOST,
      database: process.env.DATABASE,
      port: parseInt(process.env.DATABASE_PORT),
      username: process.env.DATABASE_USERNAME,
      password: process.env.DATABASE_PASSWORD,
      synchronize: process.env.NODE_ENV === 'development',
      entities: [User]
    }),
    UserModule,
    AuthModule
  ],
  controllers: [],
  providers: []
})
export class AppModule {
  constructor(private dataSource: DataSource) {}
}
