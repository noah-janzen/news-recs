import { StyleSheet, Text, View } from 'react-native'
import { GlobalStyles } from '../../constants/style'

export type Props = {
  children: React.ReactNode
}

function Title({ children }: Props) {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>{children}</Text>
    </View>
  )
}

export default Title

const styles = StyleSheet.create({
  container: {
    marginVertical: 20,
  },
  text: {
    fontSize: 40,
    lineHeight: 40 * 1.025,
    color: GlobalStyles.colors.primary900,
    fontFamily: 'EncodeSans_700Bold',
  },
})
