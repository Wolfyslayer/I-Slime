// src/components/Register.jsx
import React, { useState } from 'react'
import { supabase } from '../lib/supabaseClient'
import { useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'

export default function Register() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const { t } = useTranslation()
  const navigate = useNavigate()

  const handleRegister = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError('')
    const { error } = await supabase.auth.signUp({ email, password })
    if (error) {
      setError(error.message)
    } else {
      alert(t('Registration successful. Please check your email to confirm.'))
      navigate('/login')
    }
    setLoading(false)
  }

  return (
    <form onSubmit={handleRegister} className="auth-form">
      <h2>{t('Register')}</h2>
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
        minLength={6}
      />
      <button type="submit" disabled={loading}>
        {loading ? t('Registering...') : t('Register')}
      </button>
      {error && <p className="error">{error}</p>}
    </form>
  )
}
