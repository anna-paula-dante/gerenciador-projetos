import { Link } from 'react-router-dom'
import { PlusCircle } from 'lucide-react'
import styles from './NewProjectButton.module.css'

export function NewProjectButton() {
  return (
    <Link to="/projects/new" className={styles.button}>
      <PlusCircle size={14} />
      Novo projeto
    </Link>
  )
}
