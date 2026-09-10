import { useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import { Pencil, Trash2 } from 'lucide-react'
import styles from './ProjectMenu.module.css'

interface ProjectMenuProps {
  projectId: string
  onClose: () => void
  onRequestDelete: () => void
}

export function ProjectMenu({ projectId, onClose, onRequestDelete }: ProjectMenuProps) {
  const menuRef = useRef<HTMLDivElement>(null)
  const navigate = useNavigate()

  useEffect(() => {
    const handlePointerDown = (event: MouseEvent) => {
      const target = event.target as HTMLElement
      if (menuRef.current?.contains(target)) return
      if (target.closest('[data-menu-trigger]')) return
      onClose()
    }
    document.addEventListener('mousedown', handlePointerDown)
    return () => document.removeEventListener('mousedown', handlePointerDown)
  }, [onClose])

  return (
    <div ref={menuRef} className={styles.menu} role="menu">
      <button
        type="button"
        role="menuitem"
        className={styles.item}
        onClick={() => {
          onClose()
          navigate(`/projects/${projectId}/edit`)
        }}
      >
        <Pencil size={14} />
        Editar
      </button>
      <button
        type="button"
        role="menuitem"
        className={styles.item}
        onClick={onRequestDelete}
      >
        <Trash2 size={14} />
        Remover
      </button>
    </div>
  )
}
