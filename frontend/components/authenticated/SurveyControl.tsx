import { View, Text, StyleSheet } from 'react-native'

import { getLanguageIdentifier } from '../../i18n'
import {
  SurveyQuestion,
  QuestionType,
  AnswerOption,
} from '../../model/dto/Survey.dto'
import RadioControls from '../ui/SurveyControls/RadioControls'
import RangeControl from '../ui/SurveyControls/RangeControl'
import TextControl from '../ui/SurveyControls/TextControl'

function Control({
  questionType,
  answerOptions,
  onChangeInput,
  input,
}: {
  questionType: QuestionType
  answerOptions?: AnswerOption[]
  onChangeInput: (input: string | number) => void
  input: string | number | undefined
}) {
  if (questionType === 'TEXT')
    return (
      <TextControl onChangeText={onChangeInput} userInput={input as string} />
    )

  if (questionType === 'RADIO')
    return (
      <RadioControls
        answerOptions={answerOptions!}
        onChangeSelection={onChangeInput}
        selectionValue={input as number}
      />
    )

  if (questionType === 'RANGE')
    return (
      <RangeControl
        answerOptions={answerOptions!}
        onChangeValue={onChangeInput}
        initialValue={input as number}
      />
    )

  return <Text>To implement…</Text>
}

export type Props = {
  surveyQuestion: SurveyQuestion
  onChangeInput: (input: string | number) => void
  input: string | number | undefined
}

function SurveyControl({ surveyQuestion, onChangeInput, input }: Props) {
  return (
    <View style={styles.container}>
      <Text style={styles.questionTitle}>
        {surveyQuestion.question[getLanguageIdentifier()]}
      </Text>
      <Control
        questionType={surveyQuestion.questionType}
        answerOptions={surveyQuestion.answerOptions}
        onChangeInput={onChangeInput}
        input={input}
      />
    </View>
  )
}

export default SurveyControl

const styles = StyleSheet.create({
  container: {
    marginVertical: 8,
  },
  questionTitle: {
    fontSize: 14,
    fontFamily: 'EncodeSans_500Medium',
    marginBottom: 4,
  },
})
