import { StyleSheet, View } from 'react-native'
import { NavigationProp, ParamListBase } from '@react-navigation/native'
import i18n from '../../i18n'

import Button from '../../components/ui/Button'
import Title from '../../components/ui/Title'
import Container from '../../components/ui/Container'
import IntroText from '../../components/unauthenticated/IntroText'

export type Props = {
  navigation: NavigationProp<ParamListBase>
}

function WelcomeScreen({ navigation }: Props) {
  function loginClickHandler() {
    navigation.navigate('LoginScreen')
  }

  function registerClickHandler() {
    navigation.navigate('RegistrationLanguageScreen')
  }

  return (
    <Container justifyContent="flex-end">
      <View style={styles.introContainer}>
        <Title>{i18n.t('WelcomeScreen.welcomeTitle')}</Title>
        <IntroText />
      </View>

      <View style={styles.buttonsContainer}>
        <Button
          onPress={registerClickHandler}
          style={styles.registerButton}
          outline
        >
          {i18n.t('WelcomeScreen.signUpButtonLabel')}
        </Button>
        <Button onPress={loginClickHandler}>
          {i18n.t('WelcomeScreen.signInButtonLabel')}
        </Button>
      </View>
    </Container>
  )
}

export default WelcomeScreen

const styles = StyleSheet.create({
  introContainer: {
    marginTop: 48,
  },
  buttonsContainer: {
    marginTop: 48,
    marginBottom: 12,
  },
  registerButton: {
    marginBottom: 12,
  },
})
