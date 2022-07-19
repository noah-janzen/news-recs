import { StatusBar } from 'expo-status-bar'
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { PersistGate } from 'redux-persist/integration/react'
import { Provider, useSelector } from 'react-redux'

import { StoreReducer } from './store/rootReducer'
import { store, persistor } from './store/store'

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
import i18n from './i18n'

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
    title: i18n.t('common.registrationHeaderTitle'),
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
        options={{
          ...registrationHeaderOptions,
          title: i18n.t('LoginScreen.headerTitle'),
        }}
      />
      <Stack.Screen
        name="ForgotPasswordScreen"
        component={ForgotPasswordScreen}
        options={{
          ...registrationHeaderOptions,
          title: i18n.t('ForgotPasswordScreen.headerTitle'),
        }}
      />
      <Stack.Screen
        name="ChangePasswordScreen"
        component={ChangePasswordScreen}
        options={{
          ...registrationHeaderOptions,
          title: i18n.t('ChangePasswordScreen.headerTitle'),
        }}
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
          title: i18n.t('ConfirmAccountScreen.headerTitle'),
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
          title: i18n.t('NewsFeedScreen.headerTitle'),
          headerRight: () => <ProfileHeaderIcon />,
        }}
      />
      <Stack.Screen
        name="AccountScreen"
        component={AccountScreen}
        options={{
          ...authenticatedHeaderOptions,
          title: i18n.t('AccountScreen.headerTitle'),
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
        <PersistGate loading={null} persistor={persistor}>
          <Navigation />
        </PersistGate>
      </Provider>
    </>
  )
}
