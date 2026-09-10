import { useMemo } from 'react'
import { useSearchParams } from 'react-router-dom'
import { BackLink } from '../../components/BackLink/BackLink'
import { ProjectGrid } from '../../components/ProjectGrid/ProjectGrid'
import { ResultsSearchBar } from '../../components/SearchBar/ResultsSearchBar'
import { useProjects } from '../../hooks/useProjects'
import { isSearchable, matchesQuery } from '../../utils/text'
import styles from './SearchResultsPage.module.css'

export function SearchResultsPage() {
  const [params] = useSearchParams()
  const query = params.get('q') ?? ''
  const projects = useProjects()

  const results = useMemo(() => {
    if (!isSearchable(query)) return []
    return projects.filter((project) => matchesQuery(project.name, query))
  }, [projects, query])

  return (
    <div className={styles.page}>
      <ResultsSearchBar initialValue={query} />
      <div className={styles.content}>
        <BackLink />
        <h1 className={styles.title}>Resultado da busca</h1>

        {!isSearchable(query) ? (
          <p className={styles.empty}>
            Digite ao menos 3 caracteres para buscar um projeto.
          </p>
        ) : results.length === 0 ? (
          <p className={styles.empty}>
            Nenhum projeto encontrado para &ldquo;{query}&rdquo;.
          </p>
        ) : (
          <ProjectGrid projects={results} highlightQuery={query} />
        )}
      </div>
    </div>
  )
}
