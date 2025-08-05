// src/components/AccessDenied.jsx
import React from 'react'
import { useTranslation } from 'react-i18next'
import '../styles/Auth.css'

export default function AccessDenied({ message }) {
  const { t } = useTranslation()
  const defaultMessage = message || t('You do not have permission to view this page.')

  return (
    <div style={{
      padding: '2rem',
      textAlign: 'center',
      fontFamily: 'sans-serif',
      backgroundColor: '#fff3f3',
      color: '#b30000',
      border: '1px solid #ffcccc',
      borderRadius: '8px',
      maxWidth: '500px',
      margin: '4rem auto'
    }}>
      <h2>🚫 {t('Access denied')}</h2>
      <p>{defaultMessage}</p>
    </div>
  )
}
