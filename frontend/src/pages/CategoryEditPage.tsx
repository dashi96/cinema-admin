import { useState, useEffect, type FC } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { Box, Stack, TextField, Button } from '@mui/material'

import FilmSelector from '../components/FilmSelector'
import { useCategories } from '../context/CategoriesContext'

const CategoryEditPage: FC = () => {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const { films, categories, setCategories, setChanges } = useCategories()

  const isNew = id === undefined
  const [name, setName] = useState('')
  const [subs, setSubs] = useState<SubCategory[]>([])

  useEffect(() => {
    if (!isNew) {
      const category = categories.find((cat) => cat.id === Number(id))
      if (category) {
        setName(category.name)
        setSubs(category.subCategories)
      }
    }
  }, [id, categories, isNew])

  const handleSave = () => {
    const updated: Category = { id: isNew ? undefined : Number(id), name, subCategories: subs }

    if (isNew) {
      setChanges((prev) => ({
        ...prev,
        newCategories: [...prev.newCategories, updated]
      }))
      setCategories((prev) => [...prev, { ...updated, id: Date.now() }])
    } else {
      setChanges((prev) => ({
        ...prev,
        updatedCategories: [...prev.updatedCategories, updated]
      }))
      setCategories((prev) => prev.map((c) => (c.id === updated.id ? updated : c)))
    }

    navigate('/')
  }

  const addSubCategory = () => {
    setSubs((prev) => [...prev, { name: '', filmIds: [] }])
  }

  const updateSub = (index: number, subCat: SubCategory) => {
    setSubs((prev) => {
      const list = [...prev]
      list[index] = subCat
      return list
    })
  }

  const removeSub = (index: number) => {
    setSubs((prev) => prev.filter((_, i) => i !== index))
  }

  const removeCat = () => {
    const deletionCat = categories.find((cat) => cat.id === Number(id))
    if (!deletionCat) return

    setChanges((prev) => ({
      ...prev,
      deletedCategories: [deletionCat]
    }))
    setCategories((prev) => prev.filter((cat) => cat.id !== Number(id)))

    navigate('/')
  }

  return (
    <Box p={2}>
      <TextField label='Название категории' value={name} onChange={(e) => setName(e.target.value)} fullWidth />

      {subs.map((subCat, idx) => (
        <Box key={idx} mt={3} p={2} border='1px solid #ccc' borderRadius={1}>
          <TextField
            fullWidth
            label='Подкатегория'
            value={subCat.name}
            onChange={(e) => updateSub(idx, { ...subCat, name: e.target.value })}
          />

          <FilmSelector
            films={films}
            selectedIds={subCat.filmIds}
            onChange={(ids) => updateSub(idx, { ...subCat, filmIds: ids })}
          />

          <Button color='error' onClick={() => removeSub(idx)}>
            Удалить подкатегорию
          </Button>
        </Box>
      ))}

      <Button onClick={addSubCategory} sx={{ mt: 2 }}>
        Добавить подкатегорию
      </Button>

      <Stack mt={4} direction='row' gap={1}>
        <Button variant='contained' onClick={handleSave}>
          Сохранить
        </Button>
        <Button color='error' onClick={removeCat}>
          Удалить
        </Button>
      </Stack>
    </Box>
  )
}

export default CategoryEditPage
