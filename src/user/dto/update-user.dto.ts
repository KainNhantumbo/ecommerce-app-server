import {
  IsString,
  IsOptional,
  IsStrongPassword,
  IsNotEmpty,
  MaxLength,
  MinLength,
  IsEnum,
  IsEmpty
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

  @IsString()
  @IsNotEmpty()
  @IsOptional()
  employeeId: string;

  @IsOptional()
  @IsString()
  password: string;
}
