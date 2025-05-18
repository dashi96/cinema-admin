import { Routes, Route } from 'react-router-dom'

import CategoryListPage from './pages/CategoryListPage'
import CategoryEditPage from './pages/CategoryEditPage'
import { CategoriesProvider } from './context/CategoriesContext'

const App = () => (
  <CategoriesProvider>
    <Routes>
      <Route path='/' element={<CategoryListPage />} />
      <Route path='/category/:id?' element={<CategoryEditPage />} />
    </Routes>
  </CategoriesProvider>
)

export default App
