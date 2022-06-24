import { View, Pressable, Text } from 'react-native'

export type Props = {
  children: React.ReactNode
  onPress: () => void
}

function Button({ children, onPress }: Props) {
  return (
    <View>
      <Pressable onPress={onPress}>
        <View>
          <Text>{children}</Text>
        </View>
      </Pressable>
    </View>
  )
}

export default Button
