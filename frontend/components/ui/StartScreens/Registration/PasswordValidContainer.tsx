import { StyleSheet, Text, View } from 'react-native'
import PasswordRequirementItem from './PasswordRequirementItem'

export type Props = {
  passwordLengthValid: boolean
  passwordContainsRequiredCharacters: boolean
}

function PasswordValidContainer({
  passwordLengthValid,
  passwordContainsRequiredCharacters,
}: Props) {
  return (
    <View style={styles.container}>
      <Text style={styles.description}>
        Dein Passwort muss Folgendes haben:
      </Text>
      <PasswordRequirementItem
        isValid={passwordLengthValid}
        label="8 bis 20 Zeichen"
      />
      <PasswordRequirementItem
        isValid={passwordContainsRequiredCharacters}
        label="Buchstaben, Ziffern und Sonderzeichen"
      />
    </View>
  )
}

export default PasswordValidContainer

const styles = StyleSheet.create({
  container: {
    marginVertical: 8,
  },
  description: {
    fontFamily: 'Nunito_700Bold',
  },
})
