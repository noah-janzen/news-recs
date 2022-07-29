import { IsEnum, IsNotEmpty, IsNumber, Min } from 'class-validator';

import { AnswerControlType } from '../survey-answer.model';

export class SurveyAnswerDto {
  @IsNumber()
  @Min(0)
  questionId: number;

  @IsEnum(AnswerControlType)
  answerControlType: AnswerControlType;

  @IsNotEmpty()
  answer: number | string;
}
