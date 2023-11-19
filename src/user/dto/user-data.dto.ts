import {
  IsString,
  IsOptional,
  IsStrongPassword,
  IsEmail,
  IsNotEmpty
} from 'class-validator';

export class UserDto {
  @IsString()
  @IsNotEmpty()
  firstName: string;

  @IsString()
  @IsNotEmpty()
  lastName: string;

  @IsEmail()
  email: string;

  @IsOptional()
  @IsString()
  @IsStrongPassword()
  password: string;
}
