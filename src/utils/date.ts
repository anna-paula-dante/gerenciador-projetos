const ISO_DATE = /^(\d{4})-(\d{2})-(\d{2})$/

function parseIsoDate(value: string): Date | null {
  const match = ISO_DATE.exec(value)
  if (!match) return null
  const [, year, month, day] = match
  const date = new Date(Number(year), Number(month) - 1, Number(day))
  const isConsistent =
    date.getFullYear() === Number(year) &&
    date.getMonth() === Number(month) - 1 &&
    date.getDate() === Number(day)
  return isConsistent ? date : null
}

export function isValidIsoDate(value: string): boolean {
  return parseIsoDate(value) !== null
}

const formatter = new Intl.DateTimeFormat('pt-BR', {
  day: '2-digit',
  month: 'long',
  year: 'numeric',
})

export function formatDateBR(value: string): string {
  const date = parseIsoDate(value)
  return date ? formatter.format(date) : value
}
