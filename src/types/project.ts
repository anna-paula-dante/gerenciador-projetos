export interface Project {
  id: string
  name: string
  client: string
  startDate: string
  endDate: string
  cover?: string
  favorite: boolean
  createdAt: string
  updatedAt: string
}

export type ProjectDraft = Pick<
  Project,
  'name' | 'client' | 'startDate' | 'endDate' | 'cover'
>

export type SortOption = 'alpha' | 'recent' | 'deadline'
