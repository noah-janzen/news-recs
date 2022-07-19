import { StyleSheet, View, Text } from 'react-native'

import { GlobalStyles } from '../../constants/style'
import i18n from '../../i18n'

function IntroText() {
  return (
    <View>
      <Text style={styles.introText}>
        {i18n.t('WelcomeScreen.introText.newsRecsRecommendsNews')}
      </Text>
      <Text style={styles.introText}>
        {i18n.t('WelcomeScreen.introText.newsRecsTracksUsageData')}
      </Text>
      <Text style={styles.introText}>
        {i18n.t('WelcomeScreen.introText.supportResearch')}
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
