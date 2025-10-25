import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { User } from '@prisma/client';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  async createUser(createUserDto: CreateUserDto): Promise<User> {
    return await this.prisma.user.create({
      data: createUserDto,
    });
  }

  async getUser(id: string): Promise<User> {
    const user = await this.prisma.user.findUnique({ where: { id } });

    if (!user) {
      throw new NotFoundException(`User with id ${id} not found`);
    }
    return user;
  }

  async getUsers(): Promise<User[]> {
    return await this.prisma.user.findMany();
  }

  async deleteUser(id: string): Promise<{ message: string }> {
    const user = await this.getUser(id);

    await this.prisma.user.delete({
      where: { id: user.id },
    });
    return { message: `User with id ${id} deleted` };
  }
}
