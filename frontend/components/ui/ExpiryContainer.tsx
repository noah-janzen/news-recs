import { StyleSheet, View } from 'react-native'

import Button from '../ui/Button'
import Container from './Container'

export type Props = {
  onNext: () => void
  nextLabel?: string
  children: React.ReactNode
  nextDisabled?: boolean
  loading?: boolean
}

function ExpiryContainer({
  onNext,
  nextLabel,
  children,
  nextDisabled,
  loading,
}: Props) {
  return (
    <Container justifyContent="flex-start">
      <View style={styles.childrenContainer}>{children}</View>

      <View style={styles.buttonContainer}>
        <Button disabled={nextDisabled} onPress={onNext} isLoading={loading}>
          {nextLabel ?? 'Weiter'}
        </Button>
      </View>
    </Container>
  )
}

export default ExpiryContainer

const styles = StyleSheet.create({
  childrenContainer: {
    marginBottom: 18,
  },
  buttonContainer: {
    marginBottom: 12,
  },
})
