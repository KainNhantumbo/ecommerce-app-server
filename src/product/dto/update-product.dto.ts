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

export class UpdateProductDto {
  @IsString()
  @IsNotEmpty()
  @MinLength(3)
  @MaxLength(21)
  @IsOptional()
  name?: string;

  @IsOptional()
  @IsString()
  @MaxLength(256)
  description: string;

  @IsOptional()
  @IsString()
  @MaxLength(2048)
  specs: string;

  @IsNumber({ allowInfinity: false, allowNaN: false })
  @IsOptional()
  price?: number;

  @IsBoolean()
  @IsOptional()
  isFeatured?: boolean;

  @IsBoolean()
  @IsOptional()
  isArchived?: boolean;

  @IsArray()
  @IsOptional()
  colors?: { id: string; label: string; value: string }[];

  @IsArray()
  @IsOptional()
  images: { id: string | number; url: string }[];

  @IsArray()
  @IsOptional()
  sizes?: { id: string; label: string; value: string }[];

  @IsOptional()
  category?: { label: string; value: string };
}
