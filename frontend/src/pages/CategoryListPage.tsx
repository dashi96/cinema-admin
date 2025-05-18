import { type FC, type SyntheticEvent, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Button, Typography, Box, Snackbar, Alert, type SnackbarCloseReason } from '@mui/material'

import { useCategories } from '../context/CategoriesContext'
import { saveCategoriesBulk } from '../shared/api/categories.ts'

const CategoryListPage: FC = () => {
  const { films, categories, changes, setChanges } = useCategories()
  const navigate = useNavigate()

  const [openSnack, setOpenSnack] = useState(false)
  const [loading, setLoading] = useState(false)

  const handleOpenSnack = () => {
    setOpenSnack(true)
  }
  const handleCloseSnack = (_event?: SyntheticEvent | Event, reason?: SnackbarCloseReason) => {
    if (reason === 'clickaway') {
      return
    }
    setOpenSnack(false)
  }

  const handleSaveCategories = async () => {
    if (loading) return

    setLoading(true)
    try {
      await saveCategoriesBulk(changes)
      handleOpenSnack()
      setChanges({
        newCategories: [],
        updatedCategories: [],
        deletedCategories: []
      })
    } catch (e) {
      console.error('Ошибка сохранения категорий: ', e)
    } finally {
      setLoading(false)
    }
  }

  return (
    <Box p={2}>
      <Button onClick={() => navigate('/category')}>Добавить категорию</Button>
      <Button disabled={loading} onClick={handleSaveCategories} sx={{ ml: 2 }}>
        Сохранить на сервер
      </Button>

      {categories.map((cat) => (
        <Box key={cat.id} mt={4}>
          <Box display='flex' alignItems='center'>
            <Typography variant='h6'>{cat.name}</Typography>
            <Button size='small' onClick={() => navigate(`/category/${cat.id}`)} sx={{ ml: 2 }}>
              Редактировать
            </Button>
          </Box>

          {cat.subCategories.map((subCat) => (
            <Box key={subCat.id} ml={4} mt={2}>
              <Typography variant='subtitle1'>{subCat.name}</Typography>
              {subCat.filmIds.map((filmId) => {
                const film = films.find((f) => f.id === Number(filmId))
                return (
                  <Typography key={filmId} ml={4}>
                    - {film?.name}
                  </Typography>
                )
              })}
            </Box>
          ))}
        </Box>
      ))}

      <Snackbar open={openSnack} autoHideDuration={3000} onClose={handleCloseSnack}>
        <Alert onClose={handleCloseSnack} severity='success' variant='filled' sx={{ width: '100%' }}>
          Данные успешно сохранены!
        </Alert>
      </Snackbar>
    </Box>
  )
}

export default CategoryListPage
