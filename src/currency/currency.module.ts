import { Module } from '@nestjs/common';
import { CurrencyService } from './currency.service';
import {
  CurrenciesController,
  CurrencyController,
} from './currency.controller';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [CurrencyController, CurrenciesController],
  providers: [CurrencyService],
  exports: [CurrencyService],
})
export class CurrencyModule {}
