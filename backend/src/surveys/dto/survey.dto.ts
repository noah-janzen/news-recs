import { AnswerControlType } from '../survey-answer.model';

export class SurveyDto {
  surveyId: number;
  startDate: Date;
  endDate: Date;
  startsAfterDaysSinceRegistration: number;
  durationInDays: number;
  questions: SurveyQuestion[];
}

class SurveyQuestion {
  questionIdentifier: string;
  questionType: AnswerControlType;
  answerOptions?: { value: string | number; labelIdentifier: string }[];
}
