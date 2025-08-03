// src/components/Login.jsx
import React, { useState } from 'react'
import { supabase } from '../lib/supabaseClient'
import { useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'

export default function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const navigate = useNavigate()
  const { t } = useTranslation()

  const handleLogin = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError('')
    const { error } = await supabase.auth.signInWithPassword({ email, password })
    if (error) {
      setError(error.message)
    } else {
      navigate('/')
    }
    setLoading(false)
  }

  return (
    <form onSubmit={handleLogin} className="auth-form">
      <h2>{t('Login')}</h2>
      <input
        type="email"
        placeholder={t('Email')}
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      />
      <input
        type="password"
        placeholder={t('Password')}
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
      />
      <button type="submit" disabled={loading}>
        {loading ? t('Logging in...') : t('Login')}
      </button>
      {error && <p className="error">{error}</p>}
    </form>
  )
}
