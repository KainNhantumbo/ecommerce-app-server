import {
  BadRequestException,
  Injectable,
  NotFoundException
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { InjectModel } from '@nestjs/mongoose';
import { randomUUID } from 'crypto';
import { FilterQuery, Model, SortOrder } from 'mongoose';
import { cloudinaryAPI } from '../config/cloudinary';
import { CreateProductDto } from './dto/create-product.dto';
import { ProductQueryDto } from './dto/query-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { Product, ProductDocument } from './product.schema';

@Injectable()
export class ProductService {
  private isProduction: boolean;
  private cloudFolder: string;

  constructor(
    private config: ConfigService,
    @InjectModel(Product.name) private product: Model<Product>
  ) {
    this.isProduction =
      this.config.getOrThrow<string>('NODE_ENV') === 'development'
        ? false
        : true;

    this.cloudFolder = '/we-commerce/products';
  }

  async create(createProductDto: CreateProductDto) {
    const { images, ...data } = createProductDto;
    const productImages = [];

    if (images.length > 0) {
      if (!this.isProduction) {
        for (const { url } of images) {
          productImages.push({ id: randomUUID(), publicId: randomUUID(), url });
        }
      } else {
        for (const { url } of images) {
          const result = await cloudinaryAPI.uploader.upload(url, {
            folder: this.cloudFolder
          });
          productImages.push({
            id: randomUUID(),
            publicId: result.public_id,
            url: result.secure_url
          });
        }
      }
    }

    return await this.product.create({ images: productImages, ...data });
  }

  async findAll(query: ProductQueryDto): Promise<Product[]> {
    const queryOptions: FilterQuery<ProductDocument> = {};

    if (query.search) {
      queryOptions['$or'] = [
        {
          name: { $regex: String(query.search), $option: 'i' },
          specs: { $regex: String(query.search), $option: 'i' },
          description: { $regex: String(query.search), $option: 'i' }
        }
      ];
    }

    if (!Number.isNaN(Number(query.isArchived))) {
      queryOptions.isArchived = Boolean(Number(query.isArchived));
    }

    if (!Number.isNaN(Number(query.isFeatured))) {
      queryOptions.isFeatured = Boolean(Number(query.isFeatured));
    }

    if (query.category) {
      queryOptions.category = { value: String(query.category) };
    }

    if (query.size) {
      queryOptions.sizes = {
        $elemMatch: { value: { $regex: String(query.size), $options: 'i' } }
      };
    }

    let queryResult = this.product.find(queryOptions);

    if (query.limit && query.offset) {
      queryResult = queryResult.skip(+query.offset).limit(+query.limit);
    }

    if (query.fields) {
      const fields = String(query.fields).split(',');
      if (fields.length < 1)
        throw new BadRequestException('Fields query format error.');

      queryResult = queryResult.select(fields.join());
    }

    if (query.sort) {
      const orderOptions = ['asc', 'desc'];
      const propertyOptions = ['name', 'price', 'updatedAt'];
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

      queryResult = queryResult.sort([[property, order as SortOrder]]);
    }

    const data = await queryResult.lean();
    console.log(data, queryOptions);
    return data;
  }

  async findOne(id: string) {
    const product = await this.product.findOne({ _id: id }).lean();

    if (!product)
      throw new NotFoundException(
        `Product with provided ID ${id}, was not found.`
      );
    return product;
  }

  async update(id: string, updateProductDto: UpdateProductDto) {
    const { images: incomingImages, ...data } = updateProductDto;

    const foundProduct = await this.product.findOne({ _id: id });

    if (!foundProduct) throw new NotFoundException('Product not found.');

    if (Array.isArray(incomingImages)) {
      if (this.isProduction) {
        for (const item of foundProduct.images) {
          // delete the image in the cloud if it doesn't
          // make part of incoming images
          if (!incomingImages.some(({ id }) => id === item.id)) {
            await cloudinaryAPI.uploader.destroy(item.publicId, {
              invalidate: true
            });
          }

          const image = incomingImages.find(({ id }) => id === item.id);

          // updates image data on cloud
          if (image && image.url !== item.url) {
            const result = await cloudinaryAPI.uploader.upload(image.url, {
              folder: this.cloudFolder,
              public_id: item.publicId
            });

            incomingImages.map((image) =>
              image.id === item.id ? { ...item, url: result.url } : image
            );
          }
        }

        // uploads the image if its new
        for (const image of incomingImages) {
          if (!foundProduct.images.some((item) => item.id === image.id)) {
            const result = await cloudinaryAPI.uploader.upload(image.url, {
              folder: this.cloudFolder
            });

            incomingImages.map((item) =>
              item.id === image.id ? { ...item, url: result.url, publicId: result.public_id } : image
            );
          }
        }
      }
    }

    await this.product.findOneAndUpdate(
      { _id: foundProduct._id },
      { images: incomingImages, ...data },
      { new: true, lean: true, runValidators: true }
    );
  }

  async remove(id: string): Promise<void> {
    const foundProduct = await this.product
      .findOneAndDelete({ _id: id })
      .lean();

    if (!foundProduct) throw new NotFoundException('Product not found');

    if (this.isProduction) {
      if (foundProduct.images.length > 0) {
        for (const productImage of foundProduct.images) {
          await cloudinaryAPI.uploader.destroy(productImage.publicId, {
            invalidate: true
          });
        }
      }
    }
  }
}
