// src/components/Register.jsx
import React, { useState } from 'react'
import { supabase } from '../lib/supabaseClient'
import { useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import '../styles/Auth.css'

export default function Register() {
  const { t } = useTranslation()
  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')
  const navigate = useNavigate()

  const handleRegister = async (e) => {
    e.preventDefault()
    setError('')
    setSuccess('')

    const { data, error } = await supabase.auth.signUp(
      {
        email,
        password,
        options: {
          data: {
            username: username
          },
          redirectTo: `${window.location.origin}/welcome`
        }
      }
    )

    if (error) {
      if (error.message.toLowerCase().includes('already registered') || error.message.toLowerCase().includes('duplicate')) {
        setError(t('This email is already registered. Please log in or reset your password.'))
      } else {
        setError(error.message)
      }
    } else {
      setSuccess(t('Check your email to confirm your account.'))
      setEmail('')
      setPassword('')
      setUsername('')
      setTimeout(() => navigate('/login'), 4000)
    }
  }

  return (
    <div className="auth-container">
      <h2>{t('Create Account')}</h2>
      <form onSubmit={handleRegister}>
        <input
          type="text"
          placeholder={t('Username')}
          value={username}
          onChange={e => setUsername(e.target.value)}
          required
        />
        <input
          type="email"
          placeholder={t('Email address')}
          value={email}
          onChange={e => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder={t('Password (min 6 chars)')}
          value={password}
          onChange={e => setPassword(e.target.value)}
          required
          minLength={6}
        />
        <button type="submit">{t('Register')}</button>
      </form>

      {error && <p className="error">{error}</p>}
      {success && (
        <p className="success">
          {success} <br />
          <a href="/login">{t('Go to login')}</a>
        </p>
      )}
    </div>
  )
}
