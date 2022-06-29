import { StyleProp, StyleSheet, TextInput, View, ViewStyle } from 'react-native'

import { GlobalStyles } from '../../constants/style'

export type Props = {
  showError: boolean
  textInputConfig: any // TODO: typing
  onBlur: () => void
  style?: StyleProp<ViewStyle>
}

function InputControl({ showError, textInputConfig, onBlur, style }: Props) {
  return (
    <TextInput
      style={[styles.textInput, showError && styles.invalid, style]}
      {...textInputConfig}
      onBlur={() => onBlur()}
    />
  )
}

export default InputControl

const styles = StyleSheet.create({
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
})
