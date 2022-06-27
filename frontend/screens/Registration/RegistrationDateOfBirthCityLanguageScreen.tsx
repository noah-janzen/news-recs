import { NavigationProp, ParamListBase } from '@react-navigation/native'
import { useState } from 'react'
import { Text } from 'react-native'
import DatePicker from 'react-native-date-picker'
import Input from '../../components/ui/Input'

import RegistrationContainer from '../../components/ui/StartScreens/RegistrationContainer'

export type Props = {
  navigation: NavigationProp<ParamListBase>
}

function RegistrationDateOfBirthCityLanguageScreen({ navigation }: Props) {
  const [inputs, setInputs] = useState({
    dateOfBirth: {
      value: new Date(),
      isValid: false,
    },
    city: {
      value: '',
      isValid: false,
    },
    language: {
      value: null,
      isValid: false,
    },
  })
  const [submitted, setSubmitted] = useState(false)

  function inputChangedHandler(
    inputIdentifier: string,
    enteredValue: string | Date
  ) {
    setInputs((currentInputs) => {
      let isValid
      switch (inputIdentifier) {
        case 'dateOfBirth':
          isValid = false
          break
        case 'city':
          isValid = false
          break
        default:
          isValid: true
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
    return (
      inputs.dateOfBirth.isValid &&
      inputs.city.isValid &&
      inputs.language.isValid
    )
  }

  return (
    <RegistrationContainer onNext={nextHandler} nextDisabled={!formValid()}>
      <Input
        label="Stadt"
        invalid={inputs.city.isValid ? null : 'Gib eine Stadt ein'}
        submitted={submitted}
        textInputConfig={{
          value: inputs.city.value,
          onChangeText: (city: string) => inputChangedHandler('city', city),
          autoCorrect: false,
        }}
      />
    </RegistrationContainer>
  )
}

export default RegistrationDateOfBirthCityLanguageScreen
