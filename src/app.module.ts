import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import configuration from './config/configuration';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';
import { UserModule } from './user/user.module';
import { User } from './user/user.entity';
import { ThrottlerModule } from '@nestjs/throttler';
import { AuthModule } from './auth/auth.module';
import { CacheModule, CacheInterceptor } from '@nestjs/cache-manager';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { HealthModule } from './health/health.module';
import { StoreModule } from './store/store.module';
import { ProductModule } from './product/product.module';
import { OrderModule } from './order/order.module';

@Module({
  imports: [
    CacheModule.register({
      ttl: 15000,
      max: 20,
      isGlobal: true
    }),
    ConfigModule.forRoot({
      isGlobal: true,
      load: [configuration],
      cache: true
    }),
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
    AuthModule,
    HealthModule,
    StoreModule,
    ProductModule,
    OrderModule
  ],
  controllers: [],
  providers: [{ provide: APP_INTERCEPTOR, useClass: CacheInterceptor }]
})
export class AppModule {
  constructor(private dataSource: DataSource) {}
}
