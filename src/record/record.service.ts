import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { UserService } from '../user/user.service';
import { CategoryService } from '../category/category.service';
import { Record } from './entities/record.entity';
import { randomUUID } from 'node:crypto';
import { CreateRecordDto } from './dto/create-record.dto';

@Injectable()
export class RecordService {
  private records: Record[] = [];

  constructor(
    private readonly userService: UserService,
    private readonly categoryService: CategoryService,
  ) {}

  public findRecordById(id: string): Record | undefined {
    return this.records.find((record) => record.id === id);
  }

  createRecord({ userId, categoryId, amount }: CreateRecordDto): Record {
    if (!this.userService.findUserById(userId)) {
      throw new BadRequestException(`User with id ${userId} does not exist`);
    }

    if (!this.categoryService.findCategoryById(categoryId)) {
      throw new BadRequestException(
        `Category with id ${categoryId} does not exist`,
      );
    }

    const record: Record = {
      id: randomUUID(),
      userId,
      categoryId,
      createdAt: new Date(),
      amount,
    };

    this.records.push(record);
    return record;
  }

  getRecord(id: string): Record {
    const record = this.findRecordById(id);
    if (!record) {
      throw new NotFoundException(`Record with id ${id} not found`);
    }
    return record;
  }

  deleteRecord(id: string): { message: string } {
    const record = this.findRecordById(id);
    if (!record) {
      throw new NotFoundException(`Record with id ${id} not found`);
    }
    this.records.splice(this.records.indexOf(record), 1);
    return { message: `Record ${id} deleted successfully` };
  }

  getRecords(userId?: string, categoryId?: string): Record[] {
    let records = [...this.records];

    if (userId) {
      records = records.filter((record) => record.userId === userId);
    }

    if (categoryId) {
      records = records.filter((record) => record.categoryId === categoryId);
    }

    return records;
  }
}
