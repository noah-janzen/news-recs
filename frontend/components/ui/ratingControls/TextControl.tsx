import { useState } from 'react'
import { StyleSheet, TextInput, View } from 'react-native'

import Button from '../Button'

export type Props = {
  onRate: (rating: any) => Promise<void>
  placeholder?: string
  buttonLabel?: string
}

function TextControl({ onRate, placeholder, buttonLabel }: Props) {
  const [userInput, setUserInput] = useState('')

  function submitHandler() {
    onRate(userInput)
  }

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.textInput}
        multiline={true}
        autoFocus={true}
        placeholder={placeholder}
        value={userInput}
        onChangeText={setUserInput}
      />
      <Button
        onPress={submitHandler}
        disabled={userInput.length === 0}
        style={styles.buttonContainer}
      >
        {buttonLabel}
      </Button>
    </View>
  )
}

export default TextControl

const styles = StyleSheet.create({
  container: {
    paddingVertical: 6,
  },
  textInput: {
    padding: 6,
    borderBottomWidth: 1,
    borderColor: '#888',
    flexGrow: 1,
  },
  buttonContainer: {
    marginTop: 12,
  },
})
