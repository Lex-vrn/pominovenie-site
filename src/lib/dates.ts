export interface MemorialDate {
  label: string
  date: Date
}

// День смерти считается первым днём
export function calculateMemorialDates(deathDateString: string): MemorialDate[] {
  const deathDate = new Date(deathDateString + 'T00:00:00')

  const addDays = (date: Date, days: number): Date => {
    const result = new Date(date)
    // -1 потому что день смерти сам считается первым днём
    result.setDate(result.getDate() + days - 1)
    return result
  }

  const addYears = (date: Date, years: number): Date => {
    const result = new Date(date)
    result.setFullYear(result.getFullYear() + years)
    return result
  }

  return [
    { label: '3-й день', date: addDays(deathDate, 3) },
    { label: '9-й день', date: addDays(deathDate, 9) },
    { label: '40-й день', date: addDays(deathDate, 40) },
    { label: 'Годовщина', date: addYears(deathDate, 1) },
  ]
}

export function formatDate(date: Date): string {
  return date.toLocaleDateString('ru-RU', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  })
}