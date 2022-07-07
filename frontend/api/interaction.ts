import { axiosAuth } from './axios'
import { AddInteractionDto } from '../model/dto/AddInteraction.dto'

const BACKEND_URL = 'http://192.168.178.34:3000'
const BACKEND_INTERACTIONS_PATH = `${BACKEND_URL}/interactions`

export async function addInteraction(addInteractionDto: AddInteractionDto) {
  await axiosAuth.post(BACKEND_INTERACTIONS_PATH, { ...addInteractionDto }) // TODO: Typing with type parameter
}
