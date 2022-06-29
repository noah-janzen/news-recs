import { StyleSheet, Text } from 'react-native'

import { GlobalStyles } from '../../constants/style'

export type Props = {
  children: React.ReactNode
}

function ErrorLabel({ children }: Props) {
  return <Text style={styles.errorLabel}>{children}</Text>
}

export default ErrorLabel

const styles = StyleSheet.create({
  errorLabel: {
    color: GlobalStyles.colors.error,
    marginTop: 4,
    fontFamily: 'Nunito_400Regular',
  },
})
