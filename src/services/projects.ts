import type { Project, ProjectDraft, SortOption } from '../types/project'
import { readJSON, writeJSON } from './storage'

const STORAGE_KEY = 'project-manager:projects'

let cache: Project[] = readJSON<Project[]>(STORAGE_KEY, [])
const listeners = new Set<() => void>()

function commit(next: Project[]): void {
  cache = next
  writeJSON(STORAGE_KEY, next)
  listeners.forEach((listener) => listener())
}

export function subscribeProjects(listener: () => void): () => void {
  listeners.add(listener)
  return () => {
    listeners.delete(listener)
  }
}

export function getProjectsSnapshot(): Project[] {
  return cache
}

export function getProjectById(id: string): Project | undefined {
  return cache.find((project) => project.id === id)
}

function createId(): string {
  if (typeof crypto !== 'undefined' && typeof crypto.randomUUID === 'function') {
    return crypto.randomUUID()
  }
  return `p-${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 8)}`
}

export function createProject(draft: ProjectDraft): Project {
  const now = new Date().toISOString()
  const project: Project = {
    id: createId(),
    name: draft.name.trim(),
    client: draft.client.trim(),
    startDate: draft.startDate,
    endDate: draft.endDate,
    cover: draft.cover,
    favorite: false,
    createdAt: now,
    updatedAt: now,
  }
  commit([...cache, project])
  return project
}

export function updateProject(id: string, draft: ProjectDraft): Project | undefined {
  const index = cache.findIndex((project) => project.id === id)
  if (index === -1) return undefined

  const updated: Project = {
    ...cache[index],
    name: draft.name.trim(),
    client: draft.client.trim(),
    startDate: draft.startDate,
    endDate: draft.endDate,
    cover: draft.cover,
    updatedAt: new Date().toISOString(),
  }

  const next = [...cache]
  next[index] = updated
  commit(next)
  return updated
}

export function deleteProject(id: string): void {
  commit(cache.filter((project) => project.id !== id))
}

export function toggleFavorite(id: string): void {
  commit(
    cache.map((project) =>
      project.id === id ? { ...project, favorite: !project.favorite } : project,
    ),
  )
}

const collator = new Intl.Collator('pt-BR', { sensitivity: 'base', numeric: true })

export function sortProjects(projects: Project[], option: SortOption): Project[] {
  const copy = [...projects]
  switch (option) {
    case 'recent':
      return copy.sort((a, b) => b.startDate.localeCompare(a.startDate))
    case 'deadline':
      return copy.sort((a, b) => a.endDate.localeCompare(b.endDate))
    case 'alpha':
    default:
      return copy.sort((a, b) => collator.compare(a.name, b.name))
  }
}
