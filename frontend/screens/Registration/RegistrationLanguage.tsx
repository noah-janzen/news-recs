import { useState } from 'react'
import { NavigationProp, ParamListBase } from '@react-navigation/native'

import LANGUAGES from '../../util/languages.json'
import RegistrationContainer from '../../components/ui/StartScreens/RegistrationContainer'
import ButtonInput from '../../components/ui/ButtonInput'

export type Props = {
  navigation: NavigationProp<ParamListBase>
}

function RegistrationLanguageScreen({ navigation }: Props) {
  const [selectedLanguage, setSelectedLanguage] = useState<{
    value: null | string
    isValid: boolean
  }>({
    value: null,
    isValid: false,
  })
  const [submitted, setSubmitted] = useState(false)

  function nextHandler() {
    setSubmitted(true)
    if (!selectedLanguage.isValid) return

    navigation.navigate('RegistrationPersonalDataScreen')
  }

  return (
    <RegistrationContainer
      onNext={nextHandler}
      nextLabel="Weiter"
      nextDisabled={!selectedLanguage.isValid}
    >
      <ButtonInput
        label="Sprache"
        submitted={submitted}
        onSelect={(language: string) =>
          setSelectedLanguage({ value: language, isValid: true })
        }
        activeElement={selectedLanguage.value}
        errorLabel="Gib eine Sprache an"
        items={LANGUAGES}
      />
    </RegistrationContainer>
  )
}

export default RegistrationLanguageScreen
