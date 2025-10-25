import { Injectable, NotFoundException } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { CategoryService } from '../category/category.service';
import { CreateRecordDto } from './dto/create-record.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { Record } from '@prisma/client';

@Injectable()
export class RecordService {
  constructor(
    private prisma: PrismaService,
    private readonly userService: UserService,
    private readonly categoryService: CategoryService,
  ) {}

  async createRecord({
    userId,
    categoryId,
    amount,
  }: CreateRecordDto): Promise<Record> {
    const user = await this.userService.getUser(userId);
    const category = await this.categoryService.getCategory(categoryId);

    return await this.prisma.record.create({
      data: {
        amount,
        userId: user.id,
        categoryId: category.id,
        currencyId: user.defaultCurrencyId,
      },
    });
  }

  async getRecord(id: string): Promise<Record> {
    const record = await this.prisma.record.findUnique({
      where: { id },
    });

    if (!record) {
      throw new NotFoundException(`Record with id ${id} not found`);
    }
    return record;
  }

  async deleteRecord(id: string): Promise<{ message: string }> {
    const record = await this.getRecord(id);

    await this.prisma.record.delete({
      where: { id: record.id },
    });
    return { message: `Record ${id} deleted successfully` };
  }

  async getRecords(userId?: string, categoryId?: string): Promise<Record[]> {
    return await this.prisma.record.findMany({
      where: {
        ...(userId && { userId }),
        ...(categoryId && { categoryId }),
      },
    });
  }
}
