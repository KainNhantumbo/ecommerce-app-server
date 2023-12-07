import { Module } from '@nestjs/common';
import { BillboardService } from './billboard.service';
import { BillboardController } from './billboard.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Billboard } from './entities/billboard.entity';
import { Image } from '../product/entities/image.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Billboard, Image])],
  controllers: [BillboardController],
  providers: [BillboardService]
})
export class BillboardModule {}
