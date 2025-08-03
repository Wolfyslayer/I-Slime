// src/components/Login.jsx
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { supabase } from '../lib/supabaseClient'
import './Auth.css'

export default function Login() {
  const navigate = useNavigate()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const [showForgotPassword, setShowForgotPassword] = useState(false)
  const [resetEmail, setResetEmail] = useState('')
  const [resetMessage, setResetMessage] = useState('')

  const handleLogin = async (e) => {
    e.preventDefault()
    setLoading(true)
    const { error } = await supabase.auth.signIn({ email, password })
    setLoading(false)
    if (error) {
      setError(error.message)
    } else {
      navigate('/')
    }
  }

  const handleForgotPassword = async () => {
    if (!resetEmail) {
      setResetMessage('Please enter your email.')
      return
    }

    const { error } = await supabase.auth.api.resetPasswordForEmail(resetEmail, {
      redirectTo: window.location.origin + '/reset-password', // You can change this
    })

    if (error) {
      setResetMessage('Error: ' + error.message)
    } else {
      setResetMessage('A reset link has been sent to your email.')

      // Optional auto-close popup
      setTimeout(() => {
        setShowForgotPassword(false)
        setResetEmail('')
        setResetMessage('')
      }, 5000)
    }
  }

  return (
    <div className="auth-container">
      <h2>Login</h2>
      <form onSubmit={handleLogin}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit" disabled={loading}>
          {loading ? 'Logging in...' : 'Login'}
        </button>
        {error && <p className="error">{error}</p>}
      </form>

      <p style={{ marginTop: '10px', fontSize: '0.9rem' }}>
        <button
          style={{
            background: 'none',
            border: 'none',
            color: '#0ff',
            textDecoration: 'underline',
            cursor: 'pointer',
            padding: 0,
          }}
          onClick={() => setShowForgotPassword(!showForgotPassword)}
        >
          Forgot your password?
        </button>
      </p>

      {showForgotPassword && (
        <div style={{ marginTop: '20px', background: '#222', padding: '15px', borderRadius: '6px' }}>
          <h3 style={{ marginBottom: '10px' }}>Reset Password</h3>
          <input
            type="email"
            placeholder="Enter your email"
            value={resetEmail}
            onChange={(e) => setResetEmail(e.target.value)}
            style={{ width: '100%', padding: 8, marginBottom: 10 }}
          />
          <button
            onClick={handleForgotPassword}
            style={{
              padding: '10px 20px',
              background: '#0ff',
              color: '#000',
              fontWeight: 'bold',
              borderRadius: '4px',
              border: 'none',
              cursor: 'pointer',
            }}
          >
            Send reset link
          </button>
          {resetMessage && <p style={{ marginTop: 10 }}>{resetMessage}</p>}
        </div>
      )}
    </div>
  )
}
