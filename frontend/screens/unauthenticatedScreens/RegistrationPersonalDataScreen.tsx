import { useState } from 'react'
import { NavigationProp, ParamListBase } from '@react-navigation/native'
import { useDispatch, useSelector } from 'react-redux'

import { genderValid } from '../../util/Validation'
import { StoreReducer } from '../../store/rootReducer'
import { setValue } from '../../store/registrationSlice'
import ButtonInput from '../../components/ui/ButtonInput'
import ExpiryContainer from '../../components/ui/ExpiryContainer'
import i18n from '../../i18n'
import { GENDERS } from '../../util/Gender'

export type Props = {
  navigation: NavigationProp<ParamListBase>
}

function RegistrationPersonalDataScreen({ navigation }: Props) {
  const [submitted, setSubmitted] = useState(false)
  const dispatch = useDispatch()

  const gender = useSelector((state: StoreReducer) => state.registration.gender)

  function genderChangedHandler(selectedGender: string) {
    dispatch(
      setValue({
        identifier: 'gender',
        value: selectedGender,
      })
    )
  }

  function nextHandler() {
    setSubmitted(true)
    if (!genderValid(gender)) return

    navigation.navigate('RegistrationCredentialsScreen')
  }

  return (
    <ExpiryContainer onNext={nextHandler} nextDisabled={!genderValid(gender)}>
      <ButtonInput
        label={i18n.t('RegistrationPersonalDataScreen.sexInput.label')}
        submitted={submitted}
        onSelect={genderChangedHandler}
        activeElement={gender}
        errorLabel={i18n.t(
          'RegistrationPersonalDataScreen.sexInput.errorLabel'
        )}
        items={GENDERS}
      />
    </ExpiryContainer>
  )
}

export default RegistrationPersonalDataScreen
