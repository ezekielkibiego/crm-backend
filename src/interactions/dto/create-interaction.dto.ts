import { IsNotEmpty, IsString, IsInt } from 'class-validator';

export class CreateInteractionDto {
  @IsNotEmpty()
  @IsString()
  type: string;

  @IsNotEmpty()
  @IsString()
  description: string;

  @IsNotEmpty()
  @IsInt()
  leadId: number;

  @IsNotEmpty()
  @IsInt()
  customerId: number;
}
