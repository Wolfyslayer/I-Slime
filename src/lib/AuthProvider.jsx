import { useEffect, useState } from 'react'
import { supabase } from './supabaseClient'

export function AuthProvider({ children }) {
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const restoreSession = async () => {
      try {
        const { data: sessionData, error: sessionError } = await supabase.auth.getSession()

        if (sessionError) {
          console.error('❌ Fel vid hämtning av session:', sessionError)
        }

        if (!sessionData.session) {
          console.warn('⚠️ Ingen aktiv session – försöker uppdatera...')

          const { data: refreshed, error: refreshError } = await supabase.auth.refreshSession()

          if (refreshError) {
            console.error('❌ Kunde inte uppdatera session:', refreshError)
          } else {
            console.log('✅ Session uppdaterad:', refreshed)
          }
        } else {
          console.log('✅ Aktiv session:', sessionData.session)
        }
      } catch (err) {
        console.error('❗ Ovänterat fel i restoreSession:', err)
      } finally {
        setLoading(false)
      }
    }

    restoreSession()

    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      console.log('🔄 Auth event:', event)
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
