import { IsNotEmpty, IsString } from 'class-validator';

export class CreateCurrencyDto {
  @IsString()
  @IsNotEmpty({ message: 'Currency code is required' })
  code: string;

  @IsString()
  @IsNotEmpty({ message: 'Currency name is required' })
  name: string;

  @IsString()
  @IsNotEmpty({ message: 'Currency symbol is required' })
  symbol: string;
}
