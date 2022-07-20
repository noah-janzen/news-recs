import { useState } from 'react'
import { NavigationProp, ParamListBase } from '@react-navigation/native'
import { useDispatch, useSelector } from 'react-redux'

import ExpiryContainer from '../../components/ui/ExpiryContainer'
import DateInput from '../../components/ui/DateInput'
import { setValue } from '../../store/registrationSlice'
import { StoreReducer } from '../../store/rootReducer'
import i18n from '../../i18n'
import { registrationDateValid } from '../../util/Validation'
import { DateEntered } from '../../model/DateEntered'

export type Props = {
  navigation: NavigationProp<ParamListBase>
}

function RegistrationDateOfBirthScreen({ navigation }: Props) {
  const [submitted, setSubmitted] = useState(false)
  const dispatch = useDispatch()

  const dateOfBirth = useSelector(
    (state: StoreReducer) => state.registration.dateOfBirth
  )

  function dateOfBirthChangedHandler(enteredDate: DateEntered) {
    dispatch(setValue({ identifier: 'dateOfBirth', value: enteredDate }))
  }

  function nextHandler() {
    setSubmitted(true)
    if (!registrationDateValid(dateOfBirth)) return

    navigation.navigate('RegistrationGenderScreen')
  }

  return (
    <ExpiryContainer
      onNext={nextHandler}
      nextLabel={i18n.t('RegistrationLanguageScreen.nextLabel')}
      nextDisabled={!registrationDateValid(dateOfBirth)}
    >
      <DateInput
        label={i18n.t('RegistrationPersonalDataScreen.dateOfBirthInput.label')}
        onDateChanged={dateOfBirthChangedHandler}
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
    </ExpiryContainer>
  )
}

export default RegistrationDateOfBirthScreen
