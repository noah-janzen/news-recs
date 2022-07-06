import { Gender } from '../Gender'
import { Language } from '../Language'

export interface CreateUserDto {
  language: Language
  dateOfBirth: Date
  gender: Gender
  email: string
  password: string
}
