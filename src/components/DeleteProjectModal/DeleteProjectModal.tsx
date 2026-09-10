import { useEffect, useRef } from 'react'
import { createPortal } from 'react-dom'
import { Trash2 } from 'lucide-react'
import styles from './DeleteProjectModal.module.css'

interface DeleteProjectModalProps {
  projectName: string
  onCancel: () => void
  onConfirm: () => void
}

export function DeleteProjectModal({
  projectName,
  onCancel,
  onConfirm,
}: DeleteProjectModalProps) {
  const confirmRef = useRef<HTMLButtonElement>(null)

  useEffect(() => {
    confirmRef.current?.focus()
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onCancel()
    }
    document.addEventListener('keydown', onKeyDown)
    return () => document.removeEventListener('keydown', onKeyDown)
  }, [onCancel])

  return createPortal(
    <div className={styles.overlay} onMouseDown={onCancel}>
      <div
        className={styles.modal}
        role="dialog"
        aria-modal="true"
        aria-labelledby="delete-modal-title"
        onMouseDown={(event) => event.stopPropagation()}
      >
        <div className={styles.iconBadge}>
          <Trash2 size={16} />
        </div>
        <h2 id="delete-modal-title" className={styles.title}>
          Remover projeto
        </h2>
        <hr className={styles.divider} />
        <p className={styles.text}>Essa ação removerá definitivamente o projeto:</p>
        <p className={styles.name}>{projectName}</p>
        <div className={styles.actions}>
          <button type="button" className={styles.cancel} onClick={onCancel}>
            Cancelar
          </button>
          <button
            type="button"
            ref={confirmRef}
            className={styles.confirm}
            onClick={onConfirm}
          >
            Confirmar
          </button>
        </div>
      </div>
    </div>,
    document.body,
  )
}
