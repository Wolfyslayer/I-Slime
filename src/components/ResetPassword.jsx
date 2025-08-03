import React, { useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { supabase } from '../lib/supabaseClient'  // Importera klienten här
import { useTranslation } from 'react-i18next'
import '../styles/Auth.css'




export default function ResetPassword() {
  const { t } = useTranslation()
  const [searchParams] = useSearchParams()
  const accessToken = searchParams.get('access_token')
  const refreshToken = searchParams.get('refresh_token') || '' // kan finnas i URL eller tom sträng

  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [error, setError] = useState('')
  const [message, setMessage] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setMessage('')

    if (!accessToken) {
      setError(t('Missing reset token'))
      return
    }
    if (password !== confirmPassword) {
      setError(t('Passwords do not match'))
      return
    }
    if (password.length < 6) {
      setError(t('Password must be at least 6 characters'))
      return
    }

    setLoading(true)
    try {
      // Sätt session med token från URL
      const { error: sessionError } = await supabase.auth.setSession({
        access_token: accessToken,
        refresh_token: refreshToken,
      })
      if (sessionError) {
        setError(sessionError.message)
        setLoading(false)
        return
      }

      // Uppdatera lösenord
      const { error: updateError } = await supabase.auth.updateUser({ password })
      if (updateError) {
        setError(updateError.message)
      } else {
        setMessage(t('Password has been reset. You can now log in.'))
      }
    } catch (err) {
      setError(err.message)
    }
    setLoading(false)
  }

  if (!accessToken) {
    return (
      <div className="auth-container">
        <h2>{t('Password Reset')}</h2>
        <p>{t('Invalid or missing token')}</p>
      </div>
    )
  }

  return (
    <div className="auth-container">
      <h2>{t('Reset Your Password')}</h2>
      <form onSubmit={handleSubmit}>
        <label>{t('New Password')}</label>
        <input
          type="password"
          value={password}
          onChange={e => setPassword(e.target.value)}
          required
        />
        <label>{t('Confirm New Password')}</label>
        <input
          type="password"
          value={confirmPassword}
          onChange={e => setConfirmPassword(e.target.value)}
          required
        />
        {error && <p className="error">{error}</p>}
        {message && <p className="success">{message}</p>}
        <button type="submit" disabled={loading}>
          {loading ? t('Resetting...') : t('Reset Password')}
        </button>
      </form>
    </div>
  )
}
