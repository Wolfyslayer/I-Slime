import React from 'react'
import { Link } from 'react-router-dom'

import { useTranslation } from 'react-i18next'

export default function Home() {
  const { t } = useTranslation()

  return (
    <div>
      <h1>{t('Welcome to Build Planner')}</h1>
      <Link to="/create">{t('Create new build')}</Link> | <Link to="/login">{t('Login')}</Link>
    </div>
  )
}
