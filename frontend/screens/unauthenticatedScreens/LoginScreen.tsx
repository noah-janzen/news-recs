import { useEffect, useState } from 'react'
import { Alert, StyleSheet } from 'react-native'
import { useSelector } from 'react-redux'

import { authenticate } from '../../store/authSlice'
import { emailValid, passwordLengthValid } from '../../util/Validation'
import ExpiryContainer from '../../components/ui/ExpiryContainer'
import Input from '../../components/ui/Input'
import {
  NavigationProp,
  ParamListBase,
  RouteProp,
} from '@react-navigation/native'
import SmallButton from '../../components/ui/SmallButton'
import { useAppDispatch } from '../../store/store'
import { StoreReducer } from '../../store/store'

export type Props = {
  route: RouteProp<{ params: { email: string; password: string } }>
  navigation: NavigationProp<ParamListBase>
}

function LoginScreen({ route, navigation }: Props) {
  const [isLoading, setIsLoading] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)

  const [email, setEmail] = useState(route?.params?.email ?? '')
  const [password, setPassword] = useState(route?.params?.password ?? '')

  const dispatch = useAppDispatch()
  const authenticationStatus = useSelector(
    (state: StoreReducer) => state.auth.authentication.status
  )
  const authenticationError = useSelector(
    (state: StoreReducer) => state.auth.authentication.error
  )

  async function signInHandler() {
    setIsSubmitted(true)
    if (!formValid()) return

    setIsLoading(true)
    dispatch(authenticate({ email, password }))
  }

  useEffect(() => {
    if (!authenticationError || authenticationStatus !== 'failed') return

    setIsLoading(false)
    if (authenticationError === 'USER_NOT_CONFIRMED') {
      navigation.navigate('ConfirmAccountScreen', { email, password })
    }
    Alert.alert('Fehler', authenticationError)
  }, [authenticationStatus, authenticationError])

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
