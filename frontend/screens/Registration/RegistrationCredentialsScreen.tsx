import { NavigationProp, ParamListBase } from '@react-navigation/native'
import { useState } from 'react'
import Input from '../../components/ui/Input'
import PasswordValidContainer from '../../components/ui/StartScreens/Registration/PasswordValidContainer'

import RegistrationContainer from '../../components/ui/StartScreens/RegistrationContainer'
import {
  emailValid,
  passwordContainsRequiredCharacters,
  passwordLengthValid,
  passwordValid,
} from '../../util/Validation'

export type Props = {
  navigation: NavigationProp<ParamListBase>
}

function RegistrationCredentialsScreen({ navigation }: Props) {
  const [inputs, setInputs] = useState({
    email: {
      value: '',
      isValid: false,
    },
    password: {
      value: '',
      isValid: false,
    },
  })
  const [submitted, setSubmitted] = useState(false)

  function inputChangedHandler(inputIdentifier: string, enteredValue: string) {
    setInputs((currentInputs) => {
      let isValid
      switch (inputIdentifier) {
        case 'email':
          isValid = emailValid(enteredValue)
          break
        case 'password':
          isValid = passwordValid(enteredValue)
          break
      }

      return {
        ...currentInputs,
        [inputIdentifier]: {
          value: enteredValue,
          isValid: isValid,
        },
      }
    })
  }

  function nextHandler() {
    setSubmitted(true)
    if (!formValid()) return

    navigation.navigate('WelcomeScreen')
  }

  function formValid() {
    return inputs.email.isValid && inputs.password.isValid
  }

  return (
    <RegistrationContainer onNext={nextHandler} nextDisabled={!formValid()}>
      <Input
        label="E-Mail"
        invalid={
          inputs.email.isValid ? null : 'Gib eine gültige E-Mail-Adresse ein'
        }
        submitted={submitted}
        textInputConfig={{
          value: inputs.email.value,
          onChangeText: (email: string) => inputChangedHandler('email', email),
          keyboardType: 'email-address',
          autoCapitalize: 'none',
          autoCorrect: false,
        }}
      />
      <Input
        label="Passwort"
        invalid={
          inputs.password.isValid
            ? null
            : 'Das Passwort muss alle Anforderungen erfüllen'
        }
        submitted={submitted}
        textInputConfig={{
          value: inputs.password.value,
          onChangeText: (password: string) =>
            inputChangedHandler('password', password),
          autoCapitalize: 'none',
          autoCorrect: false,
          secureTextEntry: true,
        }}
      />
      <PasswordValidContainer
        passwordLengthValid={passwordLengthValid(inputs.password.value)}
        passwordContainsRequiredCharacters={passwordContainsRequiredCharacters(
          inputs.password.value
        )}
      />
    </RegistrationContainer>
  )
}

export default RegistrationCredentialsScreen
