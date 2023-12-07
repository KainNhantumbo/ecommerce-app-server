import {
  IsArray,
  IsBoolean,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  MaxLength,
  MinLength
} from 'class-validator';
import { GenericDataDto } from './create-product.dto';

export class UpdateProductDto {
  @IsString()
  @IsNotEmpty()
  @MinLength(3)
  @MaxLength(21)
  @IsOptional()
  name?: string;

  @IsNumber({ allowInfinity: false, allowNaN: false })
  price?: number;

  @IsBoolean()
  @IsOptional()
  isFeatured?: boolean;

  @IsBoolean()
  @IsOptional()
  isArchived?: boolean;

  @IsArray({ each: true })
  @IsOptional()
  colors?: GenericDataDto[];

  @IsArray({ each: true })
  @IsOptional()
  sizes?: GenericDataDto[];

  @IsOptional()
  category?: GenericDataDto;
}
