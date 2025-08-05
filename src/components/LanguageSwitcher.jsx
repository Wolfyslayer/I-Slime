import React from 'react'
import { useTranslation } from 'react-i18next'

const flags = {
  en: '🇬🇧',
  sv: '🇸🇪',
}

export default function LanguageSwitcher() {
  const { i18n } = useTranslation()

  const toggleLanguage = () => {
    const newLang = i18n.language === 'en' ? 'sv' : 'en'
    i18n.changeLanguage(newLang)
  }

  return (
    <button
      onClick={toggleLanguage}
      style={{
        position: 'absolute',
        bottom: '20px',
        left: '50%',
        transform: 'translateX(-50%)',
        padding: '8px 16px',
        fontSize: '16px',
        backgroundColor: '#00f9ff',
        border: 'none',
        borderRadius: '20px',
        cursor: 'pointer',
        display: 'flex',
        alignItems: 'center',
        gap: '8px',
        color: '#000',
        userSelect: 'none',
      }}
      aria-label="Switch language"
    >
      <span>{flags[i18n.language]}</span>
      <span>{i18n.language === 'en' ? 'En' : 'Av'}</span>
    </button>
  )
}
