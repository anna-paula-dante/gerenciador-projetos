export interface TextSegment {
  text: string
  highlighted: boolean
}

const MIN_QUERY_LENGTH = 3

function fold(char: string): string {
  return char.normalize('NFD').replace(/\p{Diacritic}/gu, '').toLowerCase()
}

/**
 * Splits `text` into segments, marking the parts that match `query`.
 * Matching is case and accent insensitive, and the original text
 * (including its accents/casing) is preserved in every segment.
 */
export function getHighlightSegments(text: string, query: string): TextSegment[] {
  const foldedQuery = Array.from(query.trim()).map(fold).join('')
  if (foldedQuery.length < MIN_QUERY_LENGTH) {
    return [{ text, highlighted: false }]
  }

  let folded = ''
  const indexMap: number[] = []
  for (let i = 0; i < text.length; i += 1) {
    const foldedChar = fold(text[i])
    for (let j = 0; j < foldedChar.length; j += 1) {
      folded += foldedChar[j]
      indexMap.push(i)
    }
  }

  const segments: TextSegment[] = []
  let cursor = 0
  let searchFrom = 0
  let found = folded.indexOf(foldedQuery, searchFrom)
  while (found !== -1) {
    const start = indexMap[found]
    const end = indexMap[found + foldedQuery.length - 1] + 1
    if (start > cursor) {
      segments.push({ text: text.slice(cursor, start), highlighted: false })
    }
    segments.push({ text: text.slice(start, end), highlighted: true })
    cursor = end
    searchFrom = found + foldedQuery.length
    found = folded.indexOf(foldedQuery, searchFrom)
  }

  if (cursor < text.length) {
    segments.push({ text: text.slice(cursor), highlighted: false })
  }

  return segments.length > 0 ? segments : [{ text, highlighted: false }]
}
