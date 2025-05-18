import type { FC } from 'react'
import { Checkbox, FormControlLabel, Box } from '@mui/material'

interface FilmSelectorProps {
  films: Film[]
  selectedIds: number[]
  onChange: (selectedIds: number[]) => void
}

const FilmSelector: FC<FilmSelectorProps> = ({ films, selectedIds, onChange }) => {
  return (
    <Box>
      {films.map((film) => (
        <FormControlLabel
          key={film.id}
          control={
            <Checkbox
              checked={film.id ? selectedIds.includes(film.id) : false}
              onChange={() => {
                if (!film.id) return
                const newIds = selectedIds.includes(film.id)
                  ? selectedIds.filter((id) => id !== film.id)
                  : [...selectedIds, film.id]
                onChange(newIds)
              }}
            />
          }
          label={film.name}
        />
      ))}
    </Box>
  )
}

export default FilmSelector
