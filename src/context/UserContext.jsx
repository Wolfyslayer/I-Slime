// src/context/UserContext.jsx
import { createContext, useContext, useEffect, useState } from 'react'
import { supabase } from '../lib/supabaseClient'

const UserContext = createContext()

export function UserProvider({ children }) {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)
  const [isAdmin, setIsAdmin] = useState(false)

  useEffect(() => {
    const fetchUser = async () => {
      const { data: { session } } = await supabase.auth.getSession()
      setUser(session?.user ?? null)
      setLoading(false)

      if (session?.user) {
        const { data: adminData } = await supabase
          .from('admin_users')
          .select('*')
          .eq('user_id', session.user.id)
          .single()
        setIsAdmin(!!adminData)
      }
    }

    fetchUser()

    const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null)
      setIsAdmin(false)

      if (session?.user) {
        supabase
          .from('admin_users')
          .select('*')
          .eq('user_id', session.user.id)
          .single()
          .then(({ data }) => setIsAdmin(!!data))
      }
    })

    return () => {
      listener.subscription.unsubscribe()
    }
  }, [])

  return (
    <UserContext.Provider value={{ user, loading, isAdmin }}>
      {children}
    </UserContext.Provider>
  )
}

export function useUser() {
  return useContext(UserContext)
}
