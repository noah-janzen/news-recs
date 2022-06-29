import { useState } from 'react'
import { NavigationProp, ParamListBase } from '@react-navigation/native'
import { useDispatch, useSelector } from 'react-redux'

import { emailValid, passwordValid } from '../../util/Validation'
import { StoreReducer } from '../../store/store'
import { setValue } from '../../store/registrationSlice'
import InputControl from '../../components/ui/Input'
import PasswordValidContainer from '../../components/ui/StartScreens/Registration/PasswordValidContainer'
import RegistrationContainer from '../../components/ui/StartScreens/RegistrationContainer'

export type Props = {
  navigation: NavigationProp<ParamListBase>
}

function RegistrationCredentialsScreen({ navigation }: Props) {
  const [submitted, setSubmitted] = useState(false)
  const dispatch = useDispatch()

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

  function nextHandler() {
    setSubmitted(true)
    if (!formValid()) return

    navigation.navigate('WelcomeScreen')
  }

  function formValid() {
    return emailValid(email) && passwordValid(password)
  }

  return (
    <RegistrationContainer
      onNext={nextHandler}
      nextLabel="Registrieren"
      nextDisabled={!formValid()}
    >
      <InputControl
        label="E-Mail"
        invalid={
          emailValid(email) ? null : 'Gib eine gültige E-Mail-Adresse ein'
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
      <InputControl
        label="Passwort"
        invalid={
          passwordValid(password)
            ? null
            : 'Das Passwort muss alle Anforderungen erfüllen'
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
    </RegistrationContainer>
  )
}

export default RegistrationCredentialsScreen
