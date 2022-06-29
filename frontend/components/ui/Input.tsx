import { useState } from 'react'
import { StyleProp, StyleSheet, View, ViewStyle } from 'react-native'

import ErrorLabel from './ErrorLabel'
import InputControl from './InputControl'
import InputLabel from './InputLabel'

export type Props = {
  label: string
  textInputConfig: any // TODO: typing
  invalid: null | string
  submitted?: boolean
  style?: StyleProp<ViewStyle>
}

function Input({ label, textInputConfig, style, invalid, submitted }: Props) {
  const [touched, setTouched] = useState(false)
  const showError: boolean = invalid != null && (touched || !!submitted)

  return (
    <View style={[styles.container, style]}>
      <InputLabel>{label}</InputLabel>
      <InputControl
        showError={showError}
        textInputConfig={textInputConfig}
        onBlur={() => setTouched(true)}
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
})
