import { Controller, Get, Query } from '@nestjs/common';

import { GetCurrentUserId } from 'src/common/decorators';
import { GetNewsArticlesDto } from './dto/get-news-articles.dto';
import { NewsArticlesService } from './news-articles.service';

@Controller('news-articles')
export class NewsArticlesController {
  constructor(private newsArticleService: NewsArticlesService) {}

  @Get()
  getNewsArticles(
    @GetCurrentUserId() userId: string,
    @Query() getNewsArticlesDto: GetNewsArticlesDto,
  ) {
    return this.newsArticleService.getNewsArticles(userId, getNewsArticlesDto);
  }
}
