import {
  IsString,
  IsStrongPassword,
  IsEmail,
  IsNotEmpty,
  MaxLength,
  MinLength,
  IsEnum
} from 'class-validator';

export const roles = ['EMPLOYEE', 'USER', 'ADMIN'];

export class CreateUserDto {
  @IsString()
  @IsNotEmpty()
  @MaxLength(21)
  @MinLength(3)
  firstName: string;

  @IsString()
  @IsNotEmpty()
  @MaxLength(21)
  @MinLength(3)
  lastName: string;

  @IsEmail()
  @MaxLength(64)
  email: string;

  @IsString()
  @IsEnum([...roles])
  role: string;

  @IsString()
  @IsNotEmpty()
  employeeId: string;

  @IsStrongPassword({
    minLength: 8,
    minLowercase: 2,
    minNumbers: 0,
    minSymbols: 1,
    minUppercase: 0
  })
  @MaxLength(21)
  password: string;
}
