import { StatusBar } from 'expo-status-bar'
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { Provider, useSelector } from 'react-redux'

import { store, StoreReducer } from './store/store'

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

import WelcomeScreen from './screens/unauthenticatedScreens/WelcomeScreen'
import LoginScreen from './screens/unauthenticatedScreens/LoginScreen'
import AppLoading from './screens/unauthenticatedScreens/AppLoading'
import RegistrationCredentialsScreen from './screens/unauthenticatedScreens/RegistrationCredentialsScreen'
import RegistrationPersonalDataScreen from './screens/unauthenticatedScreens/RegistrationPersonalDataScreen'
import RegistrationLanguageScreen from './screens/unauthenticatedScreens/RegistrationLanguageScreen'
import { GlobalStyles } from './constants/style'
import ConfirmAccountScreen from './screens/unauthenticatedScreens/ConfirmAccountScreen'
import NewsFeed from './screens/authenticatedScreens/NewsFeed'
import ForgotPasswordScreen from './screens/unauthenticatedScreens/ForgotPasswordScreen'
import ChangePasswordScreen from './screens/unauthenticatedScreens/ChangePasswordScreen'
import ProfileHeaderIcon from './components/authenticated/ProfileHeaderIcon'
import AccountScreen from './screens/authenticatedScreens/AccountScreen'

const Stack = createNativeStackNavigator()

const globalHeaderOptions = {
  headerTintColor: GlobalStyles.colors.primary900,
  headerStyle: { backgroundColor: GlobalStyles.colors.bgTop },
  headerTitleStyle: {
    fontFamily: 'EncodeSans_700Bold',
  },
}

function AuthStack() {
  const registrationHeaderOptions = {
    ...globalHeaderOptions,
    animation: 'slide_from_right',
    title: 'Registrieren',
    headerBackTitleVisible: false,
    headerShadowVisible: false,
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
      <Stack.Screen
        name="LoginScreen"
        component={LoginScreen}
        options={{ ...registrationHeaderOptions, title: 'Anmelden' }}
      />
      <Stack.Screen
        name="ForgotPasswordScreen"
        component={ForgotPasswordScreen}
        options={{ ...registrationHeaderOptions, title: 'Passwort vergessen' }}
      />
      <Stack.Screen
        name="ChangePasswordScreen"
        component={ChangePasswordScreen}
        options={{ ...registrationHeaderOptions, title: 'Passwort vergessen' }}
      />
      <Stack.Screen
        name="RegistrationLanguageScreen"
        component={RegistrationLanguageScreen}
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
        name="RegistrationCredentialsScreen"
        component={RegistrationCredentialsScreen}
        options={{
          ...registrationHeaderOptions,
        }}
      />
      <Stack.Screen
        name="ConfirmAccountScreen"
        component={ConfirmAccountScreen}
        options={{
          ...registrationHeaderOptions,
          title: 'Konto bestätigen',
        }}
      />
    </Stack.Navigator>
  )
}

function AuthenticatedStack() {
  const authenticatedHeaderOptions = {
    ...globalHeaderOptions,
  }

  return (
    <Stack.Navigator>
      <Stack.Screen
        name="NewsFeedScreen"
        component={NewsFeed}
        options={{
          ...authenticatedHeaderOptions,
          title: 'News',
          headerRight: () => <ProfileHeaderIcon />,
        }}
      />
      <Stack.Screen
        name="AccountScreen"
        component={AccountScreen}
        options={{
          ...authenticatedHeaderOptions,
          title: 'Account',
        }}
      />
    </Stack.Navigator>
  )
}

function Navigation() {
  const isAuthenticated = useSelector(
    (state: StoreReducer) => !!state.auth.tokens.access_token
  )

  return (
    <NavigationContainer>
      {isAuthenticated ? <AuthenticatedStack /> : <AuthStack />}
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
