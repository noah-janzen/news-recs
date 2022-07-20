import { useEffect, useState } from 'react'
import { View, StyleSheet, ActivityIndicator, Alert } from 'react-native'
import { useDispatch } from 'react-redux'

import SmallButton from '../../components/ui/SmallButton'
import ButtonInput from '../../components/ui/ButtonInput'
import Input from '../../components/ui/Input'
import { logout } from '../../store/authSlice'
import { logout as logoutAPI } from '../../api/auth'
import i18n from '../../i18n'
import DateInput from '../../components/ui/DateInput'
import {
  dateValid,
  emailValid,
  genderValid,
  registrationDateValid,
} from '../../util/Validation'
import { GENDERS } from '../../util/Gender'
import { DateEntered } from '../../model/DateEntered'
import Button from '../../components/ui/Button'
import { getOwnUser, updateOwnUser } from '../../api/user'
import { dateToDateEntered, parseDate } from '../../util/Date'
import { UserUpdateDto } from '../../model/dto/UserUpdate.dto'
import { User } from '../../model/dto/User.dto'
import { clearInteractions } from '../../store/interactionsSlice'

function AccountScreen() {
  interface UserForm {
    dateOfBirth: DateEntered
    gender: string
    email: string
  }

  const dispatch = useDispatch()
  const [isLoading, setIsLoading] = useState(false)
  const [user, setUser] = useState<User>()
  const [userForm, setUserForm] = useState<UserForm>()

  useEffect(() => {
    async function fetchUser() {
      const fetchedUser = await getOwnUser()
      setUser(fetchedUser)
    }

    fetchUser()
  }, [])

  useEffect(() => {
    if (!user) return

    setUserForm({
      dateOfBirth: dateToDateEntered(new Date(user!.dateOfBirth)),
      gender: user!.gender,
      email: user!.email,
    })
  }, [user])

  function formValid() {
    if (!userForm) return false

    return (
      registrationDateValid(userForm!.dateOfBirth) &&
      genderValid(userForm!.gender) &&
      emailValid(userForm!.email)
    )
  }

  async function saveChangesHandler() {
    if (!formValid()) return

    setIsLoading(true)
    const userUpdate: UserUpdateDto = {
      dateOfBirth: parseDate(userForm!.dateOfBirth),
      gender: userForm!.gender,
      email: userForm!.email,
    }

    try {
      const fetchedUser = await updateOwnUser(userUpdate)
      setUser(fetchedUser)

      Alert.alert(
        i18n.t('AccountScreen.successAlert.title'),
        i18n.t('AccountScreen.successAlert.description')
      )
    } catch (error: any) {
      const errorMessage = error.response.data.message
      // check if errorMessage is array or a simple string
      const alertMessage =
        typeof errorMessage === 'string'
          ? errorMessage
          : errorMessage.join('. ')
      Alert.alert(
        i18n.t('AccountScreen.errorAlert.title'),
        i18n.t(`AccountScreen.errorAlert.${alertMessage}`)
      )
    } finally {
      setIsLoading(false)
    }
  }

  async function logoutHandler() {
    await logoutAPI()
    dispatch(clearInteractions())
    dispatch(logout())
  }

  if (!userForm) {
    return (
      <View style={{ alignItems: 'center', marginTop: 18, marginBottom: 30 }}>
        <ActivityIndicator />
      </View>
    )
  }

  return (
    <View style={styles.container}>
      <View>
        <DateInput
          label={i18n.t('AccountScreen.inputs.dateOfBirth.label')}
          onDateChanged={(enteredDate) =>
            setUserForm((user) => ({
              ...user,
              dateOfBirth: enteredDate,
            }))
          }
          initialDate={userForm.dateOfBirth}
          invalid={
            registrationDateValid(userForm.dateOfBirth)
              ? null
              : i18n.t('AccountScreen.inputs.dateOfBirth.errorLabel')
          }
          submitted={true}
        />

        <ButtonInput
          label={i18n.t('AccountScreen.inputs.sex.label')}
          submitted={true}
          onSelect={(gender) =>
            setUserForm((user) => ({
              ...user,
              gender: gender,
            }))
          }
          activeElement={userForm.gender}
          errorLabel={i18n.t('AccountScreen.inputs.sex.errorLabel')}
          items={GENDERS}
        />

        <Input
          label={i18n.t('AccountScreen.inputs.email.label')}
          invalid={
            emailValid(userForm.email)
              ? null
              : i18n.t('AccountScreen.inputs.email.errorLabel')
          }
          submitted={true}
          textInputConfig={{
            value: userForm.email,
            onChangeText: (email: string) =>
              setUserForm((user) => ({
                ...user,
                email: email,
              })),
            keyboardType: 'email-address',
            autoCapitalize: 'none',
            autoCorrect: false,
          }}
        />
      </View>
      <View style={{ marginTop: 12 }}>
        <Button
          onPress={saveChangesHandler}
          isLoading={isLoading}
          disabled={isLoading}
        >
          {i18n.t('AccountScreen.saveChangesButtonLabel')}
        </Button>
        <SmallButton onPress={logoutHandler} style={{ marginVertical: 12 }}>
          {i18n.t('AccountScreen.logoutButtonLabel')}
        </SmallButton>
      </View>
    </View>
  )
}

export default AccountScreen

const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: 12,
  },
})
