import { QuestionType } from './Survey.dto'

export interface SurveyAnswerDto {
  surveyId: number
  questionId: number
  answerControlType: QuestionType
  answer: number | string | null
}
