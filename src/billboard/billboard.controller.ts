import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UseGuards
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { BillboardService } from './billboard.service';
import { CreateBillboardDto } from './dto/create-billboard.dto';
import { UpdateBillboardDto } from './dto/update-billboard.dto';

@Controller('billboards')
export class BillboardController {
  constructor(private readonly billboardService: BillboardService) {}

  @UseGuards(AuthGuard('jwt'))
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
    return this.billboardService.findOne(id);
  }

  @UseGuards(AuthGuard('jwt'))
  @Patch(':id')
  update(
    @Param('id')
    id: string,
    @Body() updateBillboardDto: UpdateBillboardDto
  ) {
    return this.billboardService.update(id, updateBillboardDto);
  }

  @UseGuards(AuthGuard('jwt'))
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.billboardService.remove(id);
  }
}
