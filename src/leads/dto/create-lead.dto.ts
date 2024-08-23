import { IsNotEmpty, IsString, IsOptional, IsInt } from 'class-validator';

export class CreateLeadDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsString()
  email: string;

  @IsOptional()
  @IsString()
  phone?: string;

  @IsOptional()
  @IsString()
  address?: string;

  @IsOptional()
  @IsString()
  companyName?: string;

  @IsOptional()
  @IsString()
  leadStatus?: string;

  @IsInt()
  customerId: number;
}
