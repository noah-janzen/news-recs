import { LinearGradient } from 'expo-linear-gradient'
import { SafeAreaView, View, StyleSheet, ScrollView } from 'react-native'

import AndroidSafeArea from '../../../constants/AndroidSafeArea'
import { GlobalStyles } from '../../../constants/style'

export type Props = {
  children: React.ReactNode
  justifyContent?: 'flex-end' | 'flex-start' | 'center' | 'space-between'
}

function Container({ children, justifyContent }: Props) {
  return (
    <LinearGradient
      colors={[GlobalStyles.colors.bgTop, GlobalStyles.colors.bgBottom]}
      style={styles.outerContainer}
    >
      {/* <ScrollView contentContainerStyle={{ flexGrow: 1 }}> */}
      <SafeAreaView style={AndroidSafeArea.AndroidSafeArea}>
        <View
          style={[styles.innerContainer, { justifyContent: justifyContent }]}
        >
          {children}
        </View>
      </SafeAreaView>
      {/* </ScrollView> */}
    </LinearGradient>
  )
}

export default Container

const styles = StyleSheet.create({
  outerContainer: {
    flex: 1,
  },
  innerContainer: {
    paddingHorizontal: 16,
    flex: 1,
  },
})
