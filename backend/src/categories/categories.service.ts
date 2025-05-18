import { Repository } from 'typeorm'
import { InjectRepository } from '@nestjs/typeorm'
import { Injectable, NotFoundException } from '@nestjs/common'

import { Category } from './entities/category.entity'
import { SubCategory } from './entities/sub_category.entity'
import { Bulk_updateDto } from '../common/dto/bulk_update.dto'

@Injectable()
export class CategoriesService {
  constructor(
    @InjectRepository(Category) private categoryRepository: Repository<Category>,
    @InjectRepository(SubCategory) private subCategoryRepository: Repository<SubCategory>
  ) {}

  async findAll(): Promise<Category[]> {
    return this.categoryRepository.find()
  }

  async bulkUpdate(dto: Bulk_updateDto): Promise<boolean> {
    // handle deletions
    if (dto.deletedCategories.length) {
      for (const category of dto.deletedCategories) {
        const existCategory = await this.categoryRepository.findOne({ where: { id: category.id } })
        if (existCategory) {
          await this.categoryRepository.remove(existCategory)
        }
      }
    }

    // handle updates
    for (const updatedCategory of dto.updatedCategories) {
      const category = await this.categoryRepository.findOne({ where: { id: updatedCategory.id } })
      if (!category) throw new NotFoundException()

      for (let i = 0; i < updatedCategory.subCategories.length; i++) {
        const subCategory = updatedCategory.subCategories[i]
        if (subCategory.id === undefined) {
          const newSubCategory = this.subCategoryRepository.create(subCategory)
          updatedCategory.subCategories[i] = await this.subCategoryRepository.save(newSubCategory)
        }
      }
      await this.categoryRepository.save(updatedCategory)
    }

    // handle new
    for (const newCategory of dto.newCategories) {
      const category = this.categoryRepository.create({
        name: newCategory.name,
        subCategories: newCategory.subCategories
      })
      await this.categoryRepository.save(category)
    }

    return true
  }
}
