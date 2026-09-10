import { Calendar, CalendarCheck, MoreHorizontal, Star } from 'lucide-react'
import type { Project } from '../../types/project'
import { toggleFavorite } from '../../services/projects'
import { formatDateBR } from '../../utils/date'
import { HighlightText } from '../HighlightText/HighlightText'
import { ProjectMenu } from '../ProjectMenu/ProjectMenu'
import { CoverPlaceholder } from './CoverPlaceholder'
import styles from './ProjectCard.module.css'

interface ProjectCardProps {
  project: Project
  highlightQuery?: string
  menuOpen: boolean
  onToggleMenu: () => void
  onCloseMenu: () => void
  onRequestDelete: () => void
}

export function ProjectCard({
  project,
  highlightQuery,
  menuOpen,
  onToggleMenu,
  onCloseMenu,
  onRequestDelete,
}: ProjectCardProps) {
  return (
    <article className={styles.card}>
      <div className={styles.cover}>
        {project.cover ? (
          <img
            src={project.cover}
            alt={`Capa do projeto ${project.name}`}
            className={styles.coverImage}
          />
        ) : (
          <div className={styles.placeholder}>
            <CoverPlaceholder />
          </div>
        )}

        <div className={styles.actions}>
          <button
            type="button"
            className={styles.starButton}
            aria-label={project.favorite ? 'Desfavoritar projeto' : 'Favoritar projeto'}
            aria-pressed={project.favorite}
            onClick={() => toggleFavorite(project.id)}
          >
            <Star
              size={16}
              className={project.favorite ? styles.starActive : styles.star}
              fill={project.favorite ? 'currentColor' : 'none'}
            />
          </button>

          <div className={styles.menuAnchor}>
            <button
              type="button"
              data-menu-trigger
              className={styles.menuButton}
              aria-label="Abrir menu do projeto"
              aria-haspopup="menu"
              aria-expanded={menuOpen}
              onClick={onToggleMenu}
            >
              <MoreHorizontal size={15} />
            </button>
            {menuOpen && (
              <ProjectMenu
                projectId={project.id}
                onClose={onCloseMenu}
                onRequestDelete={onRequestDelete}
              />
            )}
          </div>
        </div>
      </div>

      <div className={styles.body}>
        <h3 className={styles.name}>
          <HighlightText text={project.name} query={highlightQuery} />
        </h3>
        <p className={styles.client}>
          <span>Cliente:</span> {project.client}
        </p>
        <div className={styles.dates}>
          <span className={styles.date}>
            <Calendar size={13} />
            {formatDateBR(project.startDate)}
          </span>
          <span className={styles.date}>
            <CalendarCheck size={13} />
            {formatDateBR(project.endDate)}
          </span>
        </div>
      </div>
    </article>
  )
}
