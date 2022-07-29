import { StyleSheet, Text, TextInput, View } from 'react-native'
import MultiSlider from '@ptomasroos/react-native-multi-slider'

import { GlobalStyles } from '../../../constants/style'
import { AnswerOption } from '../../../model/dto/Survey.dto'
import { getLanguageIdentifier } from '../../../i18n'

export type Props = {
  answerOptions: AnswerOption[]
  onChangeValue: (value: number) => void
  initialValue: number
}

function RangeControl({ answerOptions, onChangeValue, initialValue }: Props) {
  const leftLabel = answerOptions[0].answer[getLanguageIdentifier()]
  const rightLabel = answerOptions[1].answer[getLanguageIdentifier()]

  const min = answerOptions[0].value
  const max = answerOptions[1].value

  return (
    <View style={styles.container}>
      <View style={styles.labelsContainer}>
        <View style={styles.labelContainer}>
          <Text style={styles.label}>{leftLabel}</Text>
        </View>
        <View style={styles.labelContainer}>
          <Text style={styles.label}>{rightLabel}</Text>
        </View>
      </View>
      <MultiSlider
        onValuesChangeFinish={(valueArray) => onChangeValue(valueArray[0])}
        min={min}
        max={max}
        values={[initialValue]}
      />
    </View>
  )
}

export default RangeControl

const styles = StyleSheet.create({
  container: {
    paddingVertical: 6,
    justifyContent: 'center',
    alignItems: 'center',
  },
  labelsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginBottom: -2,
  },
  labelContainer: {
    backgroundColor: GlobalStyles.colors.primary400,
    borderRadius: 20,
    paddingVertical: 4,
    paddingHorizontal: 8,
  },
  label: {
    fontSize: 14,
    color: 'white',
  },
})
