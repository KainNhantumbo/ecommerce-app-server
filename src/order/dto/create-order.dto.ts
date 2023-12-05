import {
  IsArray,
  IsBoolean,
  IsNotEmpty,
  IsNumber,
  IsString
} from 'class-validator';

export class CreateOrderDto {
  @IsNumber({ allowInfinity: false, allowNaN: false })
  storeId: number;

  @IsArray({ each: true, message: 'Please provide order items' })
  @IsNumber({ allowInfinity: false, allowNaN: false })
  orderItems: number[];

  @IsBoolean()
  isPaid: boolean;

  @IsString({ message: 'Please provide a valid phone number' })
  @IsNotEmpty({ message: 'Please provide your phone number' })
  phone: string;

  @IsString({ message: 'Please provide a valid adress' })
  @IsNotEmpty({ message: 'Please provide your adress' })
  adress: string;
}
