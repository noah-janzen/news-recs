import { StyleSheet, View, Text } from 'react-native'

import { GlobalStyles } from '../../../constants/style'

function IntroText() {
  return (
    <View>
      <Text style={styles.introText}>
        NewsRecs empfielt Dir Nachrichten auf Basis von{' '}
        <Text style={styles.important}>Künstlicher Intelligenz</Text>.
      </Text>
      <Text style={styles.introText}>
        Die App sammelt im Rahmen der Forschung{' '}
        <Text style={styles.important}>Nutzungsdaten</Text>. Damit wollen wir
        die <Text style={styles.important}>Leistungsfähigkeit</Text>{' '}
        verschiedener Algorithmen vergleichen.
      </Text>
      <Text style={styles.introText}>
        Unterstütze die Forschung und erhalte{' '}
        <Text style={styles.important}>relevante Nachrichten</Text>.
      </Text>
    </View>
  )
}

export default IntroText

const styles = StyleSheet.create({
  introText: {
    fontSize: 16,
    lineHeight: 16 * 1.25,
    color: '#555',
    marginVertical: 3,
    fontFamily: 'Nunito_500Medium',
  },
  important: {
    color: GlobalStyles.colors.primary900,
    fontFamily: 'Nunito_700Bold',
  },
})
