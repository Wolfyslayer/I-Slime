// src/context/UserContext.jsx
import { createContext, useContext, useEffect, useState } from 'react'
import { supabase } from '../lib/supabaseClient'

const UserContext = createContext()

export function UserProvider({ children }) {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)
  const [isAdmin, setIsAdmin] = useState(false)

  // Funktion som kollar om user är admin i DB
  const checkIfAdmin = async (userId) => {
    try {
      const { data, error } = await supabase
        .from('admin_users')
        .select('*')
        .eq('user_id', userId)
        .single()

      if (error) {
        console.error('[UserContext] checkIfAdmin error:', error)
        return false
      }
      return !!data
    } catch (err) {
      console.error('[UserContext] checkIfAdmin exception:', err)
      return false
    }
  }

  useEffect(() => {
    // Initiera auth vid mount
    const initAuth = async () => {
      setLoading(true)
      try {
        const { data: { session }, error } = await supabase.auth.getSession()
        if (error) throw error

        const currentUser = session?.user ?? null
        const verified = currentUser?.email_confirmed_at || currentUser?.confirmed_at

        console.log('[UserContext] Initial session:', session)

        if (currentUser && !verified) {
          console.log('[UserContext] User not verified, signing out...')
          await supabase.auth.signOut()
          setUser(null)
          setIsAdmin(false)
        } else {
          setUser(currentUser)
          // Kör admin-check separat, påverkar inte loading
          if (currentUser) {
            checkIfAdmin(currentUser.id).then(setIsAdmin).catch(() => setIsAdmin(false))
          } else {
            setIsAdmin(false)
          }
        }
      } catch (error) {
        console.error('[UserContext] initAuth error:', error)
        setUser(null)
        setIsAdmin(false)
      } finally {
        setLoading(false)
      }
    }

    initAuth()

    // Lyssna på auth state changes
    const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
      setLoading(true)

      const currentUser = session?.user ?? null
      const verified = currentUser?.email_confirmed_at || currentUser?.confirmed_at

      console.log('[UserContext] Auth state change:', session)

      if (currentUser && !verified) {
        console.log('[UserContext] User not verified on auth change, signing out...')
        supabase.auth.signOut()
        setUser(null)
        setIsAdmin(false)
        setLoading(false)
      } else {
        setUser(currentUser)
        setLoading(false)

        if (currentUser) {
          // Kör admin-check separat så det inte blockerar loading
          checkIfAdmin(currentUser.id).then(setIsAdmin).catch(() => setIsAdmin(false))
        } else {
          setIsAdmin(false)
        }
      }
    })

    return () => {
      listener.subscription.unsubscribe()
    }
  }, [])

  return (
    <UserContext.Provider value={{ user, setUser, loading, isAdmin, setIsAdmin }}>
      {loading ? <div style={{ padding: '1rem' }}>Loading user data...</div> : children}
    </UserContext.Provider>
  )
}

export function useUser() {
  return useContext(UserContext)
}
