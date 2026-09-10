import { useMemo, useState } from 'react'
import type { SortOption } from '../../types/project'
import { EmptyState } from '../../components/EmptyState/EmptyState'
import { FavoriteToggle } from '../../components/FavoriteToggle/FavoriteToggle'
import { NewProjectButton } from '../../components/NewProjectButton/NewProjectButton'
import { ProjectGrid } from '../../components/ProjectGrid/ProjectGrid'
import { SortSelect } from '../../components/SortSelect/SortSelect'
import { useProjects } from '../../hooks/useProjects'
import { sortProjects } from '../../services/projects'
import styles from './ProjectsPage.module.css'

export function ProjectsPage() {
  const projects = useProjects()
  const [onlyFavorites, setOnlyFavorites] = useState(false)
  const [sort, setSort] = useState<SortOption>('alpha')

  const visibleProjects = useMemo(() => {
    const filtered = onlyFavorites
      ? projects.filter((project) => project.favorite)
      : projects
    return sortProjects(filtered, sort)
  }, [projects, onlyFavorites, sort])

  if (projects.length === 0) {
    return (
      <div className={styles.emptyPage}>
        <EmptyState />
      </div>
    )
  }

  return (
    <div className={styles.page}>
      <div className={styles.toolbar}>
        <h1 className={styles.heading}>
          Projetos <span className={styles.count}>({projects.length})</span>
        </h1>
        <div className={styles.controls}>
          <FavoriteToggle checked={onlyFavorites} onChange={setOnlyFavorites} />
          <SortSelect value={sort} onChange={setSort} />
          <NewProjectButton />
        </div>
      </div>

      {visibleProjects.length === 0 ? (
        <p className={styles.emptyFilter}>Nenhum projeto favorito ainda.</p>
      ) : (
        <ProjectGrid projects={visibleProjects} />
      )}
    </div>
  )
}
