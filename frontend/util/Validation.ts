import { parseDate } from './Date'

export function emailValid(email: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
}

export function passwordLengthValid(password: string) {
  return password.length >= 8 && password.length <= 20
}

function hasNumber(text: string) {
  return /\d/.test(text)
}

function hasLetter(text: string) {
  return /\w/.test(text)
}

function hasSpecialCharacter(text: string) {
  return /[^A-Za-z0-9]/.test(text)
}

export function passwordContainsRequiredCharacters(password: string) {
  return (
    hasNumber(password) && hasLetter(password) && hasSpecialCharacter(password)
  )
}

export function passwordValid(password: string) {
  return (
    passwordLengthValid(password) &&
    passwordContainsRequiredCharacters(password)
  )
}

export function firstNameValid(firstName: string) {
  return firstName.trim().length >= 1
}

export function lastNameValid(lastName: string) {
  return lastName.trim().length >= 1
}

export function cityValid(city: string) {
  return city.trim().length >= 3
}

export function dayValid(day: string) {
  const dayNumber = +day
  if (isNaN(dayNumber)) return false
  return dayNumber >= 1 && dayNumber <= 31
}

export function monthValid(month: string) {
  const monthNumber = +month
  if (isNaN(monthNumber)) return false
  return monthNumber >= 1 && monthNumber <= 12
}

export function yearValid(year: string) {
  const yearNumber = +year
  if (isNaN(yearNumber)) return false
  return yearNumber >= 1900 && yearNumber <= new Date().getFullYear()
}

export function registrationDateValid(registrationDate: Date) {
  if (!registrationDate || registrationDate?.toString() === 'Invalid Date') {
    return false
  }

  const now = new Date()

  const minAge = 18 // TODO: STORE IN CONSTANTS FILE
  const minBirthdayDate = subtractYearsFromDate(now, minAge)

  const maxAge = 99 // TODO: STORE IN CONSTANTS FILE
  const maxBirthdayDate = subtractYearsFromDate(now, maxAge)

  return (
    registrationDate < minBirthdayDate && registrationDate > maxBirthdayDate
  )
}

function subtractYearsFromDate(date: Date, years: number) {
  return parseDate(
    (date.getFullYear() - years).toString(),
    (date.getMonth() + 1).toString(),
    date.getDate().toString()
  )
}
