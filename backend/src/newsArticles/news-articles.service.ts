import { Injectable } from '@nestjs/common';

import { InteractionsService } from 'src/interactions/interactions.service';
import { UsersService } from 'src/users/users.service';
import { mockNewsList } from './data';
import { NewsPagination } from './types/news-pagination';

@Injectable()
export class NewsArticlesService {
  constructor(
    private usersService: UsersService,
    private interactionsService: InteractionsService,
  ) {}

  async getNewsArticles(userId: string, newsPagination: NewsPagination) {
    const group = this.usersService.getGroup(userId);
    const newsArticles =
      group === 0
        ? await this.getLatestNewsArticles(userId, newsPagination)
        : await this.getMostPopularNewsArticles(userId, newsPagination);

    return {
      algorithm: group,
      items: newsArticles,
    };
  }

  private async getLatestNewsArticles(
    userId: string,
    newsPagination: NewsPagination,
  ) {
    // TODO: implement
    const unseenNewsArticles = await this.getUnseenNewsArticles(userId);
    return unseenNewsArticles
      .slice(newsPagination.offset)
      .slice(0, newsPagination.limit);
  }

  private async getMostPopularNewsArticles(
    userId: string,
    newsPagination: NewsPagination,
  ) {
    // TODO: implement
    const unseenNewsArticles = await this.getUnseenNewsArticles(userId);
    return unseenNewsArticles
      .reverse()
      .slice(newsPagination.offset)
      .slice(0, newsPagination.limit);
  }

  private async getUnseenNewsArticles(userId: string) {
    const userInteractions = await this.interactionsService.getInteractions({
      userId,
    });
    const seenNewsArticleIds = userInteractions.map(
      (interaction) => interaction.newsArticleId,
    );
    return [...mockNewsList].filter(
      (newsArticle) =>
        seenNewsArticleIds.findIndex(
          (newsArticleId) => newsArticleId === newsArticle.id,
        ) === -1,
    );
  }
}
