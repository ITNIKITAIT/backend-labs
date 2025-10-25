import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController, UsersController } from './user.controller';
import { PrismaModule } from 'src/prisma/prisma.module';
import { CurrencyModule } from 'src/currency/currency.module';

@Module({
  imports: [PrismaModule, CurrencyModule],
  controllers: [UserController, UsersController],
  providers: [UserService],
  exports: [UserService],
})
export class UserModule {}
