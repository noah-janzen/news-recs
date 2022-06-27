import { NavigationProp, ParamListBase } from '@react-navigation/native'
import { useState } from 'react'
import { Text } from 'react-native'
import Input from '../../components/ui/Input'
import GenderInput from '../../components/ui/StartScreens/Registration/GenderInput'

import RegistrationContainer from '../../components/ui/StartScreens/RegistrationContainer'
import { Gender } from '../../model/Gender'
import { firstNameValid, lastNameValid } from '../../util/Validation'

export type Props = {
  navigation: NavigationProp<ParamListBase>
}
function RegistrationNameGenderScreen({ navigation }: Props) {
  const [inputs, setInputs] = useState({
    firstName: {
      value: '',
      isValid: false,
    },
    lastName: {
      value: '',
      isValid: false,
    },
    gender: {
      value: null,
      isValid: false,
    },
  })
  const [submitted, setSubmitted] = useState(false)

  function inputChangedHandler(
    inputIdentifier: string,
    enteredValue: string | Gender
  ) {
    setInputs((currentInputs) => {
      let isValid
      switch (inputIdentifier) {
        case 'firstName':
          isValid = firstNameValid(enteredValue)
          break
        case 'lastName':
          isValid = lastNameValid(enteredValue)
          break
        default:
          isValid = true
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

    navigation.navigate('RegistrationDateOfBirthCityLanguageScreen')
  }

  function formValid() {
    return (
      inputs.firstName.isValid &&
      inputs.lastName.isValid &&
      inputs.gender.isValid
    )
  }

  return (
    <RegistrationContainer onNext={nextHandler} nextDisabled={!formValid()}>
      <Input
        label="Vorname"
        invalid={inputs.firstName.isValid ? null : 'Gib einen Vornamen ein'}
        submitted={submitted}
        textInputConfig={{
          value: inputs.firstName.value,
          onChangeText: (firstName: string) =>
            inputChangedHandler('firstName', firstName),
          autoCapitalize: 'none',
        }}
      />
      <Input
        label="Nachname"
        invalid={inputs.lastName.isValid ? null : 'Gib einen Nachnamen ein'}
        submitted={submitted}
        textInputConfig={{
          value: inputs.lastName.value,
          onChangeText: (lastName: string) =>
            inputChangedHandler('lastName', lastName),
          autoCapitalize: 'none',
        }}
      />
      <GenderInput
        gender={inputs.gender.value}
        onEnterGender={(gender) => inputChangedHandler('gender', gender)}
        submitted={submitted}
      />
    </RegistrationContainer>
  )
}

export default RegistrationNameGenderScreen
