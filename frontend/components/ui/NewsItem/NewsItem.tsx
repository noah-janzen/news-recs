import {
  Image,
  View,
  Text,
  StyleSheet,
  Pressable,
  Platform,
} from 'react-native'
import * as WebBrowser from 'expo-web-browser'

import { NewsDto } from '../../../model/dto/News.dto'
import { getTimeInterval } from '../../../util/Date'

function formatSourceOrganization(sourceOrganization: string) {
  function capitalizeFirstLetter(sourceOrganization: string) {
    return (
      sourceOrganization.charAt(0).toUpperCase() + sourceOrganization.slice(1)
    )
  }

  const words = sourceOrganization.split('-')

  return words.map((word) => capitalizeFirstLetter(word)).join(' ')
}

const isIOS = Platform.OS === 'ios'

function NewsItem({
  id,
  headline,
  abstract,
  datePublished,
  image,
  sourceOrganization,
  url,
}: NewsDto) {
  function openNewsArticleHandler() {
    // TODO: Store user interaction
    WebBrowser.openBrowserAsync(url)
  }

  return (
    <View style={styles.container}>
      <Pressable
        onPress={openNewsArticleHandler}
        style={({ pressed }) => [
          styles.pressableContainer,
          pressed && isIOS && styles.pressed,
        ]}
        android_ripple={{
          color: '#ccc',
        }}
      >
        {!!image && <Image style={styles.image} source={{ uri: image }} />}
        <View style={styles.innerContainer}>
          <Text numberOfLines={2} ellipsizeMode="tail" style={styles.headline}>
            {headline}
          </Text>

          <View style={styles.metaContainer}>
            <Text style={styles.metaText}>
              {getTimeInterval(new Date(datePublished))}
            </Text>
            <Text style={[styles.metaText, styles.separator]}> ● </Text>
            <Text style={styles.metaText}>
              {formatSourceOrganization(sourceOrganization)}
            </Text>
          </View>
        </View>
      </Pressable>
    </View>
  )
}

export default NewsItem

const styles = StyleSheet.create({
  container: {
    marginTop: 12,
    marginHorizontal: 12,

    borderRadius: 8,
    overflow: 'hidden',
  },
  pressableContainer: {
    backgroundColor: 'white',
  },
  pressed: {
    opacity: 0.75,
  },
  image: {
    width: '100%',
    height: 120,
  },
  innerContainer: {
    padding: 12,
  },
  headline: {
    fontFamily: 'Nunito_700Bold',
    fontSize: 16,
    lineHeight: 16 * 1.15,
  },
  metaContainer: {
    flexDirection: 'row',
    marginTop: 8,
    alignItems: 'center',
  },
  metaText: {
    fontFamily: 'Nunito_500Medium',
    color: '#666',
    fontSize: 12,
    lineHeight: 13,
  },
  separator: {
    fontSize: 6,
    lineHeight: 6,
    marginHorizontal: 2,
  },
})
