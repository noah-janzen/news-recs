import { useState } from 'react'
import {
  Modal,
  StyleSheet,
  Text,
  View,
  KeyboardAvoidingView,
} from 'react-native'

import { addInteraction } from '../../api/interaction'
import { GlobalStyles } from '../../constants/style'
import i18n from '../../i18n'
import BinaryControl from '../ui/ratingControls/BinaryControl'
import RangeControl from '../ui/ratingControls/RangeControl'
import TextControl from '../ui/ratingControls/TextControl'
import SmallButton from '../ui/SmallButton'

export type Props = {
  visible: boolean
  onClose: () => void
  onRated: () => void
  newsArticleId: string
  newsHeadline: string
  ratingControlType: 'binary' | 'range' | 'text'
}

function RatingModal({
  visible,
  onClose,
  newsArticleId,
  newsHeadline,
  onRated,
  ratingControlType,
}: Props) {
  const [rating, setRating] = useState<any>()

  async function rateHandler(rating: any) {
    setRating(rating)
    addInteraction({ newsArticleId, rating, ratingControlType })
    onRated()
    setTimeout(() => onClose(), 350)
  }

  let ratingControl
  switch (ratingControlType) {
    case 'binary':
      ratingControl = (
        <BinaryControl
          onRate={rateHandler}
          rating={rating}
          leftLabel={i18n.t(
            'common.RatingModal.ratingItemLabels.binary.notInteresting'
          )}
          rightLabel={i18n.t(
            'common.RatingModal.ratingItemLabels.binary.interesting'
          )}
        />
      )
      break
    case 'range':
      ratingControl = (
        <RangeControl
          onRate={rateHandler}
          leftLabel={i18n.t(
            'common.RatingModal.ratingItemLabels.range.leftLabel'
          )}
          rightLabel={i18n.t(
            'common.RatingModal.ratingItemLabels.range.rightLabel'
          )}
        />
      )
      break
    case 'text':
      ratingControl = (
        <TextControl
          onRate={rateHandler}
          placeholder={i18n.t(
            'common.RatingModal.ratingItemLabels.text.placeholder'
          )}
          buttonLabel={i18n.t(
            'common.RatingModal.ratingItemLabels.text.buttonLabel'
          )}
        />
      )
  }

  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={visible}
      style={styles.modalContainer}
    >
      <View style={styles.outerContainer}>
        <KeyboardAvoidingView behavior="padding">
          <View style={styles.innerContainer}>
            <Text style={styles.title}>
              {i18n.t('common.RatingModal.title')}
            </Text>
            <Text style={styles.headline}>{newsHeadline}</Text>
            {ratingControl}
            <SmallButton style={styles.skipButton} onPress={onClose}>
              {i18n.t('common.RatingModal.skipButtonLabel')}
            </SmallButton>
          </View>
        </KeyboardAvoidingView>
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
    justifyContent: 'flex-end',
  },
  innerContainer: {
    paddingHorizontal: 12,
    paddingVertical: 16,
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
    marginBottom: 12,
  },
  skipButton: {
    marginTop: 2,
  },
})
