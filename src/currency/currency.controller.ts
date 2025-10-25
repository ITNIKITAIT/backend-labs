import { Controller, Get, Post, Body, Param, Delete } from '@nestjs/common';
import { CurrencyService } from './currency.service';
import { CreateCurrencyDto } from './dto/create-currency.dto';

@Controller('currency')
export class CurrencyController {
  constructor(private readonly currencyService: CurrencyService) {}

  @Post()
  createCurrency(@Body() createCurrencyDto: CreateCurrencyDto) {
    return this.currencyService.createCurrency(createCurrencyDto);
  }

  @Get(':currency_id')
  getCurrency(@Param('currency_id') recordId: string) {
    return this.currencyService.getCurrency(recordId);
  }

  @Delete(':currency_id')
  remove(@Param('currency_id') recordId: string) {
    return this.currencyService.deleteCurrency(recordId);
  }

  @Get()
  getRecords() {
    return this.currencyService.getCurrencies();
  }
}
