import { Module } from '@nestjs/common';
import { NewsArticlesService } from './news-articles.service';
import { NewsArticlesController } from './news-articles.controller';
import { UsersModule } from 'src/users/users.module';

@Module({
  imports: [UsersModule],
  providers: [NewsArticlesService],
  controllers: [NewsArticlesController],
})
export class NewsArticlesModule {}
