import { useEffect, useState } from 'react'
import type { FormEvent } from 'react'
import { useNavigate } from 'react-router-dom'
import { Search } from 'lucide-react'
import { SearchHistory } from '../SearchHistory/SearchHistory'
import { addSearchTerm } from '../../services/searchHistory'
import { isSearchable } from '../../utils/text'
import styles from './SearchOverlay.module.css'

interface SearchOverlayProps {
  onClose: () => void
}

export function SearchOverlay({ onClose }: SearchOverlayProps) {
  const [term, setTerm] = useState('')
  const navigate = useNavigate()

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onClose()
    }
    document.addEventListener('keydown', onKeyDown)
    return () => document.removeEventListener('keydown', onKeyDown)
  }, [onClose])

  const runSearch = (value: string) => {
    const query = value.trim()
    if (!isSearchable(query)) return
    addSearchTerm(query)
    navigate(`/search?q=${encodeURIComponent(query)}`)
    onClose()
  }

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault()
    runSearch(term)
  }

  return (
    <div className={styles.backdrop} onMouseDown={onClose}>
      <div
        className={styles.panel}
        role="dialog"
        aria-label="Buscar projetos"
        onMouseDown={(event) => event.stopPropagation()}
      >
        <form className={styles.field} onSubmit={handleSubmit}>
          <Search size={16} className={styles.icon} />
          <input
            autoFocus
            className={styles.input}
            type="text"
            placeholder="Digite o nome do projeto..."
            value={term}
            onChange={(event) => setTerm(event.target.value)}
            aria-label="Buscar projetos"
          />
        </form>
        <SearchHistory onSelect={runSearch} />
      </div>
    </div>
  )
}
