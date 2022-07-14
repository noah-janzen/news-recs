import { useState } from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { useDispatch } from 'react-redux'

import Button from '../../components/ui/Button'
import { logout } from '../../store/authSlice'
import { logout as logoutAPI } from '../../api/auth'

function AccountScreen() {
  const dispatch = useDispatch()
  const [isLoading, setIsLoading] = useState(false)

  async function logoutHandler() {
    setIsLoading(true)
    await logoutAPI()
    dispatch(logout())
  }

  return (
    <View style={styles.container}>
      <Text>Profile</Text>

      <Button onPress={logoutHandler} isLoading={isLoading}>
        Abmelden
      </Button>
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
