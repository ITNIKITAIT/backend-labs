import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './entities/user.entity';
import { randomUUID } from 'node:crypto';

@Injectable()
export class UserService {
  private readonly users: User[] = [];

  public findUserById(id: string): User | undefined {
    return this.users.find((user) => user.id === id);
  }

  createUser(createUserDto: CreateUserDto): User {
    const user = this.users.find((user) => user.name === createUserDto.name);
    if (user) {
      throw new ConflictException(
        `User with name ${createUserDto.name} already exists`,
      );
    }
    const createdUser = {
      id: randomUUID(),
      ...createUserDto,
    };
    this.users.push(createdUser);
    return createdUser;
  }

  getUser(id: string): User {
    const user = this.findUserById(id);
    if (!user) {
      throw new NotFoundException(`User with id ${id} not found`);
    }
    return user;
  }

  getUsers(): User[] {
    return this.users;
  }

  deleteUser(id: string): { message: string } {
    const user = this.findUserById(id);
    if (!user) {
      throw new NotFoundException(`User with id ${id} not found`);
    }
    this.users.splice(this.users.indexOf(user), 1);
    return { message: `User with id ${id} deleted` };
  }
}
