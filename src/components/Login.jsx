// src/components/Login.jsx
import React, { useState } from 'react'
import { supabase } from '../lib/supabaseClient'
import { useNavigate } from 'react-router-dom'
import '../styles/Auth.css'

export default function Login() {
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

    // Om användarnamn (inte en email)
    if (!identifier.includes('@')) {
      const { data: profile, error: profileError } = await supabase
        .from('profiles')
        .select('id')
        .eq('username', identifier)
        .single()

      if (profileError || !profile) {
        setError('No user found with that username.')
        return
      }

      const { data: userInfo, error: userError } = await supabase
        .from('users')
        .select('email')
        .eq('id', profile.id)
        .single()

      if (userError || !userInfo) {
        setError('Failed to find user email.')
        return
      }

      emailToUse = userInfo.email
    }

    // Inloggning med email (från input eller username-match)
    const { data: signInData, error: loginError } = await supabase.auth.signInWithPassword({
      email: emailToUse,
      password
    })

    if (loginError || !signInData.user) {
      setError(loginError?.message || 'Invalid email or password')
      return
    }

    if (!signInData.user.email_confirmed_at && !signInData.user.confirmed_at) {
      setError('Please verify your email before logging in.')
      return
    }

    // Bann-kontroll
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

    // Allt OK → vidare
    navigate('/')
  }

  return (
    <div className="auth-container">
      <h2>Login</h2>
      <form onSubmit={handleLogin}>
        <input
          type="text"
          placeholder="Email or Username"
          value={identifier}
          onChange={e => setIdentifier(e.target.value)}
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
