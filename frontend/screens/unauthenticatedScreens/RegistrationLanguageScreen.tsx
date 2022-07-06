import { useState } from 'react'
import { NavigationProp, ParamListBase } from '@react-navigation/native'
import { useDispatch, useSelector } from 'react-redux'

import LANGUAGES from '../../util/languages.json'
import ExpiryContainer from '../../components/ui/ExpiryContainer'
import ButtonInput from '../../components/ui/ButtonInput'
import { setValue } from '../../store/registrationSlice'
import { StoreReducer } from '../../store/store'
import { languageValid } from '../../util/Validation'

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
      nextLabel="Weiter"
      nextDisabled={!languageValid(selectedLanguage)}
    >
      <ButtonInput
        label="Sprache"
        submitted={submitted}
        onSelect={languageChangedHandler}
        activeElement={selectedLanguage}
        errorLabel="Gib eine Sprache an"
        items={LANGUAGES}
      />
    </ExpiryContainer>
  )
}

export default RegistrationLanguageScreen
