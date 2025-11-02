import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { CategoryService } from './category.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

@Controller('category')
@UseGuards(JwtAuthGuard)
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @Post()
  create(@Body() createCategoryDto: CreateCategoryDto) {
    return this.categoryService.createCategory(createCategoryDto);
  }

  @Get(':category_id')
  findOne(@Param('category_id') category_id: string) {
    return this.categoryService.getCategory(category_id);
  }

  @Delete(':category_id')
  remove(@Param('category_id') category_id: string) {
    return this.categoryService.deleteCategory(category_id);
  }
}
