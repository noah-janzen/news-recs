import * as Localization from 'expo-localization'
import i18n from 'i18n-js'

import { de } from './de'
import { en } from './en'

i18n.translations = {
  en,
  de,
}
i18n.locale = Localization.locale
i18n.fallbacks = true

export default i18n
