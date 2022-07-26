import { StyleSheet, Text, View } from 'react-native'
import MultiSlider from '@ptomasroos/react-native-multi-slider'

import { GlobalStyles } from '../../../constants/style'

export type Props = {
  onRate: (rating: any) => Promise<void>
  rating: any
  leftLabel: string
  rightLabel: string
}

function RangeControl({ onRate, rating, leftLabel, rightLabel }: Props) {
  return (
    <View style={styles.container}>
      <View style={styles.labelsContainer}>
        <View style={styles.labelContainer}>
          <Text style={styles.label}>{leftLabel}</Text>
        </View>
        <View style={styles.labelContainer}>
          <Text style={styles.label}>{rightLabel}</Text>
        </View>
      </View>
      <MultiSlider
        onValuesChangeFinish={(valueArray) => onRate(valueArray[0])}
        min={0}
        max={100}
      />
    </View>
  )
}

export default RangeControl

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    paddingVertical: 6,
  },
  labelsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginBottom: -2,
  },
  labelContainer: {
    backgroundColor: GlobalStyles.colors.primary400,
    borderRadius: 20,
    paddingVertical: 4,
    paddingHorizontal: 8,
  },
  label: {
    fontSize: 14,
    color: 'white',
  },
})
