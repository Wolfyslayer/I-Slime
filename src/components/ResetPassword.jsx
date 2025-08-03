import React, { useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { supabase } from '../lib/supabase'  // Importera klienten här
import { useTranslation } from 'react-i18next'
import '../styles/Auth.css'



export default function ResetPassword() {
  const { t } = useTranslation()
  const [searchParams] = useSearchParams()
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [error, setError] = useState('')
  const [message, setMessage] = useState('')
  const [loading, setLoading] = useState(false)

  const accessToken = searchParams.get('access_token')

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
      const { error } = await supabase.auth.updateUser(accessToken, {
        password,
      })
      if (error) {
        setError(error.message)
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
      <div style={{ padding: 20 }}>
        <h2>{t('Password Reset')}</h2>
        <p>{t('Invalid or missing token')}</p>
      </div>
    )
  }

  return (
    <div style={{ maxWidth: 400, margin: 'auto', padding: 20 }}>
      <h2>{t('Reset Your Password')}</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>{t('New Password')}</label><br />
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <div>
          <label>{t('Confirm New Password')}</label><br />
          <input
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
        </div>
        {error && <p style={{ color: 'red' }}>{error}</p>}
        {message && <p style={{ color: 'green' }}>{message}</p>}
        <button type="submit" disabled={loading}>
          {loading ? t('Resetting...') : t('Reset Password')}
        </button>
      </form>
    </div>
  )
}
