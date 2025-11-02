import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { User } from '@prisma/client';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  async getUser(id: string): Promise<Omit<User, 'password'>> {
    const user = await this.prisma.user.findUnique({
      where: { id },
      omit: { password: true },
    });

    if (!user) {
      throw new NotFoundException(`User with id ${id} not found`);
    }
    return user;
  }

  async getUsers(): Promise<Omit<User, 'password'>[]> {
    return await this.prisma.user.findMany({ omit: { password: true } });
  }

  async deleteUser(id: string): Promise<{ message: string }> {
    const user = await this.getUser(id);

    await this.prisma.user.delete({
      where: { id: user.id },
    });
    return { message: `User with id ${id} deleted` };
  }
}
