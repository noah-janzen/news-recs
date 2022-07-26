import { View } from 'react-native'

import i18n from '../../../i18n'
import ButtonInput from '../ButtonInput'

export type Props = {
  onRate: (rating: any) => Promise<void>
  rating: any
  leftLabel: string
  rightLabel: string
}

function BinaryControl({ onRate, rating, leftLabel, rightLabel }: Props) {
  const RATING_ITEMS = [
    { id: '0', label: leftLabel },
    { id: '1', label: rightLabel },
  ]

  return (
    <View>
      <ButtonInput
        items={RATING_ITEMS}
        submitted={false}
        onSelect={(rating) => onRate(+rating)}
        activeElement={rating?.toString()}
        label={null}
        errorLabel={null}
      />
    </View>
  )
}

export default BinaryControl
