import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateRecordDto {
  @IsString()
  @IsNotEmpty()
  userId: string;

  @IsString()
  @IsNotEmpty()
  categoryId: string;

  @IsNumber()
  @IsNotEmpty()
  amount: number;

  @IsString()
  @IsOptional()
  currencyId: string;
}
