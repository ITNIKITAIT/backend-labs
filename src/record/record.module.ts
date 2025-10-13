import { Module } from '@nestjs/common';
import { RecordService } from './record.service';
import { RecordController } from './record.controller';
import { UserModule } from 'src/user/user.module';
import { CategoryModule } from 'src/category/category.module';

@Module({
  imports: [UserModule, CategoryModule],
  controllers: [RecordController],
  providers: [RecordService],
})
export class RecordModule {}
