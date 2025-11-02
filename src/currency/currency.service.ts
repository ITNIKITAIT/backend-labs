import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateCurrencyDto } from './dto/create-currency.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { Currency } from '@prisma/client';

@Injectable()
export class CurrencyService {
  constructor(private prisma: PrismaService) {}

  async createCurrency(
    createCurrencyDto: CreateCurrencyDto,
  ): Promise<Currency> {
    const esictingCurrency = await this.prisma.currency.findUnique({
      where: { code: createCurrencyDto.code },
    });
    if (esictingCurrency) {
      throw new NotFoundException(
        `Currency with code ${createCurrencyDto.code} already exists`,
      );
    }
    return await this.prisma.currency.create({
      data: createCurrencyDto,
    });
  }

  async getCurrency(id: string): Promise<Currency> {
    const currency = await this.prisma.currency.findUnique({
      where: { id },
    });

    if (!currency) {
      throw new NotFoundException(`Record with id ${id} not found`);
    }
    return currency;
  }

  async deleteCurrency(id: string): Promise<{ message: string }> {
    const currency = await this.getCurrency(id);

    await this.prisma.currency.delete({
      where: { id: currency.id },
    });
    return { message: `Currency ${id} deleted successfully` };
  }

  async getCurrencies(): Promise<Currency[]> {
    return await this.prisma.currency.findMany({
      where: {},
    });
  }

  async getDefaultCurrency(): Promise<Currency | null> {
    return await this.prisma.currency.findFirst({
      where: {},
    });
  }
}
