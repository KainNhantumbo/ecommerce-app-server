import {
  IsArray,
  IsBase64,
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
  @MaxLength(8)
  name: string;

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
  @MaxLength(21)
  name: string;

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

  @IsArray({ each: true })
  @IsBase64()
  images: string[];

  @IsArray({ each: true })
  sizes: GenericDataDto[];

  category: GenericDataDto;
}
