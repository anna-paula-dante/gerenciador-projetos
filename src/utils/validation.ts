import type { ProjectDraft } from '../types/project'
import { isValidIsoDate } from './date'

export interface ProjectFormValues {
  name: string
  client: string
  startDate: string
  endDate: string
  cover?: string
}

export type ProjectFieldName = 'name' | 'client' | 'startDate' | 'endDate'

export type ProjectFormErrors = Partial<Record<ProjectFieldName, string>>

/**
 * Conta tokens separados por espaço que contenham ao menos um caractere
 * alfanumérico. "Projeto 01" conta como 2 tokens válidos.
 */
function countTokens(value: string): number {
  return value
    .trim()
    .split(/\s+/)
    .filter((token) => /[\p{L}\p{N}]/u.test(token)).length
}

export function validateProjectForm(values: ProjectFormValues): ProjectFormErrors {
  const errors: ProjectFormErrors = {}

  if (countTokens(values.name) < 2) {
    errors.name = 'Por favor, digite ao menos duas palavras'
  }

  if (countTokens(values.client) < 1) {
    errors.client = 'Por favor, digite ao menos uma palavra'
  }

  if (!isValidIsoDate(values.startDate)) {
    errors.startDate = 'Selecione uma data válida'
  }

  if (!isValidIsoDate(values.endDate)) {
    errors.endDate = 'Selecione uma data válida'
  } else if (isValidIsoDate(values.startDate) && values.endDate < values.startDate) {
    errors.endDate = 'A data final não pode ser anterior à data de início'
  }

  return errors
}

export function toDraft(values: ProjectFormValues): ProjectDraft {
  return {
    name: values.name,
    client: values.client,
    startDate: values.startDate,
    endDate: values.endDate,
    cover: values.cover,
  }
}
