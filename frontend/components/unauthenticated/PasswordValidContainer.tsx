import { StyleSheet, Text, View } from 'react-native'

import i18n from '../../i18n'

import {
  passwordContainsRequiredCharacters,
  passwordLengthValid,
} from '../../util/Validation'
import PasswordRequirementItem from './PasswordRequirementItem'

export type Props = {
  password: string
}

function PasswordValidContainer({ password }: Props) {
  return (
    <View style={styles.container}>
      <Text style={styles.description}>
        {i18n.t('common.PasswordValidContainer.headline')}
      </Text>
      <PasswordRequirementItem
        isValid={passwordLengthValid(password)}
        label={i18n.t('common.PasswordValidContainer.numberOfCharacters')}
      />
      <PasswordRequirementItem
        isValid={passwordContainsRequiredCharacters(password)}
        label={i18n.t('common.PasswordValidContainer.differentCharacters')}
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
