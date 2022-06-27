import { StyleSheet, Text } from 'react-native'

export type Props = {
  children: React.ReactNode
}

function InputLabel({ children }: Props) {
  return <Text style={styles.label}>{children}</Text>
}

export default InputLabel

const styles = StyleSheet.create({
  label: {
    marginBottom: 4,
    fontFamily: 'Nunito_700Bold',
  },
})
