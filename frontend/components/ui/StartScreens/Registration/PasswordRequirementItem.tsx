import { StyleSheet, View, Text } from 'react-native'
import { FontAwesome } from '@expo/vector-icons'
import { GlobalStyles } from '../../../../constants/style'

export type Props = {
  label: string
  isValid: boolean
}

function PasswordRequirementItem({ label, isValid }: Props) {
  return (
    <View style={styles.container}>
      <FontAwesome
        name={isValid ? 'check-circle' : 'circle-o'}
        size={16}
        color={isValid ? GlobalStyles.colors.success : '#333'}
        style={styles.icon}
      />
      <Text style={styles.label}>{label}</Text>
    </View>
  )
}

export default PasswordRequirementItem

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 2,
  },
  icon: {
    marginRight: 6,
  },
  label: {
    fontFamily: 'Nunito_400Regular',
  },
})
