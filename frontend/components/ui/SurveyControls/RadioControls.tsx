import { View, Text, StyleSheet, Pressable } from 'react-native'
import { Ionicons } from '@expo/vector-icons'

import { GlobalStyles } from '../../../constants/style'
import { AnswerOption } from '../../../model/dto/Survey.dto'
import { getLanguageIdentifier } from '../../../i18n'

type AnswerOptionProps = {
  answerOption: AnswerOption
  isSelected: boolean
  onPress: (value: number) => void
}

function AnswerOptionRow({
  answerOption,
  isSelected,
  onPress,
}: AnswerOptionProps) {
  return (
    <Pressable onPress={() => onPress(answerOption.value)}>
      <View style={styles.answerOptionContainer}>
        <View>
          <Ionicons
            name={isSelected ? 'radio-button-on' : 'radio-button-off'}
            size={18}
            color={GlobalStyles.colors.primary700}
          />
        </View>
        <View style={styles.answerOptionTextContainer}>
          <Text>{answerOption.answer[getLanguageIdentifier()]}</Text>
        </View>
      </View>
    </Pressable>
  )
}

export type Props = {
  answerOptions: AnswerOption[]
  onChangeSelection: (selectionValue: number) => void
  selectionValue: number
}

function RadioControls({
  answerOptions,
  onChangeSelection,
  selectionValue,
}: Props) {
  return (
    <View style={styles.container}>
      {answerOptions.map((option) => (
        <AnswerOptionRow
          answerOption={option}
          isSelected={selectionValue === option.value}
          onPress={onChangeSelection}
          key={option.value}
        />
      ))}
    </View>
  )
}

export default RadioControls

const styles = StyleSheet.create({
  container: {
    paddingVertical: 6,
  },
  answerOptionContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    marginVertical: 2,
  },
  answerOptionTextContainer: {
    marginLeft: 6,
  },
  answerOptionText: {
    fontFamily: 'Nunito_400Regular',
  },
})
