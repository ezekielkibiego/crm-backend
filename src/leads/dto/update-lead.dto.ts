import { IsOptional, IsString, IsInt } from 'class-validator';

export class UpdateLeadDto {
  @IsOptional()
  @IsString()
  phone?: string;

  @IsOptional()
  @IsString()
  leadStatus?: string;

  @IsOptional()
  @IsString()
  address?: string;

  @IsOptional()
  @IsString()
  companyName?: string;

  @IsOptional()
  @IsInt()
  customerId?: number;
}
