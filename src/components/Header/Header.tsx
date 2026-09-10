import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Search } from 'lucide-react'
import { Logo } from './Logo'
import { SearchOverlay } from '../SearchOverlay/SearchOverlay'
import styles from './Header.module.css'

export function Header() {
  const [searchOpen, setSearchOpen] = useState(false)

  return (
    <>
      <header className={styles.header}>
        <Link to="/" className={styles.logo} aria-label="Gerenciador de Projetos, ir para o início">
          <Logo />
          <span className={styles.logoText}>
            Gerenciador
            <br />
            de Projetos
          </span>
        </Link>
        <button
          type="button"
          className={styles.searchButton}
          aria-label="Abrir busca"
          onClick={() => setSearchOpen(true)}
        >
          <Search size={16} />
        </button>
      </header>
      {searchOpen && <SearchOverlay onClose={() => setSearchOpen(false)} />}
    </>
  )
}
