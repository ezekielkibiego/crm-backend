import { IsOptional, IsString, IsInt } from 'class-validator';

export class UpdateInteractionDto {
  @IsOptional()
  @IsString()
  type?: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsOptional()
  @IsInt()
  leadId?: number;

  @IsOptional()
  @IsInt()
  customerId?: number;
}
