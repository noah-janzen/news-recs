import { Gender } from '../Gender'

export interface UserUpdateDto {
  dateOfBirth: Date
  gender: string
  email: string
}
