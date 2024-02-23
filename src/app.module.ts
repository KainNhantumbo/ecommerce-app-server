import { CacheInterceptor, CacheModule } from '@nestjs/cache-manager';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { ThrottlerModule } from '@nestjs/throttler';
import { DataSource } from 'typeorm';
import { AuthModule } from './auth/auth.module';
import { BillboardModule } from './billboard/billboard.module';
import configuration from './config/configuration';
import { HealthModule } from './health/health.module';
import { OrderModule } from './order/order.module';
import { ProductModule } from './product/product.module';
import { UserModule } from './user/user.module';
import { MongooseModule } from '@nestjs/mongoose';

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
    MongooseModule.forRoot(process.env.DATABASE_URI),
    UserModule,
    AuthModule,
    HealthModule,
    ProductModule,
    OrderModule,
    BillboardModule
  ],
  controllers: [],
  providers: [{ provide: APP_INTERCEPTOR, useClass: CacheInterceptor }]
})
export class AppModule {
  constructor(private dataSource: DataSource) {}
}
