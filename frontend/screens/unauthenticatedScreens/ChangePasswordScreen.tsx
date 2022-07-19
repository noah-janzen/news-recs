import { useState } from 'react'
import {
  NavigationProp,
  ParamListBase,
  RouteProp,
} from '@react-navigation/native'

import { passwordValid, tokenValid } from '../../util/Validation'
import ExpiryContainer from '../../components/ui/ExpiryContainer'
import Input from '../../components/ui/Input'
import PasswordValidContainer from '../../components/unauthenticated/PasswordValidContainer'
import { changePassword } from '../../api/auth'
import { Alert } from 'react-native'
import i18n from '../../i18n'

export type Props = {
  route: RouteProp<{ params: { email: string } }>
  navigation: NavigationProp<ParamListBase>
}

function ChangePasswordScreen({ route, navigation }: Props) {
  const [isLoading, setIsLoading] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [passwordChangeToken, setPasswordChangeToken] = useState('')
  const [newPassword, setNewPassword] = useState('')
  const email = route?.params?.email

  async function changePasswordHandler() {
    setIsSubmitted(true)
    if (!formValid()) return

    setIsLoading(true)
    try {
      await changePassword({
        email,
        newPassword,
        passwordChangeToken: passwordChangeToken,
      })
      setIsLoading(false)
      navigation.navigate('LoginScreen')
      Alert.alert(
        i18n.t('ChangePasswordScreen.successAlert.title'),
        i18n.t('ChangePasswordScreen.successAlert.description')
      )
    } catch (error: any) {
      // TODO: Typescript typing
      const errorMessage = error.response.data.message
      // check if errorMessage is array or a simple string
      const alertMessage =
        typeof errorMessage === 'string'
          ? errorMessage
          : errorMessage.join('. ')
      Alert.alert(
        i18n.t('ChangePasswordScreen.errorAlert.title'),
        i18n.t(`ChangePasswordScreen.errorAlert.${alertMessage}`)
      )
      setIsLoading(false)
    }
  }

  function formValid() {
    return (
      tokenValid(passwordChangeToken) && email && passwordValid(newPassword)
    )
  }

  return (
    <ExpiryContainer
      onNext={changePasswordHandler}
      loading={isLoading}
      nextDisabled={!formValid()}
      nextLabel={i18n.t('ChangePasswordScreen.nextLabel')}
    >
      <Input
        label={i18n.t('ChangePasswordScreen.codeInput.label')}
        invalid={
          tokenValid(passwordChangeToken)
            ? null
            : i18n.t('ChangePasswordScreen.codeInput.errorLabel')
        }
        submitted={isSubmitted}
        textInputConfig={{
          value: passwordChangeToken,
          onChangeText: setPasswordChangeToken,
          keyboardType: 'number-pad',
          placeholder: '000000',
          maxLength: 6,
        }}
      />

      <Input
        label={i18n.t('ChangePasswordScreen.passwordInput.label')}
        invalid={
          passwordValid(newPassword)
            ? null
            : i18n.t('ChangePasswordScreen.passwordInput.errorLabel')
        }
        submitted={isSubmitted}
        textInputConfig={{
          value: newPassword,
          onChangeText: setNewPassword,
          autoCapitalize: 'none',
          autoCorrect: false,
          secureTextEntry: true,
        }}
      />
      <PasswordValidContainer password={newPassword} />
    </ExpiryContainer>
  )
}

export default ChangePasswordScreen
