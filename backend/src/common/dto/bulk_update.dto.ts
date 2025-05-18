import { IsArray, ValidateNested } from 'class-validator'
import { Type } from 'class-transformer'

import { CreateCategoryDto } from '../../categories/dto/create_category.dto'
import { UpdateCategoryDto } from '../../categories/dto/update_category.dto'

export class Bulk_updateDto {
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CreateCategoryDto)
  newCategories: CreateCategoryDto[]

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => UpdateCategoryDto)
  updatedCategories: UpdateCategoryDto[]

  @IsArray()
  deletedCategories: { id: number }[]
}
