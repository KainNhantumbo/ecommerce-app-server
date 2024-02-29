import { IsOptional, IsString } from 'class-validator';

export class OrderQueryDto {
  @IsOptional()
  @IsString()
  fields?: string;
}
