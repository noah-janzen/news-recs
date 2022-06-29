import { StatusBar } from 'expo-status-bar'
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { Provider } from 'react-redux'

import { store } from './store/store'

import {
  useFonts,
  Nunito_200ExtraLight,
  Nunito_300Light,
  Nunito_400Regular,
  Nunito_500Medium,
  Nunito_600SemiBold,
  Nunito_700Bold,
  Nunito_800ExtraBold,
  Nunito_900Black,
  Nunito_200ExtraLight_Italic,
  Nunito_300Light_Italic,
  Nunito_400Regular_Italic,
  Nunito_500Medium_Italic,
  Nunito_600SemiBold_Italic,
  Nunito_700Bold_Italic,
  Nunito_800ExtraBold_Italic,
  Nunito_900Black_Italic,
} from '@expo-google-fonts/nunito'
import {
  EncodeSans_100Thin,
  EncodeSans_200ExtraLight,
  EncodeSans_300Light,
  EncodeSans_400Regular,
  EncodeSans_500Medium,
  EncodeSans_600SemiBold,
  EncodeSans_700Bold,
  EncodeSans_800ExtraBold,
  EncodeSans_900Black,
} from '@expo-google-fonts/encode-sans'

import WelcomeScreen from './screens/WelcomeScreen'
import LoginScreen from './screens/LoginScreen'
import AppLoading from './screens/AppLoading'
import RegistrationCredentialsScreen from './screens/Registration/RegistrationCredentialsScreen'
import RegistrationPersonalDataScreen from './screens/Registration/RegistrationPersonalDataScreen'
import RegistrationLanguageScreen from './screens/Registration/RegistrationLanguageScreen'
import { GlobalStyles } from './constants/style'

const Stack = createNativeStackNavigator()

function StartScreensStack() {
  const registrationHeaderOptions = {
    animation: 'slide_from_right',
    title: 'Registrieren',
    headerTintColor: GlobalStyles.colors.primary900,
    headerBackTitleVisible: false,
    headerStyle: { backgroundColor: GlobalStyles.colors.bgTop },
    headerShadowVisible: false,
    // headerTransparent: true,
    headerTitleStyle: {
      fontFamily: 'EncodeSans_700Bold',
    },
  }
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="WelcomeScreen"
        component={WelcomeScreen}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen name="LoginScreen" component={LoginScreen} />
      <Stack.Screen
        name="RegistrationCredentialsScreen"
        component={RegistrationCredentialsScreen}
        options={{
          ...registrationHeaderOptions,
        }}
      />
      <Stack.Screen
        name="RegistrationPersonalDataScreen"
        component={RegistrationPersonalDataScreen}
        options={{
          ...registrationHeaderOptions,
        }}
      />
      <Stack.Screen
        name="RegistrationDateOfBirthScreen"
        component={RegistrationLanguageScreen}
        options={{
          ...registrationHeaderOptions,
        }}
      />
    </Stack.Navigator>
  )
}

function Navigation() {
  return (
    <NavigationContainer>
      <StartScreensStack />
    </NavigationContainer>
  )
}

export default function App() {
  let [fontsLoaded] = useFonts({
    Nunito_200ExtraLight,
    Nunito_300Light,
    Nunito_400Regular,
    Nunito_500Medium,
    Nunito_600SemiBold,
    Nunito_700Bold,
    Nunito_800ExtraBold,
    Nunito_900Black,
    Nunito_200ExtraLight_Italic,
    Nunito_300Light_Italic,
    Nunito_400Regular_Italic,
    Nunito_500Medium_Italic,
    Nunito_600SemiBold_Italic,
    Nunito_700Bold_Italic,
    Nunito_800ExtraBold_Italic,
    Nunito_900Black_Italic,
    EncodeSans_100Thin,
    EncodeSans_200ExtraLight,
    EncodeSans_300Light,
    EncodeSans_400Regular,
    EncodeSans_500Medium,
    EncodeSans_600SemiBold,
    EncodeSans_700Bold,
    EncodeSans_800ExtraBold,
    EncodeSans_900Black,
  })

  if (!fontsLoaded) {
    return <AppLoading />
  }

  return (
    <>
      <StatusBar style="auto" />
      <Provider store={store}>
        <Navigation />
      </Provider>
    </>
  )
}
