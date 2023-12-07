import { Module } from '@nestjs/common';
import { ProductController } from './product.controller';
import { ProductService } from './product.service';
import { Product } from './entities/product.entity';
import { Category } from './entities/category.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Image } from './entities/image.entity';
import { Size } from './entities/size.entity';
import { Color } from './entities/color.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Product, Category, Image, Size, Color])],
  controllers: [ProductController],
  providers: [ProductService]
})
export class ProductModule {}
