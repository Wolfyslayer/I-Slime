// src/components/Login.jsx
import React, { useState } from 'react'
import { supabase } from '../lib/supabaseClient'
import { useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import '../styles/Auth.css'

export default function Login() {
  const { t } = useTranslation()
  const [identifier, setIdentifier] = useState('') // email or username
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [banInfo, setBanInfo] = useState(null)
  const navigate = useNavigate()

  const handleLogin = async (e) => {
    e.preventDefault()
    setError('')
    setBanInfo(null)

    let emailToUse = identifier

    // Om användaren har skrivit in ett användarnamn (inte en e-post)
    if (!identifier.includes('@')) {
      // Steg 1: hämta användarens email från profiles via username
      const { data: profile, error: profileError } = await supabase
        .from('profiles')
        .select('email')
        .eq('username', identifier)
        .single()

      if (profileError || !profile || !profile.email) {
        setError(t('No user found with that username.'))
        return
      }

      emailToUse = profile.email
    }

    // Steg 2: logga in med email och lösenord
    const { data: signInData, error: loginError } = await supabase.auth.signInWithPassword({
      email: emailToUse,
      password
    })

    if (loginError || !signInData.user) {
      setError(loginError?.message || t('Invalid email or password'))
      return
    }

    // Steg 3: kontrollera om e-post är verifierad
    if (!signInData.user.email_confirmed_at && !signInData.user.confirmed_at) {
      setError(t('Please verify your email before logging in.'))
      return
    }

    // Steg 4: kontrollera om användaren är bannad
    const { data: ban, error: banError } = await supabase
      .from('banned_users')
      .select('*')
      .eq('user_id', signInData.user.id)
      .single()

    if (ban) {
      const now = new Date()
      const banExpires = new Date(ban.expires_at)
      if (banExpires > now) {
        setBanInfo({
          reason: ban.reason || t('No reason provided'),
          expires: banExpires.toLocaleString()
        })
        await supabase.auth.signOut()
        setError(t('Your account is banned.'))
        return
      }
    }

    // Inloggning lyckades
    navigate('/')
  }

  return (
    <div className="auth-container">
      <h2>{t('Login')}</h2>
      <form onSubmit={handleLogin}>
        <input
          type="text"
          placeholder={t('Email or Username')}
          value={identifier}
          onChange={e => setIdentifier(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder={t('Password')}
          value={password}
          onChange={e => setPassword(e.target.value)}
          required
        />
        <button type="submit">{t('Login')}</button>
      </form>

      {error && <p className="error">{error}</p>}

      {banInfo && (
        <div className="ban-popup">
          <h3>🚫 {t('Account Banned')}</h3>
          <p><strong>{t('Reason:')}:</strong> {banInfo.reason}</p>
          <p><strong>{t('Ban Expires:')}:</strong> {banInfo.expires}</p>
        </div>
      )}

      <p style={{ marginTop: '1rem' }}>
        {t('Forgot your password?')} <a href="/forgot-password">{t('Reset it here')}</a>
      </p>
    </div>
  )
}
