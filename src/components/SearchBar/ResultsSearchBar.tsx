import { useEffect, useState } from 'react'
import type { FormEvent } from 'react'
import { useNavigate } from 'react-router-dom'
import { Search } from 'lucide-react'
import { addSearchTerm } from '../../services/searchHistory'
import { isSearchable } from '../../utils/text'
import styles from './ResultsSearchBar.module.css'

interface ResultsSearchBarProps {
  initialValue: string
}

export function ResultsSearchBar({ initialValue }: ResultsSearchBarProps) {
  const [term, setTerm] = useState(initialValue)
  const navigate = useNavigate()

  useEffect(() => {
    setTerm(initialValue)
  }, [initialValue])

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const query = term.trim()
    if (!isSearchable(query)) return
    addSearchTerm(query)
    navigate(`/search?q=${encodeURIComponent(query)}`)
  }

  return (
    <form className={styles.bar} onSubmit={handleSubmit}>
      <Search size={16} className={styles.icon} />
      <input
        className={styles.input}
        type="text"
        placeholder="Digite o nome do projeto..."
        value={term}
        onChange={(event) => setTerm(event.target.value)}
        aria-label="Buscar projetos"
      />
    </form>
  )
}
