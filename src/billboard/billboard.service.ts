import { Injectable, NotFoundException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { InjectModel } from '@nestjs/mongoose';
import { randomUUID } from 'crypto';
import { Model } from 'mongoose';
import { cloudinaryAPI } from '../config/cloudinary';
import { Billboard } from './billboard.schema';
import { CreateBillboardDto } from './dto/create-billboard.dto';
import { UpdateBillboardDto } from './dto/update-billboard.dto';
import { BillboardQueryDto } from './dto/query-billboard.dto';

@Injectable()
export class BillboardService {
  private isProduction: boolean;
  private cloudFolder: string;
  constructor(
    private config: ConfigService,
    @InjectModel(Billboard.name) private billboard: Model<Billboard>
  ) {
    this.isProduction =
      this.config.getOrThrow<string>('NODE_ENV') === 'development'
        ? false
        : true;

    this.cloudFolder = '/we-commerce/billboards';
  }

  async create({ label, image }: CreateBillboardDto) {
    if (!this.isProduction) {
      return await this.billboard.create({
        label,
        image: {
          url: image,
          publicId: randomUUID()
        }
      });
    }

    const result = await cloudinaryAPI.uploader.upload(image, {
      folder: this.cloudFolder
    });

    return await this.billboard.create({
      label,
      image: {
        publicId: result.public_id,
        url: result.secure_url
      }
    });
  }

  async findAll({ fields }: BillboardQueryDto) {
    let query = this.billboard.find();

    if (fields) {
      const strings = String(fields).split(',').join(' ');
      query = query.select(strings);
    }

    return await query.lean();
  }

  async findOne(id: string) {
    const foundBillboard = await this.billboard.findOne({
      _id: id
    });

    if (!foundBillboard)
      throw new NotFoundException(
        `Billboard with provided ID ${id}, was not found.`
      );

    return foundBillboard;
  }

  async update(id: string, data: UpdateBillboardDto) {
    const foundBillboard = await this.billboard.findOne({ _id: id });

    if (data.image) {
      if (!this.isProduction) {
        data.image = {
          publicId: foundBillboard.image.publicId,
          url: data.image
        } as unknown as never;
      }

      const result = await cloudinaryAPI.uploader.upload(data.image, {
        folder: this.cloudFolder,
        public_id: foundBillboard.image.publicId
      });

      data.image = {
        publicId: result.public_id,
        url: result.secure_url
      } as unknown as never;
    }

    return await this.billboard.findOneAndUpdate(
      { _id: foundBillboard._id },
      { label: data.label, image: data.image },
      { runValidators: true, new: true, lean: true }
    );
  }

  async remove(id: string): Promise<void> {
    const foundBillboard = await this.billboard.findOneAndDelete({ _id: id });

    if (!foundBillboard) throw new NotFoundException('Billboard not found');

    if (this.isProduction) {
      await cloudinaryAPI.uploader.destroy(foundBillboard.image.publicId, {
        invalidate: true
      });
    }
  }
}
