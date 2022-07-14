import { axiosPrivate } from './axios'
import { AddInteractionDto } from '../model/dto/AddInteraction.dto'

const BACKEND_INTERACTIONS_PATH = `/interactions`

export async function addInteraction(addInteractionDto: AddInteractionDto) {
  await axiosPrivate.post<void>(BACKEND_INTERACTIONS_PATH, addInteractionDto)
}
