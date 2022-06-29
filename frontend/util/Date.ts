import { DateEntered } from '../model/DateEntered'

function zeroPad(number: string, places: number) {
  return number.padStart(places, '0')
}

export function parseDate({ year, month, day }: DateEntered) {
  const yearPadded = zeroPad(year, 4)
  const monthPadded = zeroPad(month, 2)
  const dayPadded = zeroPad(day, 2)

  const dateISOString = `${yearPadded}-${monthPadded}-${dayPadded}T00:00:00Z`

  return new Date(dateISOString)
}
