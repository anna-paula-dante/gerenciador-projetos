import { Navigate, Route, Routes } from 'react-router-dom'
import { Layout } from '../components/Layout/Layout'
import { ProjectsPage } from '../pages/Projects/ProjectsPage'
import { NewProjectPage } from '../pages/NewProject/NewProjectPage'
import { EditProjectPage } from '../pages/EditProject/EditProjectPage'
import { SearchResultsPage } from '../pages/SearchResults/SearchResultsPage'

export function AppRoutes() {
  return (
    <Routes>
      {/* Telas com o header escuro */}
      <Route element={<Layout />}>
        <Route path="/" element={<ProjectsPage />} />
        <Route path="/projects/new" element={<NewProjectPage />} />
        <Route path="/projects/:id/edit" element={<EditProjectPage />} />
      </Route>

      {/* Resultado da busca não usa o header (conforme Figma) */}
      <Route path="/search" element={<SearchResultsPage />} />

      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  )
}
