// src/components/Login.jsx
import React, { useState } from 'react'
import { supabase } from '../lib/supabaseClient'
import { useNavigate } from 'react-router-dom'
import '../styles/Auth.css'

export default function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [banInfo, setBanInfo] = useState(null)
  const navigate = useNavigate()

  const handleLogin = async (e) => {
    e.preventDefault()
    setError('')
    setBanInfo(null)

    // Försök logga in
    const { data: signInData, error: loginError } = await supabase.auth.signInWithPassword({
      email,
      password
    })

    if (loginError || !signInData.user) {
      setError(loginError?.message || 'Invalid email or password')
      return
    }

    // Kontrollera att e-post är verifierad
    if (!signInData.user.email_confirmed_at && !signInData.user.confirmed_at) {
      setError('Please verify your email before logging in.')
      return
    }

    // Kolla om användaren är bannad
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
          reason: ban.reason || 'No reason provided',
          expires: banExpires.toLocaleString()
        })
        await supabase.auth.signOut()
        setError('Your account is banned.')
        return
      }
    }

    // Lyckad inloggning, navigera till startsidan
    navigate('/')
  }

  return (
    <div className="auth-container">
      <h2>Login</h2>
      <form onSubmit={handleLogin}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={e => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={e => setPassword(e.target.value)}
          required
        />
        <button type="submit">Login</button>
      </form>

      {error && <p className="error">{error}</p>}

      {banInfo && (
        <div className="ban-popup">
          <h3>🚫 Account Banned</h3>
          <p><strong>Reason:</strong> {banInfo.reason}</p>
          <p><strong>Ban Expires:</strong> {banInfo.expires}</p>
        </div>
      )}

      <p style={{ marginTop: '1rem' }}>
        Forgot your password? <a href="/forgot-password">Reset it here</a>
      </p>
    </div>
  )
}
