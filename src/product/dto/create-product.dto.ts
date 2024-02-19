import {
  IsArray,
  IsBoolean,
  IsNotEmpty,
  IsNotEmptyObject,
  IsNumber,
  IsOptional,
  IsString,
  MaxLength,
  MinLength
} from 'class-validator';

export class CreateProductDto {
  @IsString()
  @IsNotEmpty()
  @MinLength(3)
  @MaxLength(64)
  name: string;

  @IsOptional()
  @IsString()
  @MaxLength(256)
  description: string;

  @IsOptional()
  @IsString()
  @MaxLength(2048)
  specs: string;

  @IsNumber({ allowInfinity: false, allowNaN: false })
  price: number;

  @IsBoolean()
  @IsOptional()
  isFeatured: boolean;

  @IsBoolean()
  @IsOptional()
  isArchived: boolean;

  @IsArray()
  @IsOptional()
  colors: { label: string; value: string }[];

  @IsArray()
  @IsOptional()
  images: { id: string | number; url: string }[];

  @IsArray()
  @IsOptional()
  sizes: { label: string; value: string }[];

  @IsNotEmptyObject()
  @IsOptional()
  category: { label: string; value: string };
}
