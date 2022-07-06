import { useState } from 'react'
import {
  NavigationProp,
  ParamListBase,
  RouteProp,
} from '@react-navigation/native'

import { emailValid } from '../../util/Validation'
import ExpiryContainer from '../../components/ui/ExpiryContainer'
import Input from '../../components/ui/Input'
import { Alert } from 'react-native'
import { forgotPassword } from '../../api/auth'

export type Props = {
  route: RouteProp<{ params: { email: string; password?: string } }>
  navigation: NavigationProp<ParamListBase>
}

function ForgotPasswordScreen({ route, navigation }: Props) {
  const [isLoading, setIsLoading] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [email, setEmail] = useState(route?.params?.email ?? '')

  async function forgotPasswordHandler() {
    setIsSubmitted(true)
    if (!formValid()) return

    setIsLoading(true)
    try {
      await forgotPassword({ email })
      setIsLoading(false)
      navigation.navigate('ChangePasswordScreen', { email })
      Alert.alert(
        'Code gesendet',
        'Du hast per E-Mail einen Code zur Änderung deines Passworts erhalten.'
      )
    } catch (error) {
      const errorMessage = error.response.data.message
      // check if errorMessage is array or a simple string
      const alertMessage =
        typeof errorMessage === 'string' ? errorMessage : errorMessage[0]
      Alert.alert('Fehler', alertMessage)
      setIsLoading(false)
    }
  }

  function formValid() {
    return emailValid(email)
  }

  return (
    <ExpiryContainer
      onNext={forgotPasswordHandler}
      loading={isLoading}
      nextDisabled={!formValid()}
      nextLabel="Passwort vergessen"
    >
      <Input
        label="E-Mail"
        invalid={
          emailValid(email) ? null : 'Gib eine gültige E-Mail-Adresse ein'
        }
        submitted={isSubmitted}
        textInputConfig={{
          value: email,
          onChangeText: setEmail,
          keyboardType: 'email-address',
          autoCapitalize: 'none',
          autoCorrect: false,
        }}
      />
    </ExpiryContainer>
  )
}

export default ForgotPasswordScreen
