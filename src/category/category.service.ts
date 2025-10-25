import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateCategoryDto } from './dto/create-category.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { Category } from '@prisma/client';

@Injectable()
export class CategoryService {
  constructor(private prisma: PrismaService) {}

  async createCategory(
    createCategoryDto: CreateCategoryDto,
  ): Promise<Category> {
    return await this.prisma.category.create({
      data: createCategoryDto,
    });
  }

  async getCategory(id: string): Promise<Category> {
    const category = await this.prisma.category.findUnique({
      where: { id },
    });

    if (!category) {
      throw new NotFoundException(`Category with id ${id} not found`);
    }
    return category;
  }

  async deleteCategory(id: string): Promise<{ message: string }> {
    await this.getCategory(id);

    await this.prisma.category.delete({
      where: { id },
    });
    return { message: `Category ${id} deleted successfully` };
  }
}
