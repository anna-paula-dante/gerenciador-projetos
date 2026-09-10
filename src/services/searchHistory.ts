import { readJSON, writeJSON } from './storage'

const STORAGE_KEY = 'project-manager:search-history'
const MAX_ITEMS = 5

let cache: string[] = readJSON<string[]>(STORAGE_KEY, [])
const listeners = new Set<() => void>()

function commit(next: string[]): void {
  cache = next
  writeJSON(STORAGE_KEY, next)
  listeners.forEach((listener) => listener())
}

export function subscribeSearchHistory(listener: () => void): () => void {
  listeners.add(listener)
  return () => {
    listeners.delete(listener)
  }
}

export function getSearchHistorySnapshot(): string[] {
  return cache
}

export function addSearchTerm(term: string): void {
  const value = term.trim()
  if (!value) return

  const withoutDuplicate = cache.filter(
    (item) => item.toLowerCase() !== value.toLowerCase(),
  )
  commit([value, ...withoutDuplicate].slice(0, MAX_ITEMS))
}

export function removeSearchTerm(term: string): void {
  commit(cache.filter((item) => item !== term))
}
