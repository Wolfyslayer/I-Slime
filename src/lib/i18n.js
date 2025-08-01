import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'
import LanguageDetector from 'i18next-browser-languagedetector'

const resources = {
  en: {
    translation: {
      "all_builds": "All Builds",
      "create_build": "Create Build",
      "my_builds": "My Builds",
      "login": "Login",
      "register": "Register",
      "logout": "Logout",
      "admin_panel": "Admin Panel",
      // Lägg till fler nycklar efter behov
    }
  },
  sv: {
    translation: {
      "all_builds": "Alla Builds",
      "create_build": "Skapa Build",
      "my_builds": "Mina Builds",
      "login": "Logga In",
      "register": "Registrera",
      "logout": "Logga ut",
      "admin_panel": "Adminpanel",
      // Lägg till fler nycklar efter behov
    }
  }
}

i18n
  .use(LanguageDetector)        // Automatisk språkdetektion
  .use(initReactI18next)        // React-integration
  .init({
    resources,
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false
    }
  })

export default i18n

