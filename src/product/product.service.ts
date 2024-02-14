import {
  BadRequestException,
  Injectable,
  NotFoundException,
  UnprocessableEntityException
} from '@nestjs/common';
import { cloudinaryAPI } from '../config/cloudinary';
import { Product } from './entities/product.entity';
import { randomUUID } from 'crypto';
import { InjectRepository } from '@nestjs/typeorm';
import { FindManyOptions, Repository } from 'typeorm';
import { ConfigService } from '@nestjs/config';
import { Image } from './entities/image.entity';
import { CreateProductDto } from './dto/create-product.dto';
import { Color } from './entities/color.entity';
import { Size } from './entities/size.entity';
import { Category } from './entities/category.entity';
import { UpdateProductDto } from './dto/update-product.dto';
import { ProductQueryDto } from './dto/query-product.dto';
import { ILike, ArrayContains } from 'typeorm';

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
        for (const { url } of images) {
          productImages.push(
            this.image.create({ publicId: randomUUID(), url })
          );
        }
      } else {
        for (const { url } of images) {
          const result = await cloudinaryAPI.uploader.upload(url, {
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

    const productColor = colors.map((color) =>
      this.color.create({ label: color.label, value: color.value })
    );

    const productSizes = sizes.map((size) =>
      this.size.create({ label: size.label, value: size.value })
    );

    const productCategory = this.category.create({
      label: category.label,
      value: category.value
    });

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
    const queryOptions: FindManyOptions<Product> = {
      relations: { images: true, category: true, sizes: true, colors: true }
    };

    if (query.search) {
      queryOptions.where = {
        name: ILike(`%${String(query.search)}%`),
        specs: ILike(`%${String(query.search)}%`),
        description: ILike(`%${String(query.search)}%`)
      };
    }

    if (query.isArchived !== null || query.isArchived !== undefined) {
      queryOptions.where = {
        ...queryOptions.where,
        isArchived: Boolean(query.isArchived)
      };
    }

    if (query.isFeatured !== null || query.isFeatured !== undefined) {
      queryOptions.where = {
        ...queryOptions.where,
        isArchived: Boolean(query.isFeatured)
      };
    }

    if (query.category) {
      queryOptions.where = {
        ...queryOptions.where,
        category: { value: ILike(`%${String(query.category)}%`) }
      };
    }

    if (query.size) {
      queryOptions.where = {
        ...queryOptions.where,
        sizes: { value: ArrayContains(ILike(`%${String(query.size)}%`)) }
      };
    }

    if (query.limit && query.offset) {
      queryOptions.skip = +query.offset;
      queryOptions.take = +query.limit;
    }

    if (query.sort) {
      const orderOptions = ['ASC', 'DESC', 'asc', 'desc'];
      const propertyOptions = ['name', 'price', 'createdAt', 'updatedAt'];
      const [property, order] = String(query.sort).split(',');

      if (!property || !order) {
        throw new BadRequestException(
          'Sort format error, please check and try again.'
        );
      }

      if (!orderOptions.includes(order)) {
        throw new BadRequestException(
          'Unrecognized sort order type, please check and try again.'
        );
      }

      if (!propertyOptions.includes(property)) {
        throw new BadRequestException(
          'Unrecognized sort order type, please check and try again.'
        );
      }

      queryOptions.order[property] = order;
    }

    if (query.fields) {
      const fields = String(query.fields).split(',');
      if (fields.length < 1)
        throw new BadRequestException('Fields query format error.');

      const selectOptions = fields
        .map((field) => ({ [field]: true }))
        .reduce((value, curr) => ({ ...value, ...curr }), {});

      queryOptions.select = { ...queryOptions.select, ...selectOptions };
    }

    return await this.product.find({
      ...queryOptions
    });
  }

  async findOne(id: number): Promise<Product> {
    if (!id) throw new BadRequestException('Invalid product id.');
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
    const {
      colors,
      category,
      sizes,
      images: incomingImages,
      ...data
    } = updateProductDto;
    let productCategory: { label: string };
    let productColor: Array<{ label: string; value: string }>;
    let productSizes: Array<{ label: string; value: string }>;
    const productImages = [];

    const foundProduct = await this.product.findOne({ where: { id } });

    if (!foundProduct) throw new NotFoundException('Product not found.');

    if (category) {
      productCategory = this.category.create({
        label: category.label,
        value: category.value
      });
    }

    if (Array.isArray(colors)) {
      productColor = colors.map((color) =>
        this.color.create({ label: color.label, value: color.value })
      );
    }

    if (Array.isArray(sizes)) {
      productSizes = sizes.map((size) =>
        this.size.create({ label: size.label, value: size.value })
      );
    }

    if (Array.isArray(incomingImages) && incomingImages.length > 0) {
      if (!this.isProduction) {
        for (const incomingImage of incomingImages) {
          for (const image of foundProduct.images) {
            if (incomingImage.id === image.id) {
              productImages.push(
                this.image.update(image.id, {
                  url: incomingImage.url
                })
              );
            } else {
              productImages.push(
                this.image.create({
                  publicId: randomUUID(),
                  url: incomingImage.url
                })
              );
            }
          }
        }
      } else {
        for (const incomingImage of incomingImages) {
          for (const image of foundProduct.images) {
            if (incomingImage.id === image.id) {
              const result = await cloudinaryAPI.uploader.upload(
                incomingImage.url,
                {
                  folder: '/ecommerce-app-nestjs/products',
                  public_id: image.publicId
                }
              );
              productImages.push(
                this.image.update(image.id, {
                  url: result.url,
                  publicId: result.public_id
                })
              );
            } else {
              const result = await cloudinaryAPI.uploader.upload(
                incomingImage.url,
                {
                  folder: '/ecommerce-app-nestjs/products'
                }
              );
              productImages.push(
                this.image.create({
                  publicId: result.public_id,
                  url: result.secure_url
                })
              );
            }
          }
        }
      }
    }

    const result = await this.product.update(id, {
      colors: productColor,
      sizes: productSizes,
      category: productCategory,
      images: productImages.length > 0 ? productImages : foundProduct.images,
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
