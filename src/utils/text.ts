const MIN_SEARCH_LENGTH = 3

export function normalizeText(value: string): string {
  return value
    .normalize('NFD')
    .replace(/\p{Diacritic}/gu, '')
    .toLowerCase()
    .trim()
}

export function isSearchable(value: string): boolean {
  return normalizeText(value).length >= MIN_SEARCH_LENGTH
}

export function matchesQuery(text: string, query: string): boolean {
  return normalizeText(text).includes(normalizeText(query))
}
