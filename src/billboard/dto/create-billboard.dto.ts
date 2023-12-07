import {
  IsBase64,
  IsNotEmpty,
  IsString,
  MaxLength,
  MinLength
} from 'class-validator';

export class CreateBillboardDto {
  @IsString()
  @IsNotEmpty()
  @MaxLength(21)
  @MinLength(2)
  label: string;

  @IsString()
  @IsNotEmpty()
  @IsBase64()
  image: string;
}
