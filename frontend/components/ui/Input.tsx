import { useState } from 'react'
import {
  StyleProp,
  StyleSheet,
  Text,
  TextInput,
  View,
  ViewStyle,
} from 'react-native'
import { GlobalStyles } from '../../constants/style'
import ErrorLabel from './StartScreens/Registration/ErrorLabel'
import InputLabel from './StartScreens/Registration/InputLabel'

export type Props = {
  label: string
  textInputConfig: any // TODO: typing
  invalid: null | string
  submitted?: boolean
  style?: StyleProp<ViewStyle>
}

function Input({ label, textInputConfig, style, invalid, submitted }: Props) {
  const [dirty, setDirty] = useState(false)
  const showError = invalid && (dirty || submitted)

  return (
    <View style={styles.container}>
      <InputLabel>{label}</InputLabel>
      <TextInput
        style={[styles.textInput, showError && styles.invalid]}
        {...textInputConfig}
        onBlur={() => setDirty(true)}
      />
      {showError && <ErrorLabel>{invalid}</ErrorLabel>}
    </View>
  )
}

export default Input

const styles = StyleSheet.create({
  container: {
    marginVertical: 8,
  },

  textInput: {
    fontSize: 16,
    fontFamily: 'Nunito_400Regular',
    backgroundColor: 'white',
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
  },
  invalid: {
    borderColor: GlobalStyles.colors.error,
    backgroundColor: GlobalStyles.colors.errorLight,
    color: GlobalStyles.colors.error,
  },
  errorLabel: {
    color: GlobalStyles.colors.error,
    marginTop: 4,
  },
})
