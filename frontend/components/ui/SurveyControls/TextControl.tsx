import { StyleSheet, Text, TextInput, View } from 'react-native'

export type Props = {
  onChangeText: (userInput: string) => void
  userInput: string
}

function TextControl({ onChangeText, userInput }: Props) {
  return (
    <View style={styles.container}>
      <TextInput
        style={styles.textInput}
        multiline={true}
        autoFocus={true}
        value={userInput}
        onChangeText={onChangeText}
      />
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
