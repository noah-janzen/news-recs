import * as Localization from 'expo-localization'
import i18n from 'i18n-js'

import { de } from './de'
import { en } from './en'

export const supportedLanguages = ['de', 'en'] as const

i18n.translations = {
  en,
  de,
}
i18n.locale = Localization.locale
i18n.fallbacks = true

export function getLanguageIdentifier() {
  return (
    supportedLanguages.find(
      (languageKey) => languageKey === i18n.currentLocale().slice(0, 2)
    ) ?? 'en'
  )
}

export default i18n
