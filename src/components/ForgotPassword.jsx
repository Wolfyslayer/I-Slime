// src/components/ForgotPassword.jsx
import React, { useState } from 'react'
import { supabase } from '../lib/supabaseClient'
import '../styles/Auth.css'

export default function ForgotPassword() {
  const [email, setEmail] = useState('')
  const [message, setMessage] = useState('')
  const [error, setError] = useState('')

  const handleReset = async (e) => {
    e.preventDefault()
    setError('')
    setMessage('')

    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: 'https://i-slime-builds.netlify.app/reset-password`,
    })

    if (error) setError(error.message)
    else setMessage('Check your email to reset your password.')
  }

  return (
    <div className="auth-container">
      <h2>Forgot Password</h2>
      <form onSubmit={handleReset}>
        <input
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={e => setEmail(e.target.value)}
          required
        />
        <button type="submit">Send Reset Email</button>
      </form>
      {error && <p className="error">{error}</p>}
      {message && <p className="success">{message}</p>}
    </div>
  )
}
