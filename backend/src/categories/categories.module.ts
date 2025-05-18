import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'

import { Category } from './entities/category.entity'
import { SubCategory } from './entities/sub_category.entity'
import { CategoriesService } from './categories.service'
import { CategoriesController } from './categories.controller'

@Module({
  imports: [TypeOrmModule.forFeature([Category, SubCategory])],
  providers: [CategoriesService],
  controllers: [CategoriesController]
})
export class CategoriesModule {}
