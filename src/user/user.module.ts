import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController, UsersController } from './user.controller';

@Module({
  controllers: [UserController, UsersController],
  providers: [UserService],
  exports: [UserService],
})
export class UserModule {}
