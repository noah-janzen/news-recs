import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
} from '@nestjs/common';

import { GetCurrentUserId } from '../common/decorators';
import { SurveyAnswerDto } from './dto/survey-answer.dto';
import { SurveysService } from './surveys.service';

@Controller('surveys')
export class SurveysController {
  constructor(private surveysService: SurveysService) {}

  @Get()
  getSurveys(@GetCurrentUserId() userId: string) {
    return this.surveysService.getEnabledSurveysForUser(userId);
  }

  @Get(':id/answers')
  getSurveyAnswers(
    @GetCurrentUserId() userId: string,
    @Param('id', new ParseIntPipe()) surveyId: number,
  ) {
    return this.surveysService.getSurveyAnswersOfUser({
      userId,
      surveyId,
    });
  }

  @Post(':id/answers')
  async addSurveyAnswer(
    @GetCurrentUserId() userId: string,
    @Param('id', new ParseIntPipe()) surveyId: number,
    @Body() surveyAnswerDto: SurveyAnswerDto,
  ) {
    await this.surveysService.addSurveyAnswer({
      ...surveyAnswerDto,
      userId,
      surveyId,
    });
  }

  @Put(':id/answers')
  async updateSurveyAnswer(
    @GetCurrentUserId() userId: string,
    @Param('id', new ParseIntPipe()) surveyId: number,
    @Body() surveyAnswerDto: SurveyAnswerDto,
  ) {
    await this.surveysService.updateSurveyAnswer({
      ...surveyAnswerDto,
      surveyId,
      userId,
    });
  }
}
