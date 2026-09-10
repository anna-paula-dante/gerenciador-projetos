import { useEffect, useState } from 'react'
import type { Project } from '../../types/project'
import { deleteProject } from '../../services/projects'
import { ProjectCard } from '../ProjectCard/ProjectCard'
import { DeleteProjectModal } from '../DeleteProjectModal/DeleteProjectModal'
import styles from './ProjectGrid.module.css'

interface ProjectGridProps {
  projects: Project[]
  highlightQuery?: string
}

export function ProjectGrid({ projects, highlightQuery }: ProjectGridProps) {
  const [openMenuId, setOpenMenuId] = useState<string | null>(null)
  const [projectToDelete, setProjectToDelete] = useState<Project | null>(null)

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setOpenMenuId(null)
    }
    document.addEventListener('keydown', onKeyDown)
    return () => document.removeEventListener('keydown', onKeyDown)
  }, [])

  const handleConfirmDelete = () => {
    if (projectToDelete) deleteProject(projectToDelete.id)
    setProjectToDelete(null)
  }

  return (
    <>
      <div className={styles.grid}>
        {projects.map((project) => (
          <ProjectCard
            key={project.id}
            project={project}
            highlightQuery={highlightQuery}
            menuOpen={openMenuId === project.id}
            onToggleMenu={() =>
              setOpenMenuId((current) => (current === project.id ? null : project.id))
            }
            onCloseMenu={() => setOpenMenuId(null)}
            onRequestDelete={() => {
              setProjectToDelete(project)
              setOpenMenuId(null)
            }}
          />
        ))}
      </div>

      {projectToDelete && (
        <DeleteProjectModal
          projectName={projectToDelete.name}
          onCancel={() => setProjectToDelete(null)}
          onConfirm={handleConfirmDelete}
        />
      )}
    </>
  )
}
