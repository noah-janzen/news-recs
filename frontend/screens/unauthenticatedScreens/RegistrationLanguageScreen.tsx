import { useState } from 'react'
import { NavigationProp, ParamListBase } from '@react-navigation/native'
import { useDispatch, useSelector } from 'react-redux'

import ExpiryContainer from '../../components/ui/ExpiryContainer'
import ButtonInput from '../../components/ui/ButtonInput'
import { setValue } from '../../store/registrationSlice'
import { StoreReducer } from '../../store/rootReducer'
import { languageValid } from '../../util/Validation'
import i18n from '../../i18n'

const languages = [
  {
    label: i18n.t('RegistrationLanguageScreen.inputValues.DE'),
    id: 'DE',
  },
  {
    label: i18n.t('RegistrationLanguageScreen.inputValues.EN'),
    id: 'EN',
  },
]

export type Props = {
  navigation: NavigationProp<ParamListBase>
}

function RegistrationLanguageScreen({ navigation }: Props) {
  const [submitted, setSubmitted] = useState(false)
  const dispatch = useDispatch()

  const selectedLanguage = useSelector(
    (state: StoreReducer) => state.registration.language
  )

  function languageChangedHandler(language: string) {
    dispatch(setValue({ identifier: 'language', value: language }))
  }

  function nextHandler() {
    setSubmitted(true)
    if (!languageValid(selectedLanguage)) return

    navigation.navigate('RegistrationPersonalDataScreen')
  }

  return (
    <ExpiryContainer
      onNext={nextHandler}
      nextLabel={i18n.t('RegistrationLanguageScreen.nextLabel')}
      nextDisabled={!languageValid(selectedLanguage)}
    >
      <ButtonInput
        label={i18n.t('RegistrationLanguageScreen.inputLabel')}
        submitted={submitted}
        onSelect={languageChangedHandler}
        activeElement={selectedLanguage}
        errorLabel={i18n.t('RegistrationLanguageScreen.errorLabel')}
        items={languages}
      />
    </ExpiryContainer>
  )
}

export default RegistrationLanguageScreen
