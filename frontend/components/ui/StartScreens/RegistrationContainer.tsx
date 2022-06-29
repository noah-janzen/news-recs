import { StyleSheet, View } from 'react-native'

import Button from '../../ui/Button'
import Container from '../../ui/StartScreens/Container'

export type Props = {
  onNext: () => void
  nextLabel?: string
  children: React.ReactNode
  nextDisabled?: boolean
}

function RegistrationContainer({
  onNext,
  nextLabel,
  children,
  nextDisabled,
}: Props) {
  return (
    <Container justifyContent="flex-start">
      <View style={styles.childrenContainer}>{children}</View>

      <View style={styles.buttonContainer}>
        <Button disabled={nextDisabled} onPress={onNext}>
          {nextLabel ?? 'Weiter'}
        </Button>
      </View>
    </Container>
  )
}

export default RegistrationContainer

const styles = StyleSheet.create({
  childrenContainer: {
    marginBottom: 18,
  },
  buttonContainer: {
    marginBottom: 12,
  },
})
