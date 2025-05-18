import {
  createContext,
  useContext,
  useState,
  useEffect,
  type ReactNode,
  type Dispatch,
  type SetStateAction
} from 'react'

import { fetchCategories, fetchFilms } from '../shared/api/categories.ts'

type ContextType = {
  films: Film[]
  categories: Category[]
  changes: Bulk
  setCategories: Dispatch<SetStateAction<Category[]>>
  setChanges: Dispatch<SetStateAction<Bulk>>
}

const defaultBulk: Bulk = {
  newCategories: [],
  updatedCategories: [],
  deletedCategories: []
}

const CategoriesContext = createContext<ContextType | undefined>(undefined)

export const CategoriesProvider = ({ children }: { children: ReactNode }) => {
  const [films, setFilms] = useState<Film[]>([])
  const [categories, setCategories] = useState<Category[]>([])
  const [changes, setChanges] = useState<Bulk>(defaultBulk)

  useEffect(() => {
    fetchFilms().then(setFilms)
    fetchCategories().then(setCategories)
  }, [])

  return (
    <CategoriesContext.Provider value={{ films, categories, changes, setCategories, setChanges }}>
      {children}
    </CategoriesContext.Provider>
  )
}

export const useCategories = (): ContextType => {
  const ctx = useContext(CategoriesContext)
  if (!ctx) throw new Error('useCategories must be used within CategoriesProvider')

  return ctx
}
