import { SurveyDto } from '../model/dto/Survey.dto'
import { SurveyAnswerDto } from '../model/dto/SurveyAnswer.dto'
import { axiosPrivate } from './axios'

const BACKEND_SURVEYS_PATH = `/surveys`

export async function getSurveys() {
  const response = await axiosPrivate.get<SurveyDto[]>(
    `${BACKEND_SURVEYS_PATH}`
  )

  return response.data
}

export async function getSurveyAnswers(surveyId: number) {
  const response = await axiosPrivate.get<SurveyAnswerDto[]>(
    `${BACKEND_SURVEYS_PATH}/${surveyId}/answers`
  )

  return response.data
}

export async function getSurveyAnswer({
  surveyId,
  questionId,
}: {
  surveyId: number
  questionId: number
}) {
  const response = await axiosPrivate.get<SurveyAnswerDto>(
    `${BACKEND_SURVEYS_PATH}/${surveyId}/answers/${questionId}`
  )

  return response.data
}

export async function addSurveyAnswer({
  surveyId,
  questionId,
  answerControlType,
  answer,
}: SurveyAnswerDto) {
  await axiosPrivate.post<SurveyAnswerDto>(
    `${BACKEND_SURVEYS_PATH}/${surveyId}/answers`,
    { questionId, answerControlType, answer }
  )
}

export async function updateSurveyAnswer({
  surveyId,
  questionId,
  answerControlType,
  answer,
}: SurveyAnswerDto) {
  await axiosPrivate.put<SurveyAnswerDto>(
    `${BACKEND_SURVEYS_PATH}/${surveyId}/answers`,
    { questionId, answerControlType, answer }
  )
}
