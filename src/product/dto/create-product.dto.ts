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

export class GenericDataDto {
  @IsString()
  @IsNotEmpty()
  @MinLength(2)
  @MaxLength(16)
  label: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(2)
  @MaxLength(8)
  value: string;
}

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

  @IsArray({ each: true })
  colors: GenericDataDto[];

  @IsArray()
  images: { id: string | number; url: string }[];

  @IsArray({ each: true })
  sizes: GenericDataDto[];

  category: GenericDataDto;
}
