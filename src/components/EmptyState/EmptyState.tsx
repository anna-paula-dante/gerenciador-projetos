import { NewProjectButton } from '../NewProjectButton/NewProjectButton'
import styles from './EmptyState.module.css'

export function EmptyState() {
  return (
    <div className={styles.wrapper}>
      <h2 className={styles.title}>Nenhum projeto</h2>
      <p className={styles.text}>
        Clique no botão abaixo para criar o primeiro e gerenciá-lo.
      </p>
      <NewProjectButton />
    </div>
  )
}
