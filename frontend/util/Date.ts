import i18n from '../i18n'
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

export function getTimeInterval(date: Date) {
  const now = new Date()
  const timeIntervalInMinutes = Math.ceil(
    (now.getTime() - date.getTime()) / 1000 / 60
  )

  if (timeIntervalInMinutes < 60) {
    return (
      i18n.t('common.timeInterval.pre') +
      Math.ceil(timeIntervalInMinutes) +
      ' ' +
      (timeIntervalInMinutes > 1
        ? i18n.t('common.timeInterval.minutes')
        : i18n.t('common.timeInterval.minute')) +
      i18n.t('common.timeInterval.post')
    )
  }

  const timeIntervalInHours = timeIntervalInMinutes / 60
  if (timeIntervalInHours < 24) {
    return (
      i18n.t('common.timeInterval.pre') +
      Math.ceil(timeIntervalInHours) +
      ' ' +
      (timeIntervalInHours > 1
        ? i18n.t('common.timeInterval.hours')
        : i18n.t('common.timeInterval.hour')) +
      i18n.t('common.timeInterval.post')
    )
  }

  const timeIntervalInDays = timeIntervalInHours / 24
  return (
    i18n.t('common.timeInterval.pre') +
    Math.ceil(timeIntervalInDays) +
    ' ' +
    (timeIntervalInDays > 1
      ? i18n.t('common.timeInterval.days')
      : i18n.t('common.timeInterval.day')) +
    i18n.t('common.timeInterval.post')
  )
}
