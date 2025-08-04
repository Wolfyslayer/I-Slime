// AuthProvider.tsx (eller i App.tsx / main.tsx)
import { useEffect, useState } from 'react'
import { supabase } from './supabaseClient'

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Hämta och uppdatera session direkt
    const restoreSession = async () => {
      const { data, error } = await supabase.auth.getSession()
      if (!data.session) {
        console.warn('⚠️ Ingen aktiv session – försöker uppdatera...')
        await supabase.auth.refreshSession()
      }
      setLoading(false)
    }

    restoreSession()

    // Lyssna på framtida förändringar (inloggning, utloggning, timeout etc)
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((event, session) => {
      console.log('🔄 Auth event:', event)
      if (!session) {
        console.warn('⚠️ Session försvann – uppdaterar...')
        supabase.auth.refreshSession()
      }
    })

    return () => subscription.unsubscribe()
  }, [])

  if (loading) return <div>Loading...</div>
  return <>{children}</>
}
