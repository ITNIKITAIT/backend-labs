import {
  Controller,
  Get,
  Post,
  Delete,
  Param,
  Body,
  Query,
  BadRequestException,
  UseGuards,
} from '@nestjs/common';
import { RecordService } from './record.service';
import { CreateRecordDto } from './dto/create-record.dto';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

@Controller('record')
@UseGuards(JwtAuthGuard)
export class RecordController {
  constructor(private readonly recordService: RecordService) {}

  @Post()
  createRecord(@Body() body: CreateRecordDto) {
    return this.recordService.createRecord(body);
  }

  @Get(':record_id')
  getRecord(@Param('record_id') recordId: string) {
    return this.recordService.getRecord(recordId);
  }

  @Delete(':record_id')
  deleteRecord(@Param('record_id') recordId: string) {
    return this.recordService.deleteRecord(recordId);
  }

  @Get()
  getRecords(
    @Query('user_id') userId?: string,
    @Query('category_id') categoryId?: string,
  ) {
    if (!userId && !categoryId) {
      throw new BadRequestException(
        'At least one parameter (user_id or category_id) must be provided',
      );
    }
    return this.recordService.getRecords(userId, categoryId);
  }
}
