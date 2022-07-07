import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';

import { InteractionsService } from 'src/interactions/interactions.service';
import { UsersService } from 'src/users/users.service';
import { NewsArticleDto } from './dto/news-article.dto';
import { NewsPagination } from './types/news-pagination';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class NewsArticlesService {
  constructor(
    private usersService: UsersService,
    private interactionsService: InteractionsService,
    private httpService: HttpService,
  ) {}

  /* Caches all news articles sorted descending by date */
  private allNewsArticles: NewsArticleDto[];

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
    const allNewsArticles = await this.getAllNewsArticles();

    return allNewsArticles.filter(
      (newsArticle) =>
        seenNewsArticleIds.findIndex(
          (newsArticleId) => newsArticleId === newsArticle.id,
        ) === -1,
    );
  }

  private async getAllNewsArticles() {
    if (this.allNewsArticles) return this.allNewsArticles;

    const GRAPH_QL_ENDPOINT = `http://localhost:4000/graphql`;
    const query = `{
      news (limit: 5000) {
        id,
        headline,
        abstract,
        image,
        url,
        datePublished,
        sourceOrganization,
      }
    }`;
    const response = await firstValueFrom(
      this.httpService.post(GRAPH_QL_ENDPOINT, {
        operationName: null,
        variables: {},
        query: query,
      }),
    );

    const allNewsArticles = response.data.data.news;
    const newsArticlesWithImage = allNewsArticles.filter(
      (newsArticle) => newsArticle.image,
    );
    const newsArticlesWithoutDuplicates = newsArticlesWithImage.filter(
      (newsArticle, index) =>
        newsArticlesWithImage.findIndex(
          (article) => article.headline === newsArticle.headline,
        ) >= index,
    );
    const sortedNewsArticles = newsArticlesWithoutDuplicates.sort((a, b) => {
      return new Date(a.datePublished) < new Date(b.published);
    });

    this.allNewsArticles = sortedNewsArticles;

    return this.allNewsArticles;
  }
}
