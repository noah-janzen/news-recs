import {
  View,
  Text,
  Pressable,
  StyleSheet,
  StyleProp,
  ViewStyle,
} from 'react-native'

export type Props = {
  onPress: () => void
  children: React.ReactNode | string
  style: StyleProp<ViewStyle>
}

function SmallButton({ style, onPress, children }: Props) {
  return (
    <View style={[styles.container, style]}>
      <Pressable style={styles.pressable} onPress={onPress}>
        <Text style={styles.text}>{children}</Text>
      </Pressable>
    </View>
  )
}

export default SmallButton

const color = '#444'

const styles = StyleSheet.create({
  container: {
    padding: 3,
  },
  pressable: {},
  text: {
    color: color,
    textAlign: 'center',
    textDecorationStyle: 'solid',
    textDecorationColor: '#999',
    textDecorationLine: 'underline',
  },
})
