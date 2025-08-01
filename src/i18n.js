import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'

// Språkfiler
import translationEN from './locales/en/translation.json'
import translationSV from './locales/sv/translation.json'

const resources = {
  en: { translation: translationEN },
  sv: { translation: translationSV },
}

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: navigator.language.startsWith('sv') ? 'sv' : 'en', // Välj svenska om svenskt språk, annars engelska
    fallbackLng: 'en',
    interpolation: { escapeValue: false },
  })

export default i18n
