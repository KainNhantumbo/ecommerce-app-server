import {
  IsBase64,
  IsNotEmpty,
  IsOptional,
  IsString,
  MaxLength,
  MinLength
} from 'class-validator';
import { PartialType } from '@nestjs/swagger';
import { CreateBillboardDto } from './create-billboard.dto';

export class UpdateBillboardDto extends PartialType(CreateBillboardDto) {
  @IsString()
  @IsNotEmpty()
  @MaxLength(21)
  @MinLength(2)
  @IsOptional()
  label?: string;

  @IsString()
  @IsNotEmpty()
  @IsOptional()
  image?: string;
}
