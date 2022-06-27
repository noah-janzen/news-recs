import { Pressable, ScrollView, StyleSheet, View } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import { Ionicons } from '@expo/vector-icons'

import Button from '../../ui/Button'
import Container from '../../ui/StartScreens/Container'
import Title from '../../ui/Title'

export type Props = {
  onNext: () => void
  children: React.ReactNode
  nextDisabled?: boolean
}

function RegistrationContainer({ onNext, children, nextDisabled }: Props) {
  const navigation = useNavigation()

  function backHandler() {
    navigation.goBack()
  }

  return (
    <Container justifyContent="flex-start">
      <View style={styles.upperContainer}>
        <Pressable onPress={backHandler} style={styles.backButton}>
          <Ionicons name="arrow-back-outline" size={24} color="black" />
        </Pressable>
        <Title>Registrierung</Title>
        <View style={styles.childrenContainer}>{children}</View>
      </View>

      <Button disabled={nextDisabled} onPress={onNext}>
        Weiter
      </Button>
    </Container>
  )
}

export default RegistrationContainer

const styles = StyleSheet.create({
  upperContainer: {
    marginBottom: 18,
    flex: 1,
  },
  childrenContainer: {
    flex: 1,
  },
  backButton: {
    borderRadius: 100,
    padding: 12,
    marginLeft: -12,
    alignSelf: 'flex-start',
  },
})
