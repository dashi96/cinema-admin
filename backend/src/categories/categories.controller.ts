import { Controller, Get, Post, Body } from '@nestjs/common'

import { CategoriesService } from './categories.service'
import { Bulk_updateDto } from '../common/dto/bulk_update.dto'
import { Category } from './entities/category.entity'

@Controller('categories')
export class CategoriesController {
  constructor(private categoriesService: CategoriesService) {}

  @Get()
  async findAll(): Promise<Category[]> {
    return this.categoriesService.findAll()
  }

  @Post('bulk')
  async bulkUpdate(@Body() dto: Bulk_updateDto): Promise<boolean> {
    return this.categoriesService.bulkUpdate(dto)
  }
}
