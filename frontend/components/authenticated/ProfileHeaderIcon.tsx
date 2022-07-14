import { Pressable, View } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import { Ionicons } from '@expo/vector-icons'

import { GlobalStyles } from '../../constants/style'

function ProfileHeaderIcon() {
  const navigation = useNavigation()

  function profileButtonClickedHandler() {
    navigation.navigate('AccountScreen')
  }

  return (
    <View>
      <Pressable onPress={profileButtonClickedHandler}>
        <Ionicons
          name="person-circle-outline"
          size={24}
          color={GlobalStyles.colors.primary900}
        />
      </Pressable>
    </View>
  )
}

export default ProfileHeaderIcon
