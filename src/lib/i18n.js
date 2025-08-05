import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'
import LanguageDetector from 'i18next-browser-languagedetector'

const resources = {
  en: {
    translation: {
      // Navigation & App
      "I-Slime": "I-Slime",
      "Build Planner": "Build Planner",
      "Welcome to Build Planner": "Welcome to Build Planner",
      "All Builds": "All Builds",
      "Create Build": "Create Build",
      "My Builds": "My Builds",
      "Admin Panel": "Admin Panel",
      "Sign out": "Sign out",
      "Login": "Login",
      "Sign Up": "Sign Up",
      "Change language": "Change language",

      // Authentication
      "Create Account": "Create Account",
      "Username": "Username",
      "Email address": "Email address",
      "Password (min 6 chars)": "Password (min 6 chars)",
      "Register": "Register",
      "Email or Username": "Email or Username",
      "Password": "Password",
      "Enter your email": "Enter your email",
      "Password Reset": "Password Reset",
      "Forgot Password": "Forgot Password",
      "Forgot your password?": "Forgot your password?",
      "Reset Your Password": "Reset Your Password",
      "New Password": "New Password",
      "Confirm New Password": "Confirm New Password",
      "Send Reset Email": "Send Reset Email",
      "Reset Password": "Reset Password",
      "Resetting...": "Resetting...",
      "Go to login": "Go to login",
      "Reset it here": "Reset it here",
      "Welcome!": "Welcome!",
      "Your account has been successfully confirmed.": "Your account has been successfully confirmed.",
      "You can now": "You can now",
      "log in": "log in",
      "to start using the app.": "to start using the app.",

      // Error Messages
      "This email is already registered. Please log in or reset your password.": "This email is already registered. Please log in or reset your password.",
      "Check your email to confirm your account.": "Check your email to confirm your account.",
      "No user found with that username.": "No user found with that username.",
      "Invalid email or password": "Invalid email or password",
      "Please verify your email before logging in.": "Please verify your email before logging in.",
      "Your account is banned.": "Your account is banned.",
      "Check your email to reset your password.": "Check your email to reset your password.",
      "Invalid or missing token": "Invalid or missing token",
      "Missing reset token": "Missing reset token",
      "Passwords do not match": "Passwords do not match",
      "Password must be at least 6 characters": "Password must be at least 6 characters",
      "Password has been reset. You can now log in.": "Password has been reset. You can now log in.",

      // Ban Information
      "Account Banned": "Account Banned",
      "Reason:": "Reason:",
      "Ban Expires:": "Ban Expires:",
      "No reason provided": "No reason provided",

      // Build Management
      "Title": "Title",
      "Description": "Description",
      "Class": "Class",
      "Path": "Path",
      "Skills": "Skills",
      "Pets": "Pets",
      "Items": "Items",
      "Select Class": "Select Class",
      "Select Path": "Select Path",
      "Choose class": "Choose class",
      "Choose path": "Choose path",
      "Create New Build": "Create New Build",
      "Create": "Create",
      "Save Changes": "Save Changes",
      "Saving...": "Saving...",
      "Edit Build": "Edit Build",
      "Edit": "Edit",
      "Delete": "Delete",
      "Cancel": "Cancel",
      "Back to Builds": "Back to Builds",
      "Report Build": "Report Build",

      // Build Form
      "Create new Build": "Create new Build",
      "Edit Build": "Edit Build",
      "Title, class and path are required.": "Title, class and path are required.",
      "You must be logged in to create a build.": "You must be logged in to create a build.",
      "Failed to save the build:": "Failed to save the build:",
      "Changes saved!": "Changes saved!",
      "Failed to update the build:": "Failed to update the build:",
      "You can only edit your own builds.": "You can only edit your own builds.",
      "Selected Skills:": "Selected Skills:",
      "No selected skills": "No selected skills",
      "Selected Pets:": "Selected Pets:",
      "No selected pets": "No selected pets",
      "Items Stats": "Items Stats",
      "Stat 1": "Stat 1",
      "Stat 2": "Stat 2",
      "Attack Speed": "Attack Speed",

      // Här fixen för dropdown placeholder
      "choose_stat": "Choose stat",

      // Build Display
      "By": "By",
      "Anonymous": "Anonymous",
      "Unknown": "Unknown",
      "Build Configuration": "Build Configuration",
      "No description provided": "No description provided",
      "Build not found": "Build not found",
      "Loading...": "Loading...",
      "Loading your builds...": "Loading your builds...",
      "You must be logged in to view your builds.": "You must be logged in to view your builds.",
      "You have no saved builds yet.": "You have no saved builds yet.",
      "Create Your First Build": "Create Your First Build",
      "No builds found.": "No builds found.",
      "Are you sure you want to delete this build?": "Are you sure you want to delete this build?",
      "Error deleting build": "Error deleting build",
      "Something went wrong reporting the build.": "Something went wrong reporting the build.",
      "Thank you for reporting this build.": "Thank you for reporting this build.",

      // Admin Panel
      "Admin Panel - Report Management": "Admin Panel - Report Management",
      "No permission": "No permission",
      "Loading reports...": "Loading reports...",
      "No reports at the moment.": "No reports at the moment.",
      "Build Owner": "Build Owner",
      "Reported User": "Reported User",
      "Reported By": "Reported By",
      "Reason": "Reason",
      "Date": "Date",
      "Delete Build": "Delete Build",
      "Ban User": "Ban User",
      "Delete this build permanently?": "Delete this build permanently?",
      "Do you want to ban this user?": "Do you want to ban this user?",
      "Error fetching reports": "Error fetching reports",
      "Error banning user": "Error banning user",
      "User banned": "User banned",
      "Unexpected error occurred": "Unexpected error occurred",
      "No reason specified": "No reason specified",

      // Access Control
      "Access denied": "Access denied",
      "You do not have permission to view this page.": "You do not have permission to view this page.",
      "You must be an administrator to access this page.": "You must be an administrator to access this page.",

      // Loading States
      "Loading user data...": "Loading user data...",
      "Loading admin permissions...": "Loading admin permissions...",
      "Loading build...": "Loading build...",

      // Stats and Items
      "crit_hit": "Crit Hit",
      "combo": "Combo",
      "counter": "Counter",
      "skill_crit_hit": "Skill Crit Hit",
      "recover": "Recover",
      "dodge": "Dodge",
      "stun": "Stun",

      // Item Categories
      "weapon": "Weapon",
      "gloves": "Gloves",
      "armguards": "Armguards",
      "boots": "Boots",
      "mask": "Mask",
      "chest": "Chest",
      "pants": "Pants",
      "shoulder": "Shoulder",
      "helmet": "Helmet",
      "belt": "Belt",

      // Classes
      "Archer": "Archer",
      "Swordsman": "Swordsman",
      "Mage": "Mage",

      // Paths
      "Hunter": "Hunter",
      "Gun Wielder": "Gun Wielder",
      "Knight": "Knight",
      "Warrior": "Warrior",
      "Sage": "Sage",
      "Wizard": "Wizard"
    }
  },
  sv: {
    translation: {
      // Navigation & App
      "I-Slime": "I-Slime",
      "Build Planner": "Byggplanerare",
      "Welcome to Build Planner": "Välkommen till Byggplaneraren",
      "All Builds": "Alla Byggen",
      "Create Build": "Skapa Bygge",
      "My Builds": "Mina Byggen",
      "Admin Panel": "Adminpanel",
      "Sign out": "Logga ut",
      "Login": "Logga in",
      "Sign Up": "Registrera",
      "Change language": "Byt språk",

      // Authentication
      "Create Account": "Skapa konto",
      "Username": "Användarnamn",
      "Email address": "E-postadress",
      "Password (min 6 chars)": "Lösenord (minst 6 tecken)",
      "Register": "Registrera",
      "Email or Username": "E-post eller användarnamn",
      "Password": "Lösenord",
      "Enter your email": "Ange din e-post",
      "Password Reset": "Lösenordsåterställning",
      "Forgot Password": "Glömt lösenord",
      "Forgot your password?": "Glömt ditt lösenord?",
      "Reset Your Password": "Återställ ditt lösenord",
      "New Password": "Nytt lösenord",
      "Confirm New Password": "Bekräfta nytt lösenord",
      "Send Reset Email": "Skicka återställningsmail",
      "Reset Password": "Återställ lösenord",
      "Resetting...": "Återställer...",
      "Go to login": "Gå till inloggning",
      "Reset it here": "Återställ det här",
      "Welcome!": "Välkommen!",
      "Your account has been successfully confirmed.": "Ditt konto har bekräftats framgångsrikt.",
      "You can now": "Du kan nu",
      "log in": "logga in",
      "to start using the app.": "för att börja använda appen.",

      // Error Messages
      "This email is already registered. Please log in or reset your password.": "Denna e-post är redan registrerad. Vänligen logga in eller återställ ditt lösenord.",
      "Check your email to confirm your account.": "Kontrollera din e-post för att bekräfta ditt konto.",
      "No user found with that username.": "Ingen användare hittades med det användarnamnet.",
      "Invalid email or password": "Ogiltig e-post eller lösenord",
      "Please verify your email before logging in.": "Vänligen verifiera din e-post innan du loggar in.",
      "Your account is banned.": "Ditt konto är bannlyst.",
      "Check your email to reset your password.": "Kontrollera din e-post för att återställa ditt lösenord.",
      "Invalid or missing token": "Ogiltig eller saknad token",
      "Missing reset token": "Saknar återställningstoken",
      "Passwords do not match": "Lösenorden matchar inte",
      "Password must be at least 6 characters": "Lösenordet måste vara minst 6 tecken",
      "Password has been reset. You can now log in.": "Lösenordet har återställts. Du kan nu logga in.",

      // Ban Information
      "Account Banned": "Konto bannlyst",
      "Reason:": "Anledning:",
      "Ban Expires:": "Bannlysning upphör:",
      "No reason provided": "Ingen anledning angiven",

      // Build Management
      "Title": "Titel",
      "Description": "Beskrivning",
      "Class": "Klass",
      "Path": "Väg",
      "Skills": "Färdigheter",
      "Pets": "Husdjur",
      "Items": "Föremål",
      "Select Class": "Välj klass",
      "Select Path": "Välj väg",
      "Choose class": "Välj klass",
      "Choose path": "Välj väg",
      "Create New Build": "Skapa nytt bygge",
      "Create": "Skapa",
      "Save Changes": "Spara ändringar",
      "Saving...": "Sparar...",
      "Edit Build": "Redigera bygge",
      "Edit": "Redigera",
      "Delete": "Ta bort",
      "Cancel": "Avbryt",
      "Back to Builds": "Tillbaka till byggen",
      "Report Build": "Rapportera bygge",

      // Build Form
      "Create new Build": "Skapa ny build",
      "Edit Build": "Redigera build",
      "Title, class and path are required.": "Titel, klass och väg är obligatoriska.",
      "You must be logged in to create a build.": "Du måste vara inloggad för att skapa ett bygge.",
      "Failed to save the build:": "Misslyckades med att spara bygget:",
      "Changes saved!": "Ändringar sparade!",
      "Failed to update the build:": "Misslyckades med att uppdatera bygget:",
      "You can only edit your own builds.": "Du kan bara redigera dina egna byggen.",
      "Selected Skills:": "Valda färdigheter:",
      "No selected skills": "Inga valda färdigheter",
      "Selected Pets:": "Valda husdjur:",
      "No selected pets": "Inga valda husdjur",
      "Items Stats": "Föremålsstatistik",
      "Stat 1": "Stat 1",
      "Stat 2": "Stat 2",
      "Attack Speed": "Attack Speed",

      // Här fixen för dropdown placeholder
      "choose_stat": "Välj stat",

      // Build Display
      "By": "Av",
      "Anonymous": "Anonym",
      "Unknown": "Okänd",
      "Build Configuration": "Byggkonfiguration",
      "No description provided": "Ingen beskrivning angiven",
      "Build not found": "Bygget hittades inte",
      "Loading...": "Laddar...",
      "Loading your builds...": "Laddar dina byggen...",
      "You must be logged in to view your builds.": "Du måste vara inloggad för att se dina byggen.",
      "You have no saved builds yet.": "Du har inga sparade byggen än.",
      "Create Your First Build": "Skapa ditt första bygge",
      "No builds found.": "Inga byggen hittades.",
      "Are you sure you want to delete this build?": "Är du säker på att du vill ta bort detta bygge?",
      "Error deleting build": "Fel vid borttagning av bygge",
      "Something went wrong reporting the build.": "Något gick fel vid rapportering av bygget.",
      "Thank you for reporting this build.": "Tack för att du rapporterade detta bygge.",

      // Admin Panel
      "Admin Panel - Report Management": "Adminpanel - Hantering av rapporter",
      "No permission": "Ingen behörighet",
      "Loading reports...": "Laddar rapporter...",
      "No reports at the moment.": "Inga rapporter för tillfället.",
      "Build Owner": "Byggägare",
      "Reported User": "Rapporterad användare",
      "Reported By": "Rapporterad av",
      "Reason": "Anledning",
      "Date": "Datum",
      "Delete Build": "Ta bort bygge",
      "Ban User": "Banna användare",
      "Delete this build permanently?": "Ta bort detta bygge permanent?",
      "Do you want to ban this user?": "Vill du banna denna användare?",
      "Error fetching reports": "Fel vid hämtning av rapporter",
      "Error banning user": "Fel vid bannlysning av användare",
      "User banned": "Användare bannlyst",
      "Unexpected error occurred": "Ett oväntat fel inträffade",
      "No reason specified": "Ingen anledning angiven",

      // Access Control
      "Access denied": "Åtkomst nekad",
      "You do not have permission to view this page.": "Du har inte behörighet att se denna sida.",
      "You must be an administrator to access this page.": "Du måste vara administratör för att få tillgång till denna sida.",

      // Loading States
      "Loading user data...": "Laddar användardata...",
      "Loading admin permissions...": "Laddar adminbehörigheter...",
      "Loading build...": "Laddar bygge...",

      // Stats and Items
      "crit_hit": "Kritisk träff",
      "combo": "Kombination",
      "counter": "Motattack",
      "skill_crit_hit": "Färdighetskritiskt slag",
      "recover": "Återhämtning",
      "dodge": "Undvika",
      "stun": "Stun",

      // Item Categories
      "weapon": "Weapon",
      "gloves": "Gloves",
      "armguards": "Armguards",
      "boots": "Boots",
      "mask": "Mask",
      "chest": "Chest",
      "pants": "Pants",
      "shoulder": "Shoulder",
      "helmet": "Helmet",
      "belt": "Belt",

      // Classes
      "Archer": "Archer",
      "Swordsman": "Swordsman",
      "Mage": "Mage",

      // Paths
      "Hunter": "Hunter",
      "Gun Wielder": "Gun Wielder",
      "Knight": "Knight",
      "Warrior": "Warrior",
      "Sage": "Sage",
      "Wizard": "Wizard"
    }
  }
}

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false
    },
    detection: {
      order: ['localStorage', 'navigator', 'htmlTag', 'path', 'subdomain'],
      caches: ['localStorage']
    }
  })

export default i18n
