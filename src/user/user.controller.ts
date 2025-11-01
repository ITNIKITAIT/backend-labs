import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.userService.createUser(createUserDto);
  }

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
export class UsersController {
  constructor(private readonly userService: UserService) {}

  @Get()
  @UseGuards(JwtAuthGuard)
  findAll() {
    return this.userService.getUsers();
  }
}
