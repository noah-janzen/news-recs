import { Injectable } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { mockNewsList } from './data';
import { GetNewsDto } from './dto/get-news.dto';
import { NewsPagination } from './types/news-pagination';

@Injectable()
export class NewsService {
  constructor(private usersService: UsersService) {}

  getNews(userId: string, newsPagination: NewsPagination) {
    const group = this.usersService.getGroup(userId);
    const newsList =
      group === 0
        ? this.getLatestNews(newsPagination)
        : this.getMostPopularNews(newsPagination);

    return {
      algorithm: group,
      items: newsList,
    };
  }

  private getLatestNews(newsPagination: NewsPagination) {
    // TODO: implement
    return [...mockNewsList]
      .slice(newsPagination.offset)
      .slice(0, newsPagination.limit);
  }

  private getMostPopularNews(newsPagination: NewsPagination) {
    // TODO: implement
    return [...mockNewsList]
      .reverse()
      .slice(newsPagination.offset)
      .slice(0, newsPagination.limit);
  }
}
