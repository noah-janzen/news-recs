import { useState } from 'react'
import { Alert, StyleSheet } from 'react-native'
import { useDispatch } from 'react-redux'

import { setTokens } from '../../store/authSlice'
import { signIn } from '../../api/auth'
import { emailValid, passwordLengthValid } from '../../util/Validation'
import ExpiryContainer from '../../components/ui/ExpiryContainer'
import Input from '../../components/ui/Input'
import {
  NavigationProp,
  ParamListBase,
  RouteProp,
} from '@react-navigation/native'
import SmallButton from '../../components/ui/SmallButton'

export type Props = {
  route: RouteProp<{ params: { email: string; password: string } }>
  navigation: NavigationProp<ParamListBase>
}

function LoginScreen({ route, navigation }: Props) {
  const [isLoading, setIsLoading] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)

  const [email, setEmail] = useState(route?.params?.email ?? '')
  const [password, setPassword] = useState(route?.params?.password ?? '')

  const dispatch = useDispatch()

  async function signInHandler() {
    setIsSubmitted(true)
    if (!formValid()) return

    setIsLoading(true)
    try {
      const response = await signIn({ email, password })
      const tokens = response.data
      dispatch(setTokens(tokens))
    } catch (error) {
      const errorMessage = error.response.data.message
      // check if errorMessage is array or a simple string
      const alertMessage =
        typeof errorMessage === 'string' ? errorMessage : errorMessage[0]
      if (errorMessage === 'USER_NOT_CONFIRMED') {
        navigation.navigate('ConfirmAccountScreen', { email, password })
      }
      Alert.alert('Fehler', alertMessage)
      setIsLoading(false)
    }
  }

  function forgotPasswordHandler() {
    navigation.navigate('ForgotPasswordScreen', {
      email: email,
    })
  }

  function formValid() {
    return emailValid(email) && passwordLengthValid(password)
  }

  return (
    <ExpiryContainer
      onNext={signInHandler}
      loading={isLoading}
      nextDisabled={!formValid()}
      nextLabel="Anmelden"
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

      <Input
        label="Passwort"
        invalid={
          passwordLengthValid(password) ? null : 'Gib ein gültiges Passwort ein'
        }
        submitted={isSubmitted}
        textInputConfig={{
          value: password,
          onChangeText: setPassword,
          autoCapitalize: 'none',
          autoCorrect: false,
          secureTextEntry: true,
        }}
      />

      <SmallButton
        onPress={forgotPasswordHandler}
        style={{ marginBottom: -10, marginTop: 10 }}
      >
        Passwort vergessen
      </SmallButton>
    </ExpiryContainer>
  )
}

export default LoginScreen

const styles = StyleSheet.create({})
