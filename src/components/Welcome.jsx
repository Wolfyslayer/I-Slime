// src/components/Welcome.jsx
import React from 'react'
import { useTranslation } from 'react-i18next'
import '../styles/Auth.css'

export default function Welcome() {
  const { t } = useTranslation()

  return (
    <div className="auth-container">
      <h2>{t('Welcome!')}</h2>
      <p>{t('Your account has been successfully confirmed.')}</p>
      <p>{t('You can now')} <a href="/login">{t('log in')}</a> {t('to start using the app.')}</p>
    </div>
  )
}
