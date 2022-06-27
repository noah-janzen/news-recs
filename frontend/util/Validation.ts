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
