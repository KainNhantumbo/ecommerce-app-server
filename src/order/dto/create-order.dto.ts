import { IsArray, IsNotEmpty, IsString, MinLength } from 'class-validator';

export class CreateOrderDto {
  @IsString()
  @IsNotEmpty()
  @MinLength(5)
  costumerName: string;

  @IsArray()
  items: {
    productId: number;
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
