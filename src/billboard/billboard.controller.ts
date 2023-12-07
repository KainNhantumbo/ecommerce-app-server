import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete
} from '@nestjs/common';
import { BillboardService } from './billboard.service';
import { CreateBillboardDto } from './dto/create-billboard.dto';
import { UpdateBillboardDto } from './dto/update-billboard.dto';

@Controller('billboard')
export class BillboardController {
  constructor(private readonly billboardService: BillboardService) {}

  @Post()
  create(@Body() createBillboardDto: CreateBillboardDto) {
    return this.billboardService.create(createBillboardDto);
  }

  @Get()
  findAll() {
    return this.billboardService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.billboardService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateBillboardDto: UpdateBillboardDto
  ) {
    return this.billboardService.update(+id, updateBillboardDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.billboardService.remove(+id);
  }
}
