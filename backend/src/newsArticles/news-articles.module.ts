import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';

import { NewsArticlesService } from './news-articles.service';
import { NewsArticlesController } from './news-articles.controller';
import { UsersModule } from 'src/users/users.module';
import { InteractionsModule } from 'src/interactions/interactions.module';

@Module({
  imports: [UsersModule, InteractionsModule, HttpModule],
  providers: [NewsArticlesService],
  controllers: [NewsArticlesController],
})
export class NewsArticlesModule {}
