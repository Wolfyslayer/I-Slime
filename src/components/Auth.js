import React, { useState, useEffect } from 'react'
import { supabase } from '../supabaseClient'

export default function Auth({ onLogin }) {
  const [email, setEmail] = useState('')
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    const session = supabase.auth.session()
    if (session) onLogin(session.user)
    supabase.auth.onAuthStateChange((_event, session) => {
      onLogin(session?.user ?? null)
    })
  }, [])

  const signIn = async () => {
    setLoading(true)
    const { error } = await supabase.auth.signInWithOtp({ email })
    if (error) alert(error.message)
    else alert('Check your email for the login link!')
    setLoading(false)
  }

  return (
    <div>
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={e => setEmail(e.target.value)}
      />
      <button onClick={signIn} disabled={loading}>
        {loading ? 'Sending...' : 'Sign In / Register'}
      </button>
    </div>
  )
}
