import {
  IsArray,
  IsNotEmpty,
  IsString,
  MinLength,
  MaxLength
} from 'class-validator';

export class CreateOrderDto {
  @IsString()
  @IsNotEmpty()
  @MinLength(5)
  @MaxLength(64)
  customerName: string;

  @IsArray()
  items: {
    productId: string;
    quantity: number;
    sizes: string[];
    colors: string[];
  }[];

  @IsString({ message: 'Please provide a valid phone number' })
  @IsNotEmpty({ message: 'Please provide your phone number' })
  phone: string;

  @IsString({ message: 'Please provide a valid address' })
  @IsNotEmpty({ message: 'Please provide your address' })
  address: string;
}
