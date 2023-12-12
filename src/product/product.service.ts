import {
  Injectable,
  NotFoundException,
  UnprocessableEntityException
} from '@nestjs/common';
import { cloudinaryAPI } from '../config/cloudinary';
import { Product } from './entities/product.entity';
import { randomUUID } from 'crypto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ConfigService } from '@nestjs/config';
import { Image } from './entities/image.entity';
import { CreateProductDto } from './dto/create-product.dto';
import { Color } from './entities/color.entity';
import { Size } from './entities/size.entity';
import { Category } from './entities/category.entity';
import { UpdateProductDto } from './dto/update-product.dto';
import { ProductQueryDto } from './dto/query-product.dto';

@Injectable()
export class ProductService {
  private isProduction: boolean;

  constructor(
    private config: ConfigService,
    @InjectRepository(Image) private image: Repository<Image>,
    @InjectRepository(Color) private color: Repository<Color>,
    @InjectRepository(Size) private size: Repository<Size>,
    @InjectRepository(Category) private category: Repository<Category>,
    @InjectRepository(Product) private product: Repository<Product>
  ) {
    this.isProduction =
      this.config.getOrThrow<string>('NODE_ENV') === 'development'
        ? false
        : true;
  }

  async create(createProductDto: CreateProductDto): Promise<Product> {
    const { colors, category, images, sizes, ...data } = createProductDto;
    const productImages = [];

    if (images.length > 0) {
      if (!this.isProduction) {
        for (const productImage of productImages) {
          productImages.push(
            this.image.create({
              publicId: randomUUID(),
              url: productImage
            })
          );
        }
      } else {
        for (const productImage of productImages) {
          const result = await cloudinaryAPI.uploader.upload(productImage, {
            folder: '/ecommerce-app-nestjs/products'
          });
          productImages.push(
            this.image.create({
              publicId: result.public_id,
              url: result.secure_url
            })
          );
        }
      }
    }

    const productColor = colors.map((color) => this.color.create({ ...color }));
    const productCategory = this.category.create({ ...category });
    const productSizes = sizes.map((size) => this.size.create({ ...size }));

    return await this.product
      .create({
        colors: productColor,
        sizes: productSizes,
        images: productImages,
        category: productCategory,
        ...data
      })
      .save();
  }

  async findAll(query: ProductQueryDto): Promise<Product[]> {
    return await this.product.find({
      relations: { images: true, category: true, sizes: true, colors: true }
    });
  }

  async findOne(id: number): Promise<Product> {
    const product = await this.product.findOne({
      where: { id },
      relations: { images: true, category: true, sizes: true, colors: true }
    });

    if (!product)
      throw new NotFoundException(
        `Product with provided ID ${id}, was not found.`
      );

    return product;
  }

  async update(id: number, updateProductDto: UpdateProductDto) {
    const { colors, category, sizes, ...data } = updateProductDto;
    let productCategory: { name: string };
    let productColor: Array<{ name: string; value: string }>;
    let productSizes: Array<{ name: string; value: string }>;

    const foundProduct = await this.product.findOne({ where: { id } });

    if (!foundProduct) throw new NotFoundException('Product not found.');

    if (category) {
      productCategory = this.category.create({ ...category });
    }

    if (Array.isArray(colors)) {
      productColor = colors.map((color) => this.color.create({ ...color }));
    }

    if (Array.isArray(sizes)) {
      sizes.map((size) => this.size.create({ ...size }));
    }

    const result = await this.product.update(id, {
      colors: productColor,
      sizes: productSizes,
      category: productCategory,
      ...data
    });

    if (result.affected < 1)
      throw new UnprocessableEntityException('Failed to update product.');
  }

  async remove(id: number): Promise<void> {
    const foundProduct = await this.product.findOne({
      where: { id },
      relations: {
        images: true
      }
    });

    if (!foundProduct) throw new NotFoundException('Product not found');

    if (foundProduct.images.length > 0) {
      for (const productImage of foundProduct.images) {
        await cloudinaryAPI.uploader.destroy(productImage.publicId, {
          invalidate: true
        });
      }
    }

    await foundProduct.remove();
  }
}
