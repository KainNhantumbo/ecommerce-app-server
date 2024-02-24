import { IsNotEmpty, IsString, MaxLength, MinLength } from 'class-validator';

export class CreateBillboardDto {
  @IsString()
  @IsNotEmpty()
  @MaxLength(21)
  @MinLength(2)
  label: string;

  @IsString()
  @IsNotEmpty()
  image: string;
}
