
import React, { useEffect, useState } from 'react'
import { Navigate } from 'react-router-dom'
import { supabase } from '../lib/supabaseClient'

export default function ProtectedRoute({ children }) {
  const [loading, setLoading] = useState(true)
  const [allowed, setAllowed] = useState(false)
  const user = supabase.auth.user()

  useEffect(() => {
    async function checkBan() {
      if (!user) {
        setAllowed(false)
        setLoading(false)
        return
      }
      const { data } = await supabase
        .from('banned_users')
        .select('*')
        .eq('user_id', user.id)
        .single()

      setAllowed(!data) // Om finns i banned_users → false
      setLoading(false)
    }
    checkBan()
  }, [user])

  if (loading) return <p>Laddar...</p>

  if (!user) {
    return <Navigate to="/login" />
  }

  if (!allowed) {
    return <p>Du är bannlyst och har inte tillgång.</p>
  }

  return children
}
