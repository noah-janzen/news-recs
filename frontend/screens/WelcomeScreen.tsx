import { Text, View } from 'react-native'
import { NavigationProp, ParamListBase } from '@react-navigation/native'

import Button from '../components/ui/Button'

export type Props = {
  navigation: NavigationProp<ParamListBase>
}

function WelcomeScreen({ navigation }: Props) {
  function loginClickHandler() {
    navigation.navigate('LoginScreen')
  }

  function registerClickHandler() {
    navigation.navigate('RegistrationCredentialsScreen')
  }

  return (
    <View>
      <Text>Willkommen bei NewsRecs.</Text>

      <Text>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Beatae
        blanditiis qui possimus expedita consequuntur officiis dicta unde quis,
        dolorem corporis aperiam, libero vitae id, architecto perspiciatis
        repellendus repudiandae nobis at!
      </Text>

      <View>
        <Button onPress={loginClickHandler}>Anmelden</Button>
        <Button onPress={registerClickHandler}>Registrieren</Button>
      </View>
    </View>
  )
}

export default WelcomeScreen
