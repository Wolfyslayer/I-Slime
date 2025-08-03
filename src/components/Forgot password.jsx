import React, { useState } from 'react'
import { supabase } from '../lib/supabaseClient'
import { useTranslation } from 'react-i18next'

export default function ForgotPassword() {
  const [email, setEmail] = useState('')
  const [message, setMessage] = useState('')
  const { t } = useTranslation()

  const handleReset = async (e) => {
    e.preventDefault()
    const { error } = await supabase.auth.api.resetPasswordForEmail(email, {
      redirectTo: window.location.origin + '/reset-password',
    })
    if (error) {
      setMessage(t('Failed to send reset email.'))
    } else {
      setMessage(t('Password reset link sent! Check your email.'))
    }
  }

  return (
    <div className="auth-form">
      <h2>{t('Forgot Password')}</h2>
      <form onSubmit={handleReset}>
        <input
          type="email"
          placeholder={t('Enter your email')}
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <button type="submit">{t('Send Reset Email')}</button>
        {message && <p>{message}</p>}
      </form>
    </div>
  )
}
