import { useEffect, useState } from 'react'
import { StyleSheet, View } from 'react-native'

import { parseDate } from '../../util/Date'
import { dayValid, monthValid, yearValid } from '../../util/Validation'
import InputLabel from './InputLabel'
import InputControl from './InputControl'
import ErrorLabel from './ErrorLabel'

export type Props = {
  label: string
  submitted: boolean
  invalid: string | null
  onDateChanged: (date: Date) => void
}

function DateInput({ label, submitted, invalid, onDateChanged }: Props) {
  const [inputs, setInputs] = useState({
    day: {
      value: '',
      isValid: false,
      isTouched: false,
    },
    month: {
      value: '',
      isValid: false,
      isTouched: false,
    },
    year: {
      value: '',
      isValid: false,
      isTouched: false,
    },
  })

  function inputChangedHandler(
    inputIdentifier: string,
    inputValue: string,
    validator: (inputValue: string) => boolean
  ) {
    const control = {
      value: inputValue,
      isValid: validator(inputValue),
      isTouched: true,
    }
    setInputs((currentInputs) => ({
      ...currentInputs,
      [inputIdentifier]: control,
    }))
  }

  useEffect(() => {
    const date = parseDate(
      inputs.year.value,
      inputs.month.value,
      inputs.day.value
    )
    onDateChanged(date)
  }, [inputs])

  return (
    <View style={styles.container}>
      <InputLabel>{label}</InputLabel>
      <View style={styles.inputsContainer}>
        <InputControl
          showError={!inputs.day.isValid && (submitted || inputs.day.isTouched)}
          onBlur={() => {}} // TODO:
          style={[styles.input, styles.leftElement]}
          textInputConfig={{
            keyboardType: 'number-pad',
            placeholder: 'Tag',
            maxLength: 2,
            value: inputs.day.value,
            onChangeText: (day: string) =>
              inputChangedHandler('day', day, dayValid),
          }}
        />
        <InputControl
          showError={
            !inputs.month.isValid && (submitted || inputs.month.isTouched)
          }
          onBlur={() => {}} // TODO:
          style={[styles.input, styles.centerElement]}
          textInputConfig={{
            keyboardType: 'number-pad',
            placeholder: 'Monat',
            maxLength: 2,
            value: inputs.month.value,
            onChangeText: (month: string) =>
              inputChangedHandler('month', month, monthValid),
          }}
        />

        <InputControl
          showError={
            !inputs.year.isValid && (submitted || inputs.year.isTouched)
          }
          onBlur={() => {}} // TODO:
          style={[styles.input, styles.rightElement]}
          textInputConfig={{
            keyboardType: 'number-pad',
            placeholder: 'Jahr',
            maxLength: 4,
            value: inputs.year.value,
            onChangeText: (year: string) =>
              inputChangedHandler('year', year, yearValid),
          }}
        />
      </View>
      {invalid && submitted && <ErrorLabel>{invalid}</ErrorLabel>}
    </View>
  )
}

export default DateInput

const gap = 8

const styles = StyleSheet.create({
  container: {
    marginVertical: 8,
  },
  inputsContainer: {
    flexDirection: 'row',
  },
  input: {
    flex: 1,
    textAlign: 'center',
  },
  leftElement: {
    marginRight: gap,
  },
  centerElement: {
    marginLeft: gap / 2,
    marginRight: gap / 2,
  },
  rightElement: {
    marginLeft: gap,
  },
})
