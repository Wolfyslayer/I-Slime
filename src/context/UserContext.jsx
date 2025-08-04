// src/context/UserContext.jsx
import { createContext, useContext, useEffect, useState } from 'react'
import { supabase } from '../lib/supabaseClient'

const UserContext = createContext()

export function UserProvider({ children }) {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)
  const [isAdmin, setIsAdmin] = useState(false)

  const checkIfAdmin = async (userId) => {
    const { data, error } = await supabase
      .from('admin_users')
      .select('*')
      .eq('user_id', userId)
      .single()

    return !!data
  }

  useEffect(() => {
    const initAuth = async () => {
      setLoading(true)

      const { data: { session }, error } = await supabase.auth.getSession()
      const currentUser = session?.user ?? null
      const verified = currentUser?.email_confirmed_at || currentUser?.confirmed_at

      console.log('[UserContext] Initial session:', session)

      if (currentUser && !verified) {
        await supabase.auth.signOut()
        setUser(null)
        setIsAdmin(false)
      } else {
        setUser(currentUser)
        setIsAdmin(currentUser ? await checkIfAdmin(currentUser.id) : false)
      }

      setLoading(false)
    }

    initAuth()

    const { data: listener } = supabase.auth.onAuthStateChange(
      async (_event, session) => {
        const currentUser = session?.user ?? null
        const verified = currentUser?.email_confirmed_at || currentUser?.confirmed_at

        console.log('[UserContext] Auth state change:', session)

        if (currentUser && !verified) {
          await supabase.auth.signOut()
          setUser(null)
          setIsAdmin(false)
        } else {
          setUser(currentUser)
          setIsAdmin(currentUser ? await checkIfAdmin(currentUser.id) : false)
        }

        setLoading(false)
      }
    )

    return () => {
      listener.subscription.unsubscribe()
    }
  }, [])

  return (
    <UserContext.Provider value={{ user, setUser, loading, isAdmin, setIsAdmin }}>
      {children}
    </UserContext.Provider>
  )
}

export function useUser() {
  return useContext(UserContext)
}
