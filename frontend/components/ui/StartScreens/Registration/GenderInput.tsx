import { Pressable, View, Text, StyleSheet } from 'react-native'
import { GlobalStyles } from '../../../../constants/style'
import { Gender } from '../../../../model/Gender'

export type Props = {
  gender: Gender | null
  onEnterGender: (gender: Gender) => void
  submitted: boolean
}

function GenderInput({ gender, onEnterGender, submitted }: Props) {
  const showError = gender == null && submitted

  return (
    <>
      <Text style={styles.label}>Geschlecht</Text>

      <View style={styles.container}>
        <Pressable style={styles.pressable} onPress={() => onEnterGender('M')}>
          <View
            style={[
              styles.genderItem,
              styles.leftElement,
              gender === 'M' && styles.activeGenderItem,
              showError && styles.invalidGenderItem,
            ]}
          >
            <Text
              style={[
                styles.text,
                gender === 'M' && styles.activeText,
                showError && styles.invalidText,
              ]}
            >
              männlich
            </Text>
          </View>
        </Pressable>
        <Pressable style={styles.pressable} onPress={() => onEnterGender('W')}>
          <View
            style={[
              styles.genderItem,
              styles.centerElement,
              gender === 'W' && styles.activeGenderItem,
              showError && styles.invalidGenderItem,
            ]}
          >
            <Text
              style={[
                styles.text,
                gender === 'W' && styles.activeText,
                showError && styles.invalidText,
              ]}
            >
              weiblich
            </Text>
          </View>
        </Pressable>
        <Pressable style={styles.pressable} onPress={() => onEnterGender('D')}>
          <View
            style={[
              styles.genderItem,
              styles.rightElement,
              gender === 'D' && styles.activeGenderItem,
              showError && styles.invalidGenderItem,
            ]}
          >
            <Text
              style={[
                styles.text,
                gender === 'D' && styles.activeText,
                showError && styles.invalidText,
              ]}
            >
              divers
            </Text>
          </View>
        </Pressable>
      </View>
      {showError && (
        <Text style={styles.errorLabel}>Gib ein Geschlecht an</Text>
      )}
    </>
  )
}

export default GenderInput

const gap = 8

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    flex: 1,
    width: '100%',
  },
  pressable: {
    flex: 1,
  },
  genderItem: {
    flex: 1,
    alignItems: 'center',
    padding: 10,
    borderRadius: 8,
    borderColor: '#ccc',
    backgroundColor: 'white',
    borderWidth: 1,
  },
  activeGenderItem: {
    backgroundColor: GlobalStyles.colors.primary800,
    borderColor: GlobalStyles.colors.primary800,
  },
  invalidGenderItem: {
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
  label: {
    marginBottom: 4,
    fontFamily: 'Nunito_700Bold',
  },
  errorLabel: {
    color: GlobalStyles.colors.error,
    marginTop: 4,
  },
})
