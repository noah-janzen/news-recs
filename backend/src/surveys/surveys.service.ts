import { promises as fs } from 'fs';
import * as path from 'path';
import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { SurveyDto } from './dto/survey.dto';
import {
  AnswerControlType,
  SurveyAnswer,
  SurveyAnswerDocument,
} from './survey-answer.model';
import { DateUtil } from 'src/common/util/date-util';
import { UsersService } from 'src/users/users.service';
import { User } from 'src/users/user.model';

@Injectable()
export class SurveysService {
  private allSurveys: SurveyDto[];

  constructor(
    @InjectModel(SurveyAnswer.name)
    private surveyAnswerModel: Model<SurveyAnswerDocument>,
    private usersService: UsersService,
  ) {
    this.initSurveys();
  }

  private async initSurveys() {
    const surveysPath = path.join(__dirname, 'data');
    try {
      const fileNames = await fs.readdir(surveysPath);
      const surveys = fileNames.map(async (fileName) => {
        const filePath = path.join(surveysPath, fileName);
        const survey = await this.parseSurvey(filePath);
        return {
          ...survey,
          startDate: new Date(survey.startDate),
          endDate: new Date(survey.endDate),
        };
      });
      this.allSurveys = await Promise.all(surveys);
    } catch (error) {
      this.allSurveys = [];
    }
  }

  private async parseSurvey(filePath) {
    const surveyFile = await fs.readFile(filePath);
    return JSON.parse(surveyFile.toString());
  }

  getSurvey(surveyId: number) {
    return this.allSurveys.find((survey) => survey.surveyId === surveyId);
  }

  getAllSurveys() {
    return this.allSurveys;
  }

  async getEnabledSurveysForUser(userId: string) {
    const user = await this.usersService.findById(userId);

    const surveysEnabled = await Promise.all(
      this.getAllSurveys().map((survey) =>
        this.isSurveyEnabledForUser({ survey, user }),
      ),
    );

    return this.getAllSurveys().filter((_, index) => surveysEnabled[index]);
  }

  async addSurveyAnswer({
    surveyId,
    userId,
    questionId,
    answerControlType,
    answer,
  }: {
    surveyId: number;
    userId: string;
    questionId: number;
    answerControlType: AnswerControlType;
    answer: number | string;
  }) {
    // If an answer of the user for the given survey already exists, throw an exception
    const surveyAnswer = await this.getSurveyAnswer({
      userId,
      surveyId,
      questionId,
    });
    if (surveyAnswer != null) {
      throw new BadRequestException(
        'SURVEY_ANSWER_FOR_THIS_QUESTION_ALREADY_EXISTS',
      );
    }

    // If the passed question id does not exist on the survey, throw an exception
    const survey = this.getSurvey(surveyId);
    if (!this.questionExists({ questionId, survey })) {
      throw new BadRequestException('QUESTION_DOES_NOT_EXIST');
    }

    // Store the new answer of the user
    const newAnswer = new this.surveyAnswerModel({
      surveyId,
      questionId,
      answerControlType,
      answer,
      user: userId,
      createdTimestamp: new Date(),
    });
    await newAnswer.save();

    return newAnswer;
  }

  async updateSurveyAnswer({
    surveyId,
    userId,
    questionId,
    answerControlType,
    answer,
  }: {
    surveyId: number;
    userId: string;
    questionId: number;
    answerControlType: AnswerControlType;
    answer: number | string;
  }) {
    const surveyAnswer = await this.getSurveyAnswer({
      userId,
      surveyId,
      questionId,
    });

    // If an answer of the user for the given survey does not exist yet, throw an exception
    if (surveyAnswer == null) {
      throw new BadRequestException(
        'SURVEY_ANSWER_FOR_THIS_QUESTION_DOES_NOT_EXIST',
      );
    }

    // If the user has already finished the survey, do not accept changes of the answers of the survey
    const survey = await this.getSurvey(surveyId);
    const hasUserFinishedSurvey = !(await this.hasUserNotFinishedSurvey({
      userId,
      survey,
    }));
    if (hasUserFinishedSurvey) {
      throw new BadRequestException('USER_HAS_ALREADY_FINISHED_SURVEY');
    }

    // Update the answer
    surveyAnswer.answer = answer;
    surveyAnswer.answerControlType = answerControlType; // should never change
    surveyAnswer.lastUpdatedTimestamp = new Date();

    await surveyAnswer.save();
  }

  private async getSurveyAnswer({
    userId,
    surveyId,
    questionId,
  }: {
    userId: string;
    surveyId: number;
    questionId: number;
  }) {
    const surveyAnswer = await this.surveyAnswerModel
      .findOne({
        user: userId,
        surveyId: surveyId,
        questionId: questionId,
      })
      .exec();

    return surveyAnswer;
  }

  getSurveyAnswersOfUser({
    userId,
    surveyId,
  }: {
    userId: string;
    surveyId?: number;
  }) {
    const filter = { user: userId } as any;
    if (surveyId != null) filter.surveyId = surveyId;

    return this.surveyAnswerModel
      .find(filter, {
        surveyId: 1,
        questionId: 1,
        answerControlType: 1,
        answer: 1,
        _id: 0,
      })
      .lean()
      .exec();
  }

  getSurveyAnswerOfUser({
    userId,
    surveyId,
    questionId,
  }: {
    userId: string;
    surveyId: number;
    questionId: number;
  }) {
    return this.surveyAnswerModel
      .findOne(
        {
          user: userId,
          surveyId,
          questionId,
        },
        {
          surveyId: 1,
          questionId: 1,
          answerControlType: 1,
          answer: 1,
          _id: 0,
        },
      )
      .lean()
      .exec();
  }

  private async isSurveyEnabledForUser({
    survey,
    user,
  }: {
    survey: SurveyDto;
    user: User;
  }) {
    const userId = user.id;
    const value =
      this.isSurveyActive(survey) &&
      this.isUserRegisteredLongEnough({ user, survey }) &&
      (await this.isSurveyNotExpiredForUser({ survey, userId })) &&
      (await this.hasUserNotFinishedSurvey({ survey, userId }));
    return value;
  }

  private isSurveyActive({ startDate, endDate }: SurveyDto) {
    const now = new Date();

    const hasStarted = startDate < now;
    const hasNotEnded = endDate > now;

    return hasStarted && hasNotEnded;
  }

  private isUserRegisteredLongEnough({
    user,
    survey,
  }: {
    user: User;
    survey: SurveyDto;
  }) {
    const now = new Date();
    const startDateForUser = DateUtil.addDays(
      user.registrationTimestamp,
      survey.startsAfterDaysSinceRegistration,
    );

    return startDateForUser < now;
  }

  private async isSurveyNotExpiredForUser({
    survey,
    userId,
  }: {
    survey: SurveyDto;
    userId: string;
  }) {
    const now = new Date();

    const timestampOfFirstAnswer = await this.getTimestampOfFirstAnswer({
      userId,
      surveyId: survey.surveyId,
    });
    if (timestampOfFirstAnswer == null) return true;

    const expiryDate = DateUtil.addDays(
      timestampOfFirstAnswer,
      survey.durationInDays,
    );

    return expiryDate > now;
  }

  private async hasUserNotFinishedSurvey({
    userId,
    survey,
  }: {
    userId: string;
    survey: SurveyDto;
  }) {
    const surveyAnswers = await this.getSurveyAnswersOfUser({
      userId,
      surveyId: survey.surveyId,
    });

    return survey.questions.some(
      (_, index) =>
        surveyAnswers.find((answer) => answer.questionId === index) == null,
    );
  }

  private async getTimestampOfFirstAnswer({
    userId,
    surveyId,
  }: {
    userId: string;
    surveyId: number;
  }) {
    const timestamps = await this.surveyAnswerModel
      .find(
        {
          user: userId,
          surveyId: surveyId,
        },
        {
          createdTimestamp: 1,
          _id: 0,
        },
      )
      .sort({ createdTimestamp: 1 })
      .lean()
      .exec();

    return timestamps.length === 0 ? null : timestamps[0].createdTimestamp;
  }

  private questionExists({ questionId, survey }) {
    return survey.questions[questionId] != null;
  }
}
