import { Test, TestingModule } from '@nestjs/testing'
import { CategoriesService } from './categories.service'
import { getRepositoryToken } from '@nestjs/typeorm'
import { Category } from './entities/category.entity'
import { SubCategory } from './entities/sub_category.entity'
import { Repository } from 'typeorm'
import { NotFoundException } from '@nestjs/common'
import { Bulk_updateDto } from '../common/dto/bulk_update.dto'

type MockRepository<T = any> = Partial<Record<keyof Repository<T>, jest.Mock>>

const createMockRepository = <T = any>(): MockRepository<T> => ({
  find: jest.fn(),
  findOne: jest.fn(),
  remove: jest.fn(),
  save: jest.fn(),
  create: jest.fn()
})

describe('CategoriesService', () => {
  let service: CategoriesService
  let categoryRepository: MockRepository
  let subCategoryRepository: MockRepository

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CategoriesService,
        {
          provide: getRepositoryToken(Category),
          useValue: createMockRepository()
        },
        {
          provide: getRepositoryToken(SubCategory),
          useValue: createMockRepository()
        }
      ]
    }).compile()

    service = module.get<CategoriesService>(CategoriesService)
    categoryRepository = module.get(getRepositoryToken(Category))
    subCategoryRepository = module.get(getRepositoryToken(SubCategory))
  })

  describe('bulkUpdate', () => {
    it('should delete existing categories', async () => {
      const dto: Bulk_updateDto = {
        deletedCategories: [{ id: 1 }],
        updatedCategories: [],
        newCategories: []
      }

      categoryRepository.findOne.mockResolvedValue({ id: 1 })
      categoryRepository.remove.mockResolvedValue({})

      const result = await service.bulkUpdate(dto)

      expect(categoryRepository.findOne).toHaveBeenCalledWith({ where: { id: 1 } })
      expect(categoryRepository.remove).toHaveBeenCalledWith({ id: 1 })
      expect(result).toBe(true)
    })

    it('should skip deletion if category not found', async () => {
      const dto: Bulk_updateDto = {
        deletedCategories: [{ id: 2 }],
        updatedCategories: [],
        newCategories: []
      }

      categoryRepository.findOne.mockResolvedValue(null)

      const result = await service.bulkUpdate(dto)

      expect(categoryRepository.findOne).toHaveBeenCalledWith({ where: { id: 2 } })
      expect(categoryRepository.remove).not.toHaveBeenCalled()
      expect(result).toBe(true)
    })

    it('should throw NotFoundException if updated category not found', async () => {
      const dto: Bulk_updateDto = {
        deletedCategories: [],
        updatedCategories: [{ id: 3, name: 'Updated', subCategories: [] }],
        newCategories: []
      }

      categoryRepository.findOne.mockResolvedValue(null)

      await expect(service.bulkUpdate(dto)).rejects.toThrow(NotFoundException)
    })

    it('should update existing categories and add new subcategories', async () => {
      const dto: Bulk_updateDto = {
        deletedCategories: [],
        updatedCategories: [
          {
            id: 4,
            name: 'Updated',
            subCategories: [{ name: 'New SubCategory', filmIds: [] }]
          }
        ],
        newCategories: []
      }

      categoryRepository.findOne.mockResolvedValue({ id: 4, name: 'Old', subCategories: [] })
      subCategoryRepository.create.mockReturnValue({ name: 'New SubCategory' })
      subCategoryRepository.save.mockResolvedValue({ id: 10, name: 'New SubCategory' })
      categoryRepository.save.mockResolvedValue({})

      const result = await service.bulkUpdate(dto)

      expect(subCategoryRepository.create).toHaveBeenCalledWith({ name: 'New SubCategory', filmIds: [] })
      expect(subCategoryRepository.save).toHaveBeenCalled()
      expect(categoryRepository.save).toHaveBeenCalled()
      expect(result).toBe(true)
    })

    it('should create new categories', async () => {
      const dto: Bulk_updateDto = {
        deletedCategories: [],
        updatedCategories: [],
        newCategories: [{ name: 'New Category', subCategories: [] }]
      }

      categoryRepository.create.mockReturnValue({ name: 'New Category', subCategories: [] })
      categoryRepository.save.mockResolvedValue({})

      const result = await service.bulkUpdate(dto)

      expect(categoryRepository.create).toHaveBeenCalledWith({
        name: 'New Category',
        subCategories: []
      })
      expect(categoryRepository.save).toHaveBeenCalled()
      expect(result).toBe(true)
    })
  })
})
