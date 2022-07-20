import { Gender } from '../Gender'

export interface User {
  id: string
  dateOfBirth: string
  gender: Gender
  email: string
  registrationTimestamp: string
}
