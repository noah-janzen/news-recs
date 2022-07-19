import { useState } from 'react'
import {
  NavigationProp,
  ParamListBase,
  RouteProp,
} from '@react-navigation/native'

import { emailValid } from '../../util/Validation'
import ExpiryContainer from '../../components/ui/ExpiryContainer'
import Input from '../../components/ui/Input'
import { Alert } from 'react-native'
import { forgotPassword } from '../../api/auth'
import i18n from '../../i18n'

export type Props = {
  route: RouteProp<{ params: { email: string; password?: string } }>
  navigation: NavigationProp<ParamListBase>
}

function ForgotPasswordScreen({ route, navigation }: Props) {
  const [isLoading, setIsLoading] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [email, setEmail] = useState(route?.params?.email ?? '')

  async function forgotPasswordHandler() {
    setIsSubmitted(true)
    if (!formValid()) return

    setIsLoading(true)
    try {
      await forgotPassword({ email })
      setIsLoading(false)
      navigation.navigate('ChangePasswordScreen', { email })
      Alert.alert(
        i18n.t('ForgotPasswordScreen.successAlert.title'),
        i18n.t('ForgotPasswordScreen.successAlert.description')
      )
    } catch (error) {
      const errorMessage = error.response.data.message
      // check if errorMessage is array or a simple string
      const alertMessage =
        typeof errorMessage === 'string' ? errorMessage : errorMessage[0]
      Alert.alert(
        i18n.t('ForgotPasswordScreen.errorAlert.title'),
        i18n.t(`ForgotPasswordScreen.errorAlert.${alertMessage}`)
      )
      setIsLoading(false)
    }
  }

  function formValid() {
    return emailValid(email)
  }

  return (
    <ExpiryContainer
      onNext={forgotPasswordHandler}
      loading={isLoading}
      nextDisabled={!formValid()}
      nextLabel={i18n.t('ForgotPasswordScreen.nextLabel')}
    >
      <Input
        label={i18n.t('ForgotPasswordScreen.emailInput.label')}
        invalid={
          emailValid(email)
            ? null
            : i18n.t('ForgotPasswordScreen.emailInput.errorLabel')
        }
        submitted={isSubmitted}
        textInputConfig={{
          value: email,
          onChangeText: setEmail,
          keyboardType: 'email-address',
          autoCapitalize: 'none',
          autoCorrect: false,
        }}
      />
    </ExpiryContainer>
  )
}

export default ForgotPasswordScreen
