import {
  Injectable,
  NotFoundException,
  UnprocessableEntityException
} from '@nestjs/common';
import { CreateBillboardDto } from './dto/create-billboard.dto';
import { UpdateBillboardDto } from './dto/update-billboard.dto';
import { Image } from '../product/entities/image.entity';
import { Billboard } from './entities/billboard.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ConfigService } from '@nestjs/config';
import { randomUUID } from 'crypto';
import { cloudinaryAPI } from '../config/cloudinary';

@Injectable()
export class BillboardService {
  private isProduction: boolean;
  private cloudFolder: string;
  constructor(
    private config: ConfigService,
    @InjectRepository(Image) private image: Repository<Image>,
    @InjectRepository(Billboard) private billboard: Repository<Billboard>
  ) {
    this.isProduction =
      this.config.getOrThrow<string>('NODE_ENV') === 'development'
        ? false
        : true;

    this.cloudFolder = '/ecommerce-app-nestjs/billboards';
  }

  async create(createBillboardDto: CreateBillboardDto): Promise<Billboard> {
    if (!this.isProduction) {
      const image = this.image.create({
        publicId: randomUUID(),
        url: createBillboardDto.image
      });

      await this.billboard
        .create({
          label: createBillboardDto.label,
          image
        })
        .save();

      image.save();
      return;
    }

    const result = await cloudinaryAPI.uploader.upload(
      createBillboardDto.image,
      {
        folder: this.cloudFolder
      }
    );

    const image = this.image.create({
      publicId: result.public_id,
      url: result.secure_url
    });

    return await this.billboard
      .create({
        label: createBillboardDto.label,
        image
      })
      .save();
  }

  async findAll(): Promise<Billboard[]> {
    return await this.billboard.find({ relations: { image: true } });
  }

  async findOne(id: number): Promise<Billboard> {
    const image = await this.billboard.findOne({
      where: { id },
      relations: { image: true }
    });

    if (!image)
      throw new NotFoundException(
        `Image with provided ID ${id}, was not found.`
      );

    return image;
  }

  async update(id: number, updateBillboardDto: UpdateBillboardDto) {
    const foundBillboard = await this.findOne(id);

    if (updateBillboardDto.image) {
      if (!this.isProduction) {
        return await this.billboard.update(foundBillboard.id, {
          label: updateBillboardDto?.label,
          image: this.image.update(foundBillboard.image.id, {
            publicId: foundBillboard.image.publicId,
            url: updateBillboardDto.image
          }) as unknown
        });
      }

      const result = await cloudinaryAPI.uploader.upload(
        updateBillboardDto.image,
        {
          folder: this.cloudFolder,
          public_id: foundBillboard.image.publicId
        }
      );

      return await this.billboard.update(foundBillboard.id, {
        label: updateBillboardDto.label,
        image: this.image.update(foundBillboard.image.id, {
          publicId: result.public_id,
          url: result.secure_url
        }) as unknown
      });
    }

    return await this.billboard
      .create({ label: updateBillboardDto?.label })
      .save();
  }

  async remove(id: number): Promise<void> {
    const foundBillboard = await this.billboard.findOne({
      where: { id },
      relations: { image: true }
    });

    if (!foundBillboard) throw new NotFoundException('Billboard not found');
    if (this.isProduction) {
      await cloudinaryAPI.uploader.destroy(foundBillboard.image.publicId, {
        invalidate: true
      });
    }

    const result = await this.billboard.delete(id);

    if (result.affected < 1)
      throw new UnprocessableEntityException('Failed to delete billboard.');
  }
}
