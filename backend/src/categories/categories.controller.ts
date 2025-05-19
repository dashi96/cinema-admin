import { Controller, Get, Post, Body } from '@nestjs/common'

import { Category } from './entities/category.entity'
import { CategoriesService } from './categories.service'
import { BulkUpdateDto } from '../common/dto/bulk_update_dto'

@Controller('categories')
export class CategoriesController {
  constructor(private categoriesService: CategoriesService) {}

  @Get()
  async findAll(): Promise<Category[]> {
    return this.categoriesService.findAll()
  }

  @Post('bulk')
  async bulkUpdate(@Body() dto: BulkUpdateDto): Promise<boolean> {
    return this.categoriesService.bulkUpdate(dto)
  }
}
