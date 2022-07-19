import { useState } from 'react'
import { NavigationProp, ParamListBase } from '@react-navigation/native'
import { useSelector } from 'react-redux'

import { emailValid, passwordValid } from '../../util/Validation'
import { useAppDispatch } from '../../store/store'
import { StoreReducer } from '../../store/rootReducer'
import { setValue } from '../../store/registrationSlice'
import Input from '../../components/ui/Input'
import PasswordValidContainer from '../../components/unauthenticated/PasswordValidContainer'
import ExpiryContainer from '../../components/ui/ExpiryContainer'
import { store } from '../../store/store'
import { CreateUserDto } from '../../model/dto/CreateUser.dto'
import { parseDate } from '../../util/Date'
import { Alert } from 'react-native'
import { signUp } from '../../api/auth'
import i18n from '../../i18n'

export type Props = {
  navigation: NavigationProp<ParamListBase>
}

function RegistrationCredentialsScreen({ navigation }: Props) {
  const [submitted, setSubmitted] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const dispatch = useAppDispatch()

  const email = useSelector((state: StoreReducer) => state.registration.email)
  const password = useSelector(
    (state: StoreReducer) => state.registration.password
  )

  function inputChangedHandler(inputIdentifier: string, enteredValue: string) {
    dispatch(
      setValue({
        identifier: inputIdentifier,
        value: enteredValue,
      })
    )
  }

  async function nextHandler() {
    setSubmitted(true)
    if (!formValid()) return

    setIsLoading(true)
    const userInput = store.getState().registration
    const user: CreateUserDto = {
      ...userInput,
      dateOfBirth: parseDate(userInput.dateOfBirth),
      language: userInput.language!,
      gender: userInput.gender!,
    }
    try {
      await signUp(user)
      setIsLoading(false)
      navigation.navigate('ConfirmAccountScreen', { email, password })
    } catch (error: any) {
      const errorMessage = error.response.data.message
      // check if errorMessage is array or a simple string
      const alertMessage =
        typeof errorMessage === 'string'
          ? errorMessage
          : errorMessage.join('. ')
      Alert.alert('Fehler', alertMessage)
      setIsLoading(false)
    }
  }

  function formValid() {
    return emailValid(email) && passwordValid(password)
  }

  return (
    <ExpiryContainer
      onNext={nextHandler}
      nextLabel={i18n.t('RegistrationCredentialsScreen.nextLabel')}
      nextDisabled={!formValid()}
      loading={isLoading}
    >
      <Input
        label={i18n.t('RegistrationCredentialsScreen.emailInput.label')}
        invalid={
          emailValid(email)
            ? null
            : i18n.t('RegistrationCredentialsScreen.emailInput.errorLabel')
        }
        submitted={submitted}
        textInputConfig={{
          value: email,
          onChangeText: (email: string) => inputChangedHandler('email', email),
          keyboardType: 'email-address',
          autoCapitalize: 'none',
          autoCorrect: false,
        }}
      />
      <Input
        label={i18n.t('RegistrationCredentialsScreen.passwordInput.label')}
        invalid={
          passwordValid(password)
            ? null
            : i18n.t('RegistrationCredentialsScreen.passwordInput.errorLabel')
        }
        submitted={submitted}
        textInputConfig={{
          value: password,
          onChangeText: (password: string) =>
            inputChangedHandler('password', password),
          autoCapitalize: 'none',
          autoCorrect: false,
          secureTextEntry: true,
        }}
      />
      <PasswordValidContainer password={password} />
    </ExpiryContainer>
  )
}

export default RegistrationCredentialsScreen
