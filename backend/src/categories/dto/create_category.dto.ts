import { IsString, IsArray, ValidateNested } from 'class-validator'
import { Type } from 'class-transformer'

export class CreateSubCategoryDto {
  @IsString()
  name: string

  @IsArray()
  filmIds: number[]
}

export class CreateCategoryDto {
  @IsString()
  name: string

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CreateSubCategoryDto)
  subCategories: CreateSubCategoryDto[]
}
