type Category = {
  id?: number
  name: string
  subCategories: SubCategory[]
}

type SubCategory = {
  id?: number
  name: string
  filmIds: number[]
}

type Film = {
  id?: number
  name: string
}

type Bulk = {
  newCategories: Category[]
  updatedCategories: Category[]
  deletedCategories: Category[]
}
