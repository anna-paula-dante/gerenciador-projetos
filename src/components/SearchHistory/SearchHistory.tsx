import { History, X } from 'lucide-react'
import { useSearchHistory } from '../../hooks/useSearchHistory'
import { removeSearchTerm } from '../../services/searchHistory'
import styles from './SearchHistory.module.css'

interface SearchHistoryProps {
  onSelect: (term: string) => void
}

export function SearchHistory({ onSelect }: SearchHistoryProps) {
  const history = useSearchHistory()

  if (history.length === 0) return null

  return (
    <ul className={styles.list}>
      {history.map((term) => (
        <li key={term} className={styles.item}>
          <button type="button" className={styles.term} onClick={() => onSelect(term)}>
            <History size={14} className={styles.icon} />
            <span>{term}</span>
          </button>
          <button
            type="button"
            className={styles.remove}
            aria-label={`Remover "${term}" do histórico`}
            onClick={() => removeSearchTerm(term)}
          >
            <X size={14} />
          </button>
        </li>
      ))}
    </ul>
  )
}
