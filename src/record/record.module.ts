import { Module } from '@nestjs/common';
import { RecordService } from './record.service';
import { RecordController } from './record.controller';
import { UserModule } from 'src/user/user.module';
import { CategoryModule } from 'src/category/category.module';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  imports: [UserModule, CategoryModule, PrismaModule],
  controllers: [RecordController],
  providers: [RecordService],
})
export class RecordModule {}
