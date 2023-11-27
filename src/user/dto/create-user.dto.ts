import {
  IsString,
  IsStrongPassword,
  IsEmail,
  IsNotEmpty,
  MaxLength,
  MinLength
} from 'class-validator';

export class CreateUserDto {
  @IsString()
  @IsNotEmpty()
  @MaxLength(64)
  @MinLength(3)
  username: string;

  @IsEmail()
  @MaxLength(64)
  email: string;

  @IsString()
  @IsStrongPassword()
  @MaxLength(21)
  @MinLength(8)
  password: string;
}