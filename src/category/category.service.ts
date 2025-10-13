import { Injectable } from '@nestjs/common';
import { CreateCategoryDto } from './dto/create-category.dto';
import { randomUUID } from 'node:crypto';
import { Category } from './entities/category.entity';

@Injectable()
export class CategoryService {
  private readonly categories: Category[] = [];

  private findCategoryById(id: string): Category | undefined {
    return this.categories.find((c) => c.id === id);
  }

  create(createCategoryDto: CreateCategoryDto) {
    const category = this.categories.find(
      (c) => c.name === createCategoryDto.name,
    );
    if (category) {
      return Error(
        `Category with name ${createCategoryDto.name} already exists`,
      );
    }
    const createdCategory = {
      id: randomUUID(),
      ...createCategoryDto,
    };
    this.categories.push(createdCategory);
    return createdCategory;
  }

  findOne(id: string) {
    const category = this.findCategoryById(id);
    if (!category) {
      return new Error(`Category with id ${id} not found`);
    }
    return category;
  }

  findAll() {
    return this.categories;
  }

  remove(id: string) {
    const category = this.findCategoryById(id);
    if (!category) {
      return new Error(`Category with id ${id} not found`);
    }
    this.categories.splice(this.categories.indexOf(category), 1);
    return `Category with id ${id} deleted`;
  }
}
