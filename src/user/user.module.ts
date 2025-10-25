import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController, UsersController } from './user.controller';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [UserController, UsersController],
  providers: [UserService],
  exports: [UserService],
})
export class UserModule {}
