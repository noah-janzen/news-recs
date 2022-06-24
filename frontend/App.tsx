import { StatusBar } from 'expo-status-bar'
import { SafeAreaView } from 'react-native'
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'

import WelcomeScreen from './screens/WelcomeScreen'
import LoginScreen from './screens/LoginScreen'
import RegistrationCredentialsScreen from './screens/Registration/RegistrationCredentialsScreen'
import RegistrationNameGenderScreen from './screens/Registration/RegistrationNameGenderScreen'
import RegistrationDateOfBirthCityLanguageScreen from './screens/Registration/RegistrationDateOfBirthCityLanguageScreen'

const Stack = createNativeStackNavigator()

function StartScreensStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="WelcomeScreen" component={WelcomeScreen} />

      <Stack.Screen name="LoginScreen" component={LoginScreen} />

      <Stack.Screen
        name="RegistrationCredentialsScreen"
        component={RegistrationCredentialsScreen}
      />
      <Stack.Screen
        name="RegistrationNameGenderScreen"
        component={RegistrationNameGenderScreen}
      />
      <Stack.Screen
        name="RegistrationDateOfBirthCityLanguageScreen"
        component={RegistrationDateOfBirthCityLanguageScreen}
      />
    </Stack.Navigator>
  )
}

function Navigation() {
  return (
    <NavigationContainer>
      <SafeAreaView style={{ flex: 1 }}>
        <StartScreensStack />
      </SafeAreaView>
    </NavigationContainer>
  )
}

export default function App() {
  return (
    <>
      <Navigation />
      <StatusBar style="auto" />
    </>
  )
}
