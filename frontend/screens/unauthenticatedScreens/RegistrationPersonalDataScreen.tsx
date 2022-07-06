import { useState } from 'react'
import { NavigationProp, ParamListBase } from '@react-navigation/native'
import { useDispatch, useSelector } from 'react-redux'

import { DateEntered } from '../../model/DateEntered'
import GENDERS from '../../util/genders.json'
import { genderValid, registrationDateValid } from '../../util/Validation'
import { StoreReducer } from '../../store/store'
import { setValue } from '../../store/registrationSlice'
import ButtonInput from '../../components/ui/ButtonInput'
import ExpiryContainer from '../../components/ui/ExpiryContainer'
import DateInput from '../../components/ui/DateInput'

export type Props = {
  navigation: NavigationProp<ParamListBase>
}

function RegistrationPersonalDataScreen({ navigation }: Props) {
  const [submitted, setSubmitted] = useState(false)
  const dispatch = useDispatch()

  const dateOfBirth = useSelector(
    (state: StoreReducer) => state.registration.dateOfBirth
  )
  const gender = useSelector((state: StoreReducer) => state.registration.gender)

  function inputChangedHandler(inputIdentifier: string, enteredValue: any) {
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

    navigation.navigate('RegistrationCredentialsScreen')
  }

  function formValid() {
    return registrationDateValid(dateOfBirth) && genderValid(gender)
  }

  return (
    <ExpiryContainer onNext={nextHandler} nextDisabled={!formValid()}>
      <DateInput
        label="Geburtsdatum"
        onDateChanged={(date: DateEntered) =>
          inputChangedHandler('dateOfBirth', date)
        }
        initialDate={dateOfBirth}
        invalid={
          registrationDateValid(dateOfBirth)
            ? null
            : 'Gib ein gültiges Geburtsdatum ein. Du musst mindest 18 Jahre alt sein.'
        }
        submitted={submitted}
      />

      <ButtonInput
        label="Geschlecht"
        submitted={submitted}
        onSelect={(gender: string) => inputChangedHandler('gender', gender)}
        activeElement={gender}
        errorLabel="Gib ein Geschlecht an"
        items={GENDERS}
      />
    </ExpiryContainer>
  )
}

export default RegistrationPersonalDataScreen
