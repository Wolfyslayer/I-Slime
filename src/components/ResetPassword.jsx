import React from 'react'
import { useTranslation } from 'react-i18next'

export default function ResetPassword() {
  const { t } = useTranslation()

  return (
    <div style={{ padding: '20px' }}>
      <h2>{t('Password Reset')}</h2>
      <p>{t('Please check your email for the reset link.')}</p>
    </div>
  )
}
