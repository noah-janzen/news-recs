import { Injectable } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { mockNewsList } from './data';
import { NewsPagination } from './types/news-pagination';

@Injectable()
export class NewsArticlesService {
  constructor(private usersService: UsersService) {}

  getNewsArticles(userId: string, newsPagination: NewsPagination) {
    const group = this.usersService.getGroup(userId);
    const newsArticles =
      group === 0
        ? this.getLatestNewsArticles(newsPagination)
        : this.getMostPopularNewsArticles(newsPagination);

    return {
      algorithm: group,
      items: newsArticles,
    };
  }

  private getLatestNewsArticles(newsPagination: NewsPagination) {
    // TODO: implement
    return [...mockNewsList]
      .slice(newsPagination.offset)
      .slice(0, newsPagination.limit);
  }

  private getMostPopularNewsArticles(newsPagination: NewsPagination) {
    // TODO: implement
    return [...mockNewsList]
      .reverse()
      .slice(newsPagination.offset)
      .slice(0, newsPagination.limit);
  }
}
