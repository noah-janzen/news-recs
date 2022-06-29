import { useState } from 'react'
import { NavigationProp, ParamListBase } from '@react-navigation/native'

import SEXES from '../../util/sexes.json'
import { Gender } from '../../model/Gender'
import { registrationDateValid } from '../../util/Validation'
import ButtonInput from '../../components/ui/ButtonInput'
import DateInput from '../../components/ui/DateInput'
import RegistrationContainer from '../../components/ui/StartScreens/RegistrationContainer'

export type Props = {
  navigation: NavigationProp<ParamListBase>
}

function RegistrationPersonalDataScreen({ navigation }: Props) {
  const [inputs, setInputs] = useState<{
    dateOfBirth: {
      value: null | Date
      isValid: boolean
    }
    gender: {
      value: null | Gender
      isValid: boolean
    }
  }>({
    dateOfBirth: {
      value: null,
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
    enteredValue: any,
    validator: (enteredValue: any) => boolean
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

    navigation.navigate('RegistrationCredentialsScreen')
  }

  function formValid() {
    return inputs.dateOfBirth.isValid && inputs.gender.isValid
  }

  return (
    <RegistrationContainer onNext={nextHandler} nextDisabled={!formValid()}>
      <DateInput
        label="Geburtsdatum"
        invalid={
          inputs.dateOfBirth.isValid
            ? null
            : 'Gib ein gültiges Geburtsdatum ein. Du musst mindest 18 Jahre alt sein.'
        }
        submitted={submitted}
        onDateChanged={(dateOfBirth: Date) =>
          inputChangedHandler('dateOfBirth', dateOfBirth, registrationDateValid)
        }
      />

      <ButtonInput
        label="Geschlecht"
        submitted={submitted}
        onSelect={(gender: string) =>
          inputChangedHandler('gender', gender, (gender) => true)
        }
        activeElement={inputs.gender.value}
        errorLabel="Gib ein Geschlecht an"
        items={SEXES}
      />
    </RegistrationContainer>
  )
}

export default RegistrationPersonalDataScreen
