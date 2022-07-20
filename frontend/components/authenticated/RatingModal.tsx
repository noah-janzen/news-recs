import { useState } from 'react'
import { Modal, StyleSheet, Text, View } from 'react-native'
import { addInteraction } from '../../api/interaction'
import { GlobalStyles } from '../../constants/style'
import i18n from '../../i18n'
import ButtonInput from '../ui/ButtonInput'
import SmallButton from '../ui/SmallButton'

export type Props = {
  visible: boolean
  onClose: () => void
  onRated: () => void
  newsArticleId: string
  newsHeadline: string
}

const RATING_ITEMS = [
  {
    id: '-1',
    label: i18n.t('common.RatingModal.ratingItemLabels.no'),
  },
  {
    id: '0',
    label: i18n.t('common.RatingModal.ratingItemLabels.neutral'),
  },
  {
    id: '1',
    label: i18n.t('common.RatingModal.ratingItemLabels.yes'),
  },
]

function RatingModal({
  visible,
  onClose,
  newsArticleId,
  newsHeadline,
  onRated,
}: Props) {
  const [sentiment, setSentiment] = useState('')

  async function onSelectSentiment(sentimentId: string) {
    setSentiment(sentimentId)

    addInteraction({ newsArticleId: newsArticleId, rating: sentimentId })

    onRated()

    setTimeout(() => onClose(), 350)
  }

  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={visible}
      style={styles.modalContainer}
    >
      <View style={styles.outerContainer}>
        <View style={styles.innerContainer}>
          <Text style={styles.title}>{i18n.t('common.RatingModal.title')}</Text>
          <Text style={styles.headline}>{newsHeadline}</Text>
          <ButtonInput
            items={RATING_ITEMS}
            submitted={false}
            onSelect={onSelectSentiment}
            activeElement={sentiment}
          />
          <SmallButton style={styles.skipButton} onPress={onClose}>
            {i18n.t('common.RatingModal.skipButtonLabel')}
          </SmallButton>
        </View>
      </View>
    </Modal>
  )
}

export default RatingModal

const styles = StyleSheet.create({
  modalContainer: {
    justifyContent: 'flex-end',
    flex: 1,
  },
  outerContainer: {
    backgroundColor: 'rgba(0,0,0,.6)',
    flex: 1,
  },
  innerContainer: {
    paddingHorizontal: 12,
    paddingVertical: 16,
    marginTop: 'auto',
    width: 'auto',
    minHeight: 150,
    backgroundColor: 'white',
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
  },
  title: {
    fontFamily: 'Nunito_700Bold',
    fontSize: 18,
    textAlign: 'center',
    color: GlobalStyles.colors.primary700,
    marginBottom: 4,
  },
  headline: {
    fontFamily: 'Nunito_400Regular',
    fontSize: 14,
    color: '#555',
    textAlign: 'center',
    marginBottom: -12,
  },
  skipButton: {
    marginTop: 2,
  },
})
