import { useEffect, useState } from 'react'
import { supabase } from './supabaseClient'

export function AuthProvider({ children }) {
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const restoreSession = async () => {
      const { data, error } = await supabase.auth.getSession()

      if (!data.session) {
        console.warn('⚠️ Ingen aktiv session – försöker uppdatera...')
        const { data: refreshed, error: refreshError } = await supabase.auth.refreshSession()

        if (refreshError) {
          console.error('❌ Kunde inte uppdatera sessionen:', refreshError)
        } else {
          console.log('✅ Session uppdaterad:', refreshed)
        }
      }

      setLoading(false)
    }

    restoreSession()

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      console.log('🔄 Auth event:', _event)
      if (!session) {
        console.warn('⚠️ Session försvann – försöker uppdatera...')
        supabase.auth.refreshSession()
      }
    })

    return () => subscription.unsubscribe()
  }, [])

  if (loading) {
    return <div>⏳ Laddar autentisering...</div>
  }

  return <>{children}</>
}
