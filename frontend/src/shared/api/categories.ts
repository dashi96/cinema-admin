import { env } from '../../env.ts'

const API_URL = env.REACT_APP_API_URL
if (!API_URL) throw new Error('REACT_APP_API_URL is not defined')

export const fetchFilms = async (): Promise<Film[]> => {
  const res = await fetch(`${API_URL}/films`)
  return res.json()
}

export const fetchCategories = async (): Promise<Category[]> => {
  const res = await fetch(`${API_URL}/categories`)
  return res.json()
}

export const saveCategoriesBulk = async (payload: Bulk) => {
  const res = await fetch(`${API_URL}/categories/bulk`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload)
  })

  if (!res.ok) {
    const errorBody = await res.json().catch(() => null)
    const message = errorBody?.message || `HTTP error! status: ${res.status}`
    throw new Error(message)
  }

  return res.json()
}
