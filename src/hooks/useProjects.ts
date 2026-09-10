import { useSyncExternalStore } from 'react'
import type { Project } from '../types/project'
import { getProjectsSnapshot, subscribeProjects } from '../services/projects'

export function useProjects(): Project[] {
  return useSyncExternalStore(
    subscribeProjects,
    getProjectsSnapshot,
    getProjectsSnapshot,
  )
}
