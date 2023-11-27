import {
  IsString,
  IsOptional,
  IsStrongPassword,
  IsNotEmpty,
  MaxLength,
  MinLength
} from 'class-validator';

export class UpdateUserDto {
  @IsOptional()
  @IsString()
  @IsNotEmpty()
  @MaxLength(64)
  @MinLength(3)
  username: string;

  @IsOptional()
  @IsString()
  @IsStrongPassword()
  @MaxLength(21)
  @MinLength(8)
  password: string;
}
