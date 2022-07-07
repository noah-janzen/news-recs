import { Body, Controller, Get, Query } from '@nestjs/common';

import { GetCurrentUserId } from 'src/common/decorators';
import { GetNewsDto } from './dto/get-news.dto';
import { NewsService } from './news.service';

@Controller('news')
export class NewsController {
  constructor(private newsService: NewsService) {}

  @Get()
  fetchNews(
    @GetCurrentUserId() userId: string,
    @Query() getNewsDto: GetNewsDto,
  ) {
    return this.newsService.getNews(userId, getNewsDto);
  }
}
