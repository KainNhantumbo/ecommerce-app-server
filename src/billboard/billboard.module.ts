import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { BillboardController } from './billboard.controller';
import { Billboard, BillboardSchema } from './billboard.schema';
import { BillboardService } from './billboard.service';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Billboard.name, schema: BillboardSchema }])
  ],
  controllers: [BillboardController],
  providers: [BillboardService]
})
export class BillboardModule {}
