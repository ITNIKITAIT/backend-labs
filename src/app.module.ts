import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { CategoryModule } from './category/category.module';
import { RecordModule } from './record/record.module';
import { PrismaModule } from './prisma/prisma.module';

@Module({
  imports: [UserModule, CategoryModule, RecordModule, PrismaModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
