// src/components/Register.jsx
import React, { useState } from 'react'
import { supabase } from '../lib/supabaseClient'
import { useNavigate } from 'react-router-dom'
import '../styles/Auth.css'

export default function Register() {
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
      { email, password },
      {
        redirectTo: 'https://i-slime-builds.netlify.app/welcome'  // Korrekt redirect URL
      }
    )

    if (error) {
      setError(error.message)
    } else {
      setSuccess('Check your email to confirm your account.')
      setEmail('')
      setPassword('')
      setTimeout(() => navigate('/login'), 4000)
    }
  }

  return (
    <div className="auth-container">
      <h2>Create Account</h2>
      <form onSubmit={handleRegister}>
        <input
          type="email"
          placeholder="Email address"
          value={email}
          onChange={e => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password (min 6 chars)"
          value={password}
          onChange={e => setPassword(e.target.value)}
          required
          minLength={6}
        />
        <button type="submit">Register</button>
      </form>

      {error && <p className="error">{error}</p>}
      {success && <p className="success">{success}</p>}
    </div>
  )
}
