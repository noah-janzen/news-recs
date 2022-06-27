import {
  View,
  Pressable,
  Text,
  StyleSheet,
  ViewStyle,
  Platform,
} from 'react-native'
import { GlobalStyles } from '../../constants/style'

export type Props = {
  children: React.ReactNode
  onPress: () => void
  style?: ViewStyle
  outline?: boolean
  disabled?: boolean
}

const isIOS = Platform.OS === 'ios'

function Button({ children, onPress, style, outline, disabled }: Props) {
  return (
    <View
      style={[
        styles.buttonOuterContainer,
        !isIOS && (outline ? styles.bgOutline : styles.bgFilled),
        style,
        disabled && styles.disabled,
      ]}
    >
      <Pressable
        android_ripple={{
          color: outline ? '#bcd8e2' : '#222',
        }}
        style={({ pressed }) => [pressed && isIOS && styles.buttonPressed]}
        onPress={onPress}
      >
        <View
          style={[
            outline
              ? styles.buttonInnerContainerOutline
              : styles.buttonInnerContainer,
            isIOS && (outline ? styles.bgOutline : styles.bgFilled),
          ]}
        >
          <Text
            style={[styles.buttonText, outline && styles.buttonTextOutline]}
          >
            {children}
          </Text>
        </View>
      </Pressable>
    </View>
  )
}

export default Button

const borderRadius = 15
const borderWidth = 2

const paddingVertical = 14
const paddingHorizontal = 20

const styles = StyleSheet.create({
  buttonOuterContainer: {
    borderRadius: borderRadius,
    overflow: 'hidden',
  },
  buttonInnerContainer: {
    borderRadius: borderRadius,
    paddingVertical: paddingVertical,
    paddingHorizontal: paddingHorizontal,
  },
  buttonInnerContainerOutline: {
    paddingVertical: paddingVertical - borderWidth,
    paddingHorizontal: paddingHorizontal - borderWidth,
    borderRadius: borderRadius,
    borderWidth: borderWidth,
    borderColor: GlobalStyles.colors.primary800,
  },
  buttonText: {
    textAlign: 'center',
    color: 'white',
    fontSize: 15,
    fontFamily: 'EncodeSans_600SemiBold',
  },
  buttonTextOutline: {
    color: GlobalStyles.colors.primary800,
  },
  buttonPressed: {
    opacity: 0.75,
  },
  bgFilled: {
    backgroundColor: GlobalStyles.colors.primary900,
  },
  bgOutline: {
    backgroundColor: 'transparent',
  },
  disabled: {
    opacity: 0.5,
  },
})
