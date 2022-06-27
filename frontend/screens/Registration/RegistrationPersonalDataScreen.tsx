import { NavigationProp, ParamListBase } from '@react-navigation/native'
import { useState } from 'react'
import { Text } from 'react-native'
import Input from '../../components/ui/Input'
import ButtonInput from '../../components/ui/StartScreens/Registration/ButtonInput'
import GenderInput from '../../components/ui/StartScreens/Registration/GenderInput'

import RegistrationContainer from '../../components/ui/StartScreens/RegistrationContainer'
import { Gender } from '../../model/Gender'
import { cityValid, firstNameValid, lastNameValid } from '../../util/Validation'

export type Props = {
  navigation: NavigationProp<ParamListBase>
}
function RegistrationPersonalDataScreen({ navigation }: Props) {
  const [inputs, setInputs] = useState({
    firstName: {
      value: '',
      isValid: false,
    },
    lastName: {
      value: '',
      isValid: false,
    },
    city: {
      value: '',
      isValid: false,
    },
    gender: {
      value: null,
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
        case 'city':
          isValid = cityValid(enteredValue)
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

    navigation.navigate('RegistrationCredentialsScreen')
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
          autoCorrect: false,
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
          autoCorrect: false,
        }}
      />

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

      <ButtonInput
        label="Geschlecht"
        submitted={submitted}
        onSelect={(gender) => inputChangedHandler('gender', gender)}
        activeElement={inputs.gender.value}
        errorLabel="Gib ein Geschlecht an"
        items={[
          {
            label: 'männlich',
            id: 'M',
          },
          {
            label: 'weiblich',
            id: 'W',
          },
          {
            label: 'divers',
            id: 'D',
          },
        ]}
      />
      <ButtonInput
        label="Sprache"
        submitted={submitted}
        onSelect={(language) => inputChangedHandler('language', language)}
        activeElement={inputs.language.value}
        errorLabel="Gib eine Sprache an"
        items={[
          {
            label: 'Deutsch 🇩🇪',
            id: 'DE',
          },
          {
            label: 'English 🇬🇧',
            id: 'EN',
          },
        ]}
      />
    </RegistrationContainer>
  )
}

export default RegistrationPersonalDataScreen
