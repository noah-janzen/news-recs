import { useEffect, useRef } from 'react'
import {
  Animated,
  ColorValue,
  Easing,
  StyleProp,
  StyleSheet,
  View,
  ViewStyle,
} from 'react-native'

// SOURCE: https://medium.com/easyfundraising-org-uk/how-to-create-a-simple-loading-animation-in-react-native-typescript-without-libraries-and-with-7257551cd243

export type Props = {
  color: ColorValue
  style?: StyleProp<ViewStyle>
  durationMs?: number
}

function startRotationAnimation(
  durationMs: number,
  rotationDegree: Animated.Value
): void {
  Animated.loop(
    Animated.timing(rotationDegree, {
      toValue: 360,
      duration: durationMs,
      easing: Easing.linear,
      useNativeDriver: false,
    })
  ).start()
}

function LoadingSpinner({ color, style, durationMs = 1000 }: Props) {
  const rotationDegree = useRef(new Animated.Value(0)).current

  useEffect(() => {
    startRotationAnimation(durationMs, rotationDegree)
  }, [rotationDegree])

  return (
    <View style={[styles.container, style]} accessibilityRole="progressbar">
      <View style={[styles.background, { borderColor: color }]}></View>
      <Animated.View
        style={[
          styles.progress,
          { borderColor: color },
          {
            transform: [
              {
                rotateZ: rotationDegree.interpolate({
                  inputRange: [0, 360],
                  outputRange: ['0deg', '360deg'],
                }),
              },
            ],
          },
        ]}
      />
    </View>
  )
}

export default LoadingSpinner

const size = 24

const styles = StyleSheet.create({
  container: {
    width: size,
    height: size,
    justifyContent: 'center',
    alignItems: 'center',
  },
  background: {
    width: '100%',
    height: '100%',
    borderRadius: size / 2,
    borderWidth: 4,
    opacity: 0.25,
  },
  progress: {
    width: '100%',
    height: '100%',
    borderRadius: size / 2,
    borderLeftColor: 'transparent',
    borderRightColor: 'transparent',
    borderBottomColor: 'transparent',
    borderWidth: 4,
    position: 'absolute',
  },
})
