import { axiosAuth } from './axios'
import { NewsPaginationDto } from '../model/dto/NewsPagination.dto'
import { NewsResultDto } from '../model/dto/NewsResult.dto'

const BACKEND_URL = 'http://192.168.178.34:3000'
const BACKEND_NEWS_PATH = `${BACKEND_URL}/news`

export async function getNews({ limit, offset }: NewsPaginationDto) {
  const params: { [key: string]: string } = {}
  if (limit) params.limit = limit.toString()
  if (offset) params.offset = offset.toString()

  const response = await axiosAuth.get(BACKEND_NEWS_PATH, { params }) // TODO: Typing with type parameter

  return response.data as NewsResultDto
}
