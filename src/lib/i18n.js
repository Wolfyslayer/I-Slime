import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'

const resources = {
  en: {
    translation: {
      "Build Planner": "Build Planner",
      "All Builds": "All Builds",
      "Create Build": "Create Build",
      "My Builds": "My Builds",
      "Log Out": "Log Out",
      "Log In": "Log In",
      "Register": "Register",
      "Admin Panel": "Admin Panel",
      "You must be logged in to create a build.": "You must be logged in to create a build.",
      "Build created!": "Build created!",
      "Title": "Title",
      "Description": "Description",
      "No permission": "No permission",
      "Error fetching reports": "Error fetching reports",
      "Delete this build permanently?": "Delete this build permanently?",
      "Error deleting build": "Error deleting build",
      "Do you want to ban this user?": "Do you want to ban this user?",
      "Error banning user": "Error banning user",
      "User banned": "User banned",
      "Loading reports...": "Loading reports...",
      "No reports at the moment.": "No reports at the moment.",
      "Build": "Build",
      "Build Owner": "Build Owner",
      "Reported User": "Reported User",
      "Reported By": "Reported By",
      "Reason": "Reason",
      "Date": "Date"
    }
  },
  sv: {
    translation: {
      "Build Planner": "Byggplanerare",
      "All Builds": "Alla Bygg",
      "Create Build": "Skapa Bygg",
      "My Builds": "Mina Bygg",
      "Log Out": "Logga Ut",
      "Log In": "Logga In",
      "Register": "Registrera",
      "Admin Panel": "Adminpanel",
      "You must be logged in to create a build.": "Du måste vara inloggad för att skapa en byggnad.",
      "Build created!": "Byggnad skapad!",
      "Title": "Titel",
      "Description": "Beskrivning",
      "No permission": "Ingen behörighet",
      "Error fetching reports": "Fel vid hämtning av rapporter",
      "Delete this build permanently?": "Radera denna byggnad permanent?",
      "Error deleting build": "Fel vid radering av byggnad",
      "Do you want to ban this user?": "Vill du bannlysa denna användare?",
      "Error banning user": "Fel vid bannlysning av användare",
      "User banned": "Användare bannlyst",
      "Loading reports...": "Laddar rapporter...",
      "No reports at the moment.": "Inga rapporter just nu.",
      "Build": "Byggnad",
      "Build Owner": "Byggnadsägare",
      "Reported User": "Rapporterad Användare",
      "Reported By": "Rapporterad Av",
      "Reason": "Orsak",
      "Date": "Datum"
    }
  }
}

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: navigator.language.split('-')[0] || 'en',
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false,
    },
  })

export default i18n
