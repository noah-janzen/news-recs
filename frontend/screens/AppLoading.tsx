import { ActivityIndicator, StyleSheet, View } from 'react-native'

function AppLoading() {
  return (
    <View style={styles.container}>
      <ActivityIndicator size="large" color="black" />
    </View>
  )
}

export default AppLoading

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
  },
})
