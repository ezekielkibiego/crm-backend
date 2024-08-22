import { IsString, IsEmail, IsOptional } from 'class-validator';

export class CreateLeadDto {
  @IsString()
  name: string;

  @IsEmail()
  email: string;

  @IsString()
  phone: string;

  @IsOptional()
  @IsString()
  address?: string;

  @IsOptional()
  @IsString()
  companyName?: string;

  @IsString()
  leadStatus: string;
}
