// src/components/Register.jsx
import React, { useState } from 'react'
import { supabase } from '../lib/supabaseClient'

export default function Register() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [message, setMessage] = useState('')

  async function handleRegister(e) {
    e.preventDefault()
    const { error } = await supabase.auth.signUp({ email, password })

    if (error) {
      setMessage(error.message)
    } else {
      setMessage('Registrering lyckades! Kolla din e-post för bekräftelse.')
    }
  }

  return (
    <form onSubmit={handleRegister}>
      <h2>Registrera</h2>
      <input
        type="email"
        placeholder="E-post"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      />
      <input
        type="password"
        placeholder="Lösenord"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
      />
      <button type="submit">Registrera</button>
      <p>{message}</p>
    </form>
  )
}
