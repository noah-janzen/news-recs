import { axiosPrivate } from './axios'
import { NewsPaginationDto } from '../model/dto/NewsPagination.dto'
import { NewsResultDto } from '../model/dto/NewsResult.dto'

const BACKEND_NEWS_PATH = `/news-articles`

export async function getNews({ limit, offset }: NewsPaginationDto) {
  const params: { [key: string]: string } = {}
  if (limit) params.limit = limit.toString()
  if (offset) params.offset = offset.toString()

  const response = await axiosPrivate.get<NewsResultDto>(BACKEND_NEWS_PATH, {
    params,
  })

  return response.data
}
