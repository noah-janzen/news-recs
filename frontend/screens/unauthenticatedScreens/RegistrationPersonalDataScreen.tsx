import { useState } from 'react'
import { NavigationProp, ParamListBase } from '@react-navigation/native'
import { useDispatch, useSelector } from 'react-redux'

import { DateEntered } from '../../model/DateEntered'
import { genderValid, registrationDateValid } from '../../util/Validation'
import { StoreReducer } from '../../store/rootReducer'
import { setValue } from '../../store/registrationSlice'
import ButtonInput from '../../components/ui/ButtonInput'
import ExpiryContainer from '../../components/ui/ExpiryContainer'
import DateInput from '../../components/ui/DateInput'
import i18n from '../../i18n'

const genders = [
  {
    label: i18n.t('common.GenderInput.maleLabel'),
    id: 'M',
  },
  {
    label: i18n.t('common.GenderInput.femaleLabel'),
    id: 'W',
  },
  {
    label: i18n.t('common.GenderInput.diversLabel'),
    id: 'D',
  },
]

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
        label={i18n.t('RegistrationPersonalDataScreen.dateOfBirthInput.label')}
        onDateChanged={(date: DateEntered) =>
          inputChangedHandler('dateOfBirth', date)
        }
        initialDate={dateOfBirth}
        invalid={
          registrationDateValid(dateOfBirth)
            ? null
            : i18n.t(
                'RegistrationPersonalDataScreen.dateOfBirthInput.errorLabel'
              )
        }
        submitted={submitted}
      />

      <ButtonInput
        label={i18n.t('RegistrationPersonalDataScreen.sexInput.label')}
        submitted={submitted}
        onSelect={(gender: string) => inputChangedHandler('gender', gender)}
        activeElement={gender}
        errorLabel={i18n.t(
          'RegistrationPersonalDataScreen.sexInput.errorLabel'
        )}
        items={genders}
      />
    </ExpiryContainer>
  )
}

export default RegistrationPersonalDataScreen
