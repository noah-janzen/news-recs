import { useState } from 'react'
import {
  NavigationProp,
  ParamListBase,
  RouteProp,
} from '@react-navigation/native'
import { Alert, StyleSheet, Text, View } from 'react-native'
import { Feather } from '@expo/vector-icons'

import ExpiryContainer from '../../components/ui/ExpiryContainer'
import Input from '../../components/ui/Input'
import { GlobalStyles } from '../../constants/style'
import { tokenValid } from '../../util/Validation'
import { confirmUser, renewConfirmationToken } from '../../api/auth'
import SmallButton from '../../components/ui/SmallButton'
import i18n from '../../i18n'

export type Props = {
  route: RouteProp<{ params: { email: string; password?: string } }>
  navigation: NavigationProp<ParamListBase>
}

function ConfirmAccountScreen({ route, navigation }: Props) {
  const [token, setToken] = useState('')
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  async function nextHandler() {
    setIsSubmitted(true)
    if (!tokenValid(token)) return

    setIsLoading(true)
    try {
      const email = route.params.email
      await confirmUser({ email, token })

      const password = route.params?.password
      navigation.navigate('LoginScreen', {
        email,
        password,
      })
      Alert.alert(
        i18n.t('ConfirmAccountScreen.successAlert.title'),
        i18n.t('ConfirmAccountScreen.successAlert.description')
      )
    } catch (error: any) {
      const errorMessage = error.response.data.message
      // check if errorMessage is array or a simple string
      const alertMessage =
        typeof errorMessage === 'string'
          ? errorMessage
          : errorMessage.join('. ')
      Alert.alert(
        i18n.t('ConfirmAccountScreen.errorAlert.title'),
        i18n.t(`ConfirmAccountScreen.errorAlert.${alertMessage}`)
      )
      setIsLoading(false)
    }
  }

  async function renewConfirmationTokenHandler() {
    const hasCredentials = route.params.email && route.params.password

    if (!hasCredentials) {
      return navigation.navigate('LoginScreen')
    }

    await renewConfirmationToken({
      email: route.params.email,
      password: route.params.password,
    })

    Alert.alert(
      i18n.t('ConfirmAccountScreen.renewConfirmationTokenSuccessAlert.title'),
      i18n.t(
        'ConfirmAccountScreen.renewConfirmationTokenSuccessAlert.description'
      )
    )
  }

  return (
    <ExpiryContainer
      onNext={nextHandler}
      nextLabel={i18n.t('ConfirmAccountScreen.nextLabel')}
      nextDisabled={!tokenValid(token)}
      loading={isLoading}
    >
      <View style={styles.successContainer}>
        <Feather
          name="check-circle"
          size={60}
          color={GlobalStyles.colors.primary900}
        />
        <Text style={styles.successTitle}>
          {i18n.t('ConfirmAccountScreen.confirmationSuccessfulContainer.title')}
        </Text>
        <Text style={styles.successText}>
          {i18n.t(
            'ConfirmAccountScreen.confirmationSuccessfulContainer.description'
          )}
        </Text>
      </View>

      <Input
        label={i18n.t('ConfirmAccountScreen.tokenInput.label')}
        invalid={
          tokenValid(token)
            ? null
            : i18n.t('ConfirmAccountScreen.tokenInput.errorLabel')
        }
        submitted={isSubmitted}
        textInputConfig={{
          value: token,
          onChangeText: setToken,
          keyboardType: 'number-pad',
          placeholder: '000000',
          maxLength: 6,
        }}
      />

      <SmallButton
        style={{ marginBottom: -10, marginTop: 10 }}
        onPress={renewConfirmationTokenHandler}
      >
        {i18n.t('ConfirmAccountScreen.sendNewCodeButtonLabel')}
      </SmallButton>
    </ExpiryContainer>
  )
}

export default ConfirmAccountScreen

const styles = StyleSheet.create({
  successContainer: {
    alignItems: 'center',
    marginBottom: 18,
    backgroundColor: 'white',
    borderRadius: 8,
    paddingVertical: 16,
    paddingHorizontal: 12,
    elevation: 4,
    shadowColor: 'black',
    shadowOpacity: 0.15,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
  },
  successTitle: {
    textAlign: 'center',
    marginTop: 6,
    color: GlobalStyles.colors.primary900,
    fontFamily: 'Nunito_700Bold',
    fontSize: 18,
  },
  successText: {
    textAlign: 'center',
    marginTop: 4,
    fontFamily: 'Nunito_400Regular',
  },
})
