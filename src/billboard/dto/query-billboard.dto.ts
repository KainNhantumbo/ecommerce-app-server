import { IsOptional, IsString } from 'class-validator';

export class BillboardQueryDto {
  @IsOptional()
  @IsString()
  fields?: string;
}
