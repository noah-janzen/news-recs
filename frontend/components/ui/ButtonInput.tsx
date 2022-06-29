import { Pressable, View, Text, StyleSheet } from 'react-native'
import { GlobalStyles } from '../../constants/style'
import ErrorLabel from './ErrorLabel'
import InputLabel from './InputLabel'

export type item = {
  label: string
  id: string
}

export type Props = {
  label: string
  activeElement: string | null
  onSelect: (item: string) => void
  submitted: boolean
  items: item[]
  errorLabel: string
}

function ButtonInput({
  label,
  activeElement,
  onSelect,
  submitted,
  items,
  errorLabel,
}: Props) {
  const showError = activeElement == null && submitted

  return (
    <View style={styles.outerContainer}>
      <InputLabel>{label}</InputLabel>

      <View style={styles.container}>
        {items.map((item, index) => (
          <Pressable
            key={item.id}
            style={[
              styles.pressable,
              index === 0 && items.length > 1 && styles.leftElement,
              index === items.length - 1 &&
                items.length > 1 &&
                styles.rightElement,
              index > 0 &&
                index < items.length - 1 &&
                items.length > 1 &&
                styles.centerElement,
            ]}
            onPress={() => onSelect(item.id)}
          >
            <View
              style={[
                styles.selectItem,
                activeElement === item.id && styles.activeSelectItem,
                showError && styles.invalidSelectItem,
              ]}
            >
              <Text
                style={[
                  styles.text,
                  activeElement === item.id && styles.activeText,
                  showError && styles.invalidText,
                ]}
              >
                {item.label}
              </Text>
            </View>
          </Pressable>
        ))}
      </View>
      {showError && <ErrorLabel>{errorLabel}</ErrorLabel>}
    </View>
  )
}

export default ButtonInput

const gap = 8

const styles = StyleSheet.create({
  outerContainer: {
    marginVertical: 8,
  },
  container: {
    flexDirection: 'row',
  },
  pressable: {
    height: 40,
    flex: 1,
  },
  selectItem: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 8,
    borderColor: '#ccc',
    backgroundColor: 'white',
    borderWidth: 1,
  },
  activeSelectItem: {
    backgroundColor: GlobalStyles.colors.primary500,
    borderColor: GlobalStyles.colors.primary500,
  },
  invalidSelectItem: {
    borderColor: GlobalStyles.colors.error,
    backgroundColor: GlobalStyles.colors.errorLight,
  },
  leftElement: {
    marginRight: gap,
  },
  centerElement: {
    marginLeft: gap / 2,
    marginRight: gap / 2,
  },
  rightElement: {
    marginLeft: gap,
  },
  text: {
    color: 'black',
    fontSize: 16,
    fontFamily: 'Nunito_400Regular',
  },
  activeText: {
    color: 'white',
  },
  invalidText: {
    color: GlobalStyles.colors.error,
  },
})
