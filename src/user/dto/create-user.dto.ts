import { IsNotEmpty, IsOptional, IsString, Length } from 'class-validator';

export class CreateUserDto {
  @IsString()
  @IsNotEmpty({ message: 'Category name is required' })
  @Length(2, 20, {
    message: 'User name must be between 2 and 20 characters',
  })
  name: string;

  @IsString()
  @IsOptional()
  defaultCurrencyId: string;
}
