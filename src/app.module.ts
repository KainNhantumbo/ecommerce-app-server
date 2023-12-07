import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import configuration from './config/configuration';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';
import { UserModule } from './user/user.module';
import { ThrottlerModule } from '@nestjs/throttler';
import { AuthModule } from './auth/auth.module';
import { CacheModule, CacheInterceptor } from '@nestjs/cache-manager';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { HealthModule } from './health/health.module';
import { ProductModule } from './product/product.module';
import { OrderModule } from './order/order.module';

import { Category } from './product/entities/category.entity';
import { Product } from './product/entities/product.entity';
import { Image } from './product/entities/image.entity';
import { Color } from './product/entities/color.entity';
import { Size } from './product/entities/size.entity';
import { Order } from './order/entities/order.entity';
import { OrderItem } from './order/entities/orderItem.entity';
import { User } from './user/user.entity';
import { BillboardModule } from './billboard/billboard.module';
import { Billboard } from './billboard/entities/billboard.entity';

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
      entities: [
        Category,
        Product,
        Image,
        Color,
        User,
        Size,
        Order,
        OrderItem,
        Billboard
      ]
    }),
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
