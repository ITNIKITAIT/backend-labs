import { Controller, Get, Param, Delete, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

@Controller('user')
@UseGuards(JwtAuthGuard)
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get(':user_id')
  findOne(@Param('user_id') user_id: string) {
    return this.userService.getUser(user_id);
  }

  @Delete(':user_id')
  remove(@Param('user_id') user_id: string) {
    return this.userService.deleteUser(user_id);
  }
}

@Controller('users')
@UseGuards(JwtAuthGuard)
export class UsersController {
  constructor(private readonly userService: UserService) {}

  @Get()
  findAll() {
    return this.userService.getUsers();
  }
}
