import {
  View,
  Pressable,
  Text,
  StyleSheet,
  ViewStyle,
  Platform,
} from 'react-native'
import { GlobalStyles } from '../../constants/style'
import LoadingSpinner from './LoadingSpinner'

export type Props = {
  children: React.ReactNode
  onPress: () => void
  style?: ViewStyle
  outline?: boolean
  disabled?: boolean
  isLoading?: boolean
}

const isIOS = Platform.OS === 'ios'

function Button({
  children,
  onPress,
  style,
  outline,
  disabled,
  isLoading,
}: Props) {
  return (
    <View
      style={[
        styles.buttonOuterContainer,
        !isIOS && (outline ? styles.bgOutline : styles.bgFilled),
        style,
        (disabled || isLoading) && styles.disabled,
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
            styles.buttonInnerContainer,
            outline
              ? styles.buttonInnerContainerOutline
              : styles.buttonInnerContainerFilled,
            isIOS && (outline ? styles.bgOutline : styles.bgFilled),
          ]}
        >
          {isLoading && (
            <LoadingSpinner
              color={GlobalStyles.colors.primary300}
              style={{ marginVertical: -5, marginRight: 6 }}
            />
          )}
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
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  },
  buttonInnerContainerFilled: {
    paddingVertical: paddingVertical,
    paddingHorizontal: paddingHorizontal,
  },
  buttonInnerContainerOutline: {
    paddingVertical: paddingVertical - borderWidth,
    paddingHorizontal: paddingHorizontal - borderWidth,
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
