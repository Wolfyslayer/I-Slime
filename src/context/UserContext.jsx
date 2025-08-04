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

      const newUser = session?.user ?? null
      const verified = newUser?.email_confirmed_at || newUser?.confirmed_at

      if (newUser && !verified) {
        await supabase.auth.signOut()
        setUser(null)
        setLoading(false)
        return
      }

      setUser(prev => (prev?.id === newUser?.id ? prev : newUser))
      setLoading(false)

      if (newUser) {
        const { data: adminData } = await supabase
          .from('admin_users')
          .select('*')
          .eq('user_id', newUser.id)
          .single()

        setIsAdmin(!!adminData)
      }
    }

    fetchUser()

    const { data: listener } = supabase.auth.onAuthStateChange(async (_event, session) => {
      const newUser = session?.user ?? null
      const verified = newUser?.email_confirmed_at || newUser?.confirmed_at

      if (newUser && !verified) {
        await supabase.auth.signOut()
        setUser(null)
        setIsAdmin(false)
        setLoading(false)
        return
      }

      setUser(prev => (prev?.id === newUser?.id ? prev : newUser))
      setLoading(false)

      if (newUser) {
        const { data } = await supabase
          .from('admin_users')
          .select('*')
          .eq('user_id', newUser.id)
          .single()

        setIsAdmin(!!data)
      } else {
        setIsAdmin(false)
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
