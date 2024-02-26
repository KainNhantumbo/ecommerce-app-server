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
  @MinLength(5)
  @MaxLength(64)
  @IsOptional()
  name: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(5)
  @MaxLength(256)
  @IsOptional()
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
  images: { id: string; publicId: string; url: string }[];

  @IsArray()
  @IsOptional()
  sizes?: { id: string; label: string; value: string }[];

  @IsOptional()
  category?: { label: string; value: string };
}
