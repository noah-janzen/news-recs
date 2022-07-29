import { supportedLanguages } from '../../i18n/index'

export interface SurveyDto {
  surveyId: number
  startDate: Date
  endDate: Date
  startsAfterDaysSinceRegistration: number
  durationInDays: number
  questions: SurveyQuestion[]
}

export interface SurveyQuestion {
  question: Translation
  questionType: QuestionType
  answerOptions?: AnswerOption[]
}

type languageIdentifier = typeof supportedLanguages[number]
export type Translation = {
  [key in languageIdentifier]: string
}

export interface AnswerOption {
  value: number
  answer: Translation
}

export type QuestionType = 'RADIO' | 'RANGE' | 'TEXT'
