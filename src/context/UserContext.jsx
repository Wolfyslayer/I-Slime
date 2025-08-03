// src/context/UserContext.jsx
import { createContext, useContext, useEffect, useState } from 'react'
import { supabase } from '../lib/supabaseClient'

const UserContext = createContext()

export function UserProvider({ children }) {
  const [user, setUser] = useState(null)
  const [isAdmin, setIsAdmin] = useState(false)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const session = supabase.auth.session()
    const currentUser = session?.user ?? null
    setUser(currentUser)
    checkAdmin(currentUser)
    
    const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
      const updatedUser = session?.user ?? null
      setUser(updatedUser)
      checkAdmin(updatedUser)
    })

    return () => {
      listener?.subscription?.unsubscribe()
    }
  }, [])

  async function checkAdmin(user) {
    if (!user) {
      setIsAdmin(false)
      setLoading(false)
      return
    }

    const { data, error } = await supabase
      .from('admin_users')
      .select('id')
      .eq('id', user.id)
      .single()

    setIsAdmin(!error && !!data)
    setLoading(false)
  }

  return (
    <UserContext.Provider value={{ user, isAdmin, loading }}>
      {children}
    </UserContext.Provider>
  )
}

export function useUser() {
  return useContext(UserContext)
}
