// src/components/Register.jsx
import React, { useState } from 'react'
import { supabase } from '../lib/supabaseClient'
import { useNavigate } from 'react-router-dom'
inport '../styles/Auth.css'

export default function Register() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const navigate = useNavigate()

  const handleRegister = async (e) => {
    e.preventDefault()
    const { error } = await supabase.auth.signUp({ email, password })
    if (error) {
      setError(error.message)
    } else {
      alert('Check your email to confirm your account.')
      navigate('/login')
    }
  }

  return (
    <form onSubmit={handleRegister} className="auth-form">
      <h2>Register</h2>
      <input type="email" placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} required />
      <input type="password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} required />
      <button type="submit">Register</button>
      {error && <p className="error">{error}</p>}
    </form>
  )
}
