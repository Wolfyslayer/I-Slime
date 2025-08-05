import React from 'react'
import { useTranslation } from 'react-i18next'

export default function LanguageSwitcher() {
  const { i18n } = useTranslation()

  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng)
  }

  return (
    <div style={{
      position: 'fixed',
      top: '10px',
      right: '10px',
      zIndex: 1000,
      display: 'flex',
      gap: '8px'
    }}>
      <button
        onClick={() => changeLanguage('en')}
        style={{
          padding: '6px 12px',
          fontSize: '12px',
          backgroundColor: i18n.language === 'en' ? '#00f9ff' : 'transparent',
          color: i18n.language === 'en' ? '#000' : '#0ff',
          border: '1px solid #0ff',
          borderRadius: '4px',
          cursor: 'pointer'
        }}
      >
        EN
      </button>
      <button
        onClick={() => changeLanguage('sv')}
        style={{
          padding: '6px 12px',
          fontSize: '12px',
          backgroundColor: i18n.language === 'sv' ? '#00f9ff' : 'transparent',
          color: i18n.language === 'sv' ? '#000' : '#0ff',
          border: '1px solid #0ff',
          borderRadius: '4px',
          cursor: 'pointer'
        }}
      >
        SV
      </button>
    </div>
  )
}