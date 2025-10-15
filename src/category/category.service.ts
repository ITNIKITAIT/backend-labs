import {
  // ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateCategoryDto } from './dto/create-category.dto';
import { randomUUID } from 'node:crypto';
import { Category } from './entities/category.entity';

@Injectable()
export class CategoryService {
  private readonly categories: Category[] = [];

  public findCategoryById(id: string): Category | undefined {
    return this.categories.find((c) => c.id === id);
  }

  createCategory(createCategoryDto: CreateCategoryDto): Category {
    // const category = this.categories.find(
    //   (c) => c.name === createCategoryDto.name,
    // );
    // if (category) {
    //   throw new ConflictException(
    //     `Category with name ${createCategoryDto.name} already exists`,
    //   );
    // }
    const createdCategory = {
      id: randomUUID(),
      ...createCategoryDto,
    };
    this.categories.push(createdCategory);
    return createdCategory;
  }

  getCategory(id: string): Category {
    const category = this.findCategoryById(id);
    if (!category) {
      throw new NotFoundException(`Category with id ${id} not found`);
    }
    return category;
  }

  deleteCategory(id: string): { message: string } {
    const category = this.findCategoryById(id);
    if (!category) {
      throw new NotFoundException(`Category with id ${id} not found`);
    }
    this.categories.splice(this.categories.indexOf(category), 1);
    return { message: `Category with id ${id} deleted` };
  }
}
