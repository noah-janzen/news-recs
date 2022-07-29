import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { UsersModule } from '../users/users.module';
import { SurveyAnswer, SurveyAnswerSchema } from './survey-answer.model';
import { SurveysController } from './surveys.controller';
import { SurveysService } from './surveys.service';

@Module({
  imports: [
    UsersModule,
    MongooseModule.forFeature([
      { name: SurveyAnswer.name, schema: SurveyAnswerSchema },
    ]),
  ],
  controllers: [SurveysController],
  providers: [SurveysService],
})
export class SurveysModule {}
