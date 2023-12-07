import { Module } from '@nestjs/common';
import { ProductController } from './product.controller';
import { ProductService } from './product.service';
import { Product } from './entities/product.entity';
import { Category } from './entities/category.entity';

@Module({
  imports: [Product, Category],
  controllers: [ProductController],
  providers: [ProductService]
})
export class ProductModule {}
