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
      <Text style={styles.label}>{label}</Text>
      <TextInput
        style={[styles.textInput, showError && styles.invalid]}
        {...textInputConfig}
        onBlur={() => setDirty(true)}
      />
      {showError && <Text style={styles.errorLabel}>{invalid}</Text>}
    </View>
  )
}

export default Input

const styles = StyleSheet.create({
  container: {
    marginVertical: 8,
  },
  label: {
    marginBottom: 4,
    fontFamily: 'Nunito_700Bold',
  },
  textInput: {
    fontSize: 16,
    fontFamily: 'Nunito_400Regular',
    backgroundColor: 'white',
    paddingVertical: 8,
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
