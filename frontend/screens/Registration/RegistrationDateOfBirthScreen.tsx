import { NavigationProp, ParamListBase } from '@react-navigation/native'
import { useState } from 'react'
import { Text } from 'react-native'

import RegistrationContainer from '../../components/ui/StartScreens/RegistrationContainer'

export type Props = {
  navigation: NavigationProp<ParamListBase>
}

function RegistrationDateOfBirthScreen({ navigation }: Props) {
  const [inputs, setInputs] = useState({
    dateOfBirth: {
      value: new Date(),
      isValid: true,
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
        default:
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

    navigation.navigate('RegistrationPersonalDataScreen')
  }

  function formValid() {
    return inputs.dateOfBirth.isValid
  }

  return (
    <RegistrationContainer onNext={nextHandler} nextDisabled={!formValid()}>
      <Text>TBD</Text>
    </RegistrationContainer>
  )
}

export default RegistrationDateOfBirthScreen
