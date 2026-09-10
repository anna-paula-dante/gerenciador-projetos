import styles from './FavoriteToggle.module.css'

interface FavoriteToggleProps {
  checked: boolean
  onChange: (checked: boolean) => void
}

export function FavoriteToggle({ checked, onChange }: FavoriteToggleProps) {
  return (
    <span className={styles.wrapper}>
      <button
        type="button"
        role="switch"
        aria-checked={checked}
        aria-label="Apenas favoritos"
        className={`${styles.track} ${checked ? styles.on : ''}`}
        onClick={() => onChange(!checked)}
      >
        <span className={styles.thumb} />
      </button>
      <span className={styles.label}>Apenas Favoritos</span>
    </span>
  )
}
