import { StyleSheet, Text, View } from 'react-native'

import {
  passwordContainsRequiredCharacters,
  passwordLengthValid,
} from '../../../../util/Validation'
import PasswordRequirementItem from './PasswordRequirementItem'

export type Props = {
  password: string
}

function PasswordValidContainer({ password }: Props) {
  return (
    <View style={styles.container}>
      <Text style={styles.description}>
        Dein Passwort muss Folgendes haben:
      </Text>
      <PasswordRequirementItem
        isValid={passwordLengthValid(password)}
        label="8 bis 20 Zeichen"
      />
      <PasswordRequirementItem
        isValid={passwordContainsRequiredCharacters(password)}
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
