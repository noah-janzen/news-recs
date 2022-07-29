import { MiddlewareConsumer, Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { APP_GUARD } from '@nestjs/core';
import { MongooseModule } from '@nestjs/mongoose';

import { MailModule } from './mail/mail.module';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { AccessTokenAuthGuard } from './common/guards';
import { NewsArticlesModule } from './newsArticles/news-articles.module';
import { InteractionsModule } from './interactions/interactions.module';
import { AppLoggerMiddleware } from './middleware/app-logger.middleware';
import { SurveysModule } from './surveys/surveys.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    MongooseModule.forRoot(
      `mongodb+srv://${process.env.DATABASE_USERNAME}:${process.env.DATABASE_PASSWORD}@${process.env.DATABASE_URL}/${process.env.DATABASE_NAME}?retryWrites=true&w=majority`,
    ),
    MailModule,
    UsersModule,
    AuthModule,
    NewsArticlesModule,
    InteractionsModule,
    SurveysModule,
  ],
  providers: [
    {
      provide: APP_GUARD,
      useClass: AccessTokenAuthGuard,
    },
  ],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer): void {
    consumer.apply(AppLoggerMiddleware).forRoutes('*');
  }
}
