import { useEffect, useState } from 'react'
import {
  Modal,
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  Pressable,
  ScrollView,
  ActivityIndicator,
} from 'react-native'
import { AntDesign } from '@expo/vector-icons'

import AndroidSafeArea from '../../constants/AndroidSafeArea'
import { GlobalStyles } from '../../constants/style'
import { SurveyDto } from '../../model/dto/Survey.dto'
import SurveyControl from './SurveyControl'
import Button from '../ui/Button'
import { SurveyAnswerDto } from '../../model/dto/SurveyAnswer.dto'
import {
  addSurveyAnswer,
  getSurveyAnswer,
  updateSurveyAnswer,
} from '../../api/surveys'
import i18n from '../../i18n'

export type Props = {
  visible: boolean
  onClose: () => void
  survey: SurveyDto
}

function SurveyModal({ visible, onClose, survey }: Props) {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)
  const [loadingAnswer, setLoadingAnswer] = useState(true)
  const [hasAlreadyAnswered, setHasAlreadyAnswered] = useState<boolean>()
  const [answer, setAnswer] = useState<SurveyAnswerDto>()
  const [isSubmitting, setIsSubmitting] = useState(false)

  async function fetchSurveyAnswer() {
    try {
      setLoadingAnswer(true)
      const surveyAnswer = await getSurveyAnswer({
        surveyId: survey.surveyId,
        questionId: currentQuestionIndex,
      })

      const hasAlreadyAnswered = !!surveyAnswer
      setHasAlreadyAnswered(hasAlreadyAnswered)

      if (hasAlreadyAnswered) {
        setAnswer(surveyAnswer)
      } else {
        changedAnswerHandler(null)
      }

      setLoadingAnswer(false)
    } catch {
      onClose()
    }
  }

  function changedAnswerHandler(answer: string | number | null) {
    setAnswer({
      surveyId: survey.surveyId,
      questionId: currentQuestionIndex,
      answerControlType: survey.questions[currentQuestionIndex].questionType,
      answer: answer,
    })
  }

  function inputValid() {
    const input = answer?.answer
    return input !== '' && input != null
  }

  async function addOrUpdateSurveyAnswer() {
    setIsSubmitting(true)

    const surveyAnswerDto = {
      surveyId: survey.surveyId,
      questionId: currentQuestionIndex,
      answerControlType: survey.questions[currentQuestionIndex].questionType,
      answer: answer!.answer,
    }

    try {
      if (hasAlreadyAnswered) {
        await updateSurveyAnswer(surveyAnswerDto)
      } else {
        await addSurveyAnswer(surveyAnswerDto)
      }
    } catch {
      onClose()
    } finally {
      setIsSubmitting(false)
    }
  }

  const firstQuestion = currentQuestionIndex === 0
  const lastQuestion = currentQuestionIndex + 1 === survey.questions.length

  async function backHandler() {
    if (firstQuestion) return

    if (inputValid() && !lastQuestion) {
      await addOrUpdateSurveyAnswer()
    }

    setAnswer(undefined)
    setCurrentQuestionIndex((index) => index - 1)
  }

  async function nextHandler() {
    if (!inputValid()) return

    await addOrUpdateSurveyAnswer()

    if (lastQuestion) {
      return onClose()
    }

    setAnswer(undefined)
    setCurrentQuestionIndex((index) => index + 1)
  }

  useEffect(() => {
    fetchSurveyAnswer()
  }, [currentQuestionIndex])

  const progress = survey?.questions?.length
    ? Math.round((currentQuestionIndex / survey.questions.length) * 100)
    : 0

  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={visible}
      style={styles.modalContainer}
    >
      <View style={styles.outerContainer}>
        <SafeAreaView style={AndroidSafeArea.AndroidSafeArea}>
          <View style={styles.innerContainer}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>
                {i18n.t('common.survey.title')} ({progress} %)
              </Text>
              <View>
                <Pressable onPress={onClose}>
                  <AntDesign name="close" size={20} color="#555" />
                </Pressable>
              </View>
            </View>

            <ScrollView style={styles.scrollContainer}>
              {loadingAnswer ? (
                <View
                  style={{
                    alignItems: 'center',
                    marginTop: 18,
                    marginBottom: 30,
                  }}
                >
                  <ActivityIndicator />
                </View>
              ) : (
                <>
                  <SurveyControl
                    surveyQuestion={survey.questions[currentQuestionIndex]}
                    onChangeInput={changedAnswerHandler}
                    input={answer?.answer ?? ''}
                  />

                  <View style={styles.buttonsContainer}>
                    {firstQuestion ? (
                      <View style={styles.leftButtonContainer}></View>
                    ) : (
                      <Button
                        onPress={backHandler}
                        disabled={firstQuestion}
                        isLoading={isSubmitting}
                        style={styles.leftButtonContainer}
                      >
                        {i18n.t('common.survey.backButtonLabel')}
                      </Button>
                    )}
                    <Button
                      onPress={nextHandler}
                      disabled={!inputValid()}
                      isLoading={isSubmitting}
                      style={styles.rightButtonContainer}
                    >
                      {lastQuestion
                        ? i18n.t('common.survey.submitButtonLabel')
                        : i18n.t('common.survey.nextButtonLabel')}
                    </Button>
                  </View>
                </>
              )}
            </ScrollView>
          </View>
        </SafeAreaView>
      </View>
    </Modal>
  )
}

export default SurveyModal

const styles = StyleSheet.create({
  modalContainer: {
    justifyContent: 'center',
    flex: 1,
  },
  outerContainer: {
    backgroundColor: 'rgba(0,0,0,.6)',
    flex: 1,
    flexDirection: 'column',
  },
  innerContainer: {
    marginHorizontal: 12,
    marginVertical: 12,
    flex: 1,
    backgroundColor: 'white',
    borderRadius: 16,
    overflow: 'hidden',
  },
  modalHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#aaa',
  },
  modalTitle: {
    fontSize: 16,
    fontFamily: 'EncodeSans_600SemiBold',
    color: GlobalStyles.colors.primary950,
  },
  scrollContainer: {
    backgroundColor: '#eee',
    paddingVertical: 24,
    paddingHorizontal: 18,
  },
  buttonsContainer: {
    marginTop: 12,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  leftButtonContainer: { flex: 1, marginRight: 24 },
  rightButtonContainer: { flex: 1, marginLeft: 24 },
})
