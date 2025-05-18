import { IsNumber, IsString, IsOptional, IsArray, ValidateNested } from 'class-validator'
import { Type } from 'class-transformer'

export class UpdateSubCategoryDto {
  @IsOptional()
  @IsNumber()
  id?: number

  @IsString()
  name: string

  @IsArray()
  filmIds: number[]
}

export class UpdateCategoryDto {
  @IsNumber()
  id: number

  @IsString()
  name: string

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => UpdateSubCategoryDto)
  subCategories: UpdateSubCategoryDto[]
}
