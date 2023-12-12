import {
  IsString,
  IsOptional,
  IsStrongPassword,
  IsNotEmpty,
  MaxLength,
  MinLength,
  IsEnum
} from 'class-validator';
import { roles } from './create-user.dto';

export class UpdateUserDto {
  @IsString()
  @IsNotEmpty()
  @MinLength(3)
  @MaxLength(64)
  firstName: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(3)
  @MaxLength(64)
  lastName: string;

  @IsString()
  @IsNotEmpty()
  @IsOptional()
  @IsEnum([...roles])
  role: string;

  @IsOptional()
  @IsString()
  @IsStrongPassword()
  @MinLength(8)
  @MaxLength(21)
  password: string;
}
