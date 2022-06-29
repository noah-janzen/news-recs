import { useState } from 'react'
import { NavigationProp, ParamListBase } from '@react-navigation/native'

import { emailValid, passwordValid } from '../../util/Validation'
import RegistrationContainer from '../../components/ui/StartScreens/RegistrationContainer'
import InputControl from '../../components/ui/Input'
import PasswordValidContainer from '../../components/ui/StartScreens/Registration/PasswordValidContainer'

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

  function inputChangedHandler(
    inputIdentifier: string,
    enteredValue: string,
    validator: (enteredValue: string) => boolean
  ) {
    setInputs((currentInputs) => {
      const isValid = validator(enteredValue)

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
    <RegistrationContainer
      onNext={nextHandler}
      nextLabel="Registrieren"
      nextDisabled={!formValid()}
    >
      <InputControl
        label="E-Mail"
        invalid={
          inputs.email.isValid ? null : 'Gib eine gültige E-Mail-Adresse ein'
        }
        submitted={submitted}
        textInputConfig={{
          value: inputs.email.value,
          onChangeText: (email: string) =>
            inputChangedHandler('email', email, emailValid),
          keyboardType: 'email-address',
          autoCapitalize: 'none',
          autoCorrect: false,
        }}
      />
      <InputControl
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
            inputChangedHandler('password', password, passwordValid),
          autoCapitalize: 'none',
          autoCorrect: false,
          secureTextEntry: true,
        }}
      />
      <PasswordValidContainer password={inputs.password.value} />
    </RegistrationContainer>
  )
}

export default RegistrationCredentialsScreen
