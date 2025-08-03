import React, { useEffect, useState } from 'react'
import { supabase } from '../lib/supabaseClient'
import { useUser } from '../context/UserContext'
import { classes, paths } from '../data/data'  // importera rätt data

export default function MyBuilds() {
  const { user } = useUser()
  const [builds, setBuilds] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    if (!user) return

    const fetchBuilds = async () => {
      setLoading(true)
      const { data, error } = await supabase
        .from('builds')
        .select('*')
        .eq('user_id', user.id)

      if (error) {
        setError(error.message)
      } else {
        setBuilds(data)
      }
      setLoading(false)
    }

    fetchBuilds()
  }, [user])

  if (!user) return <p>Du måste vara inloggad för att se dina builds.</p>
  if (loading) return <p>Laddar dina builds...</p>
  if (error) return <p>Ett fel uppstod: {error}</p>

  return (
    <div className="main-content" style={{ maxWidth: 600, margin: '0 auto' }}>
      <h1>Mina Builds</h1>
      {builds.length === 0 ? (
        <p>Du har inga sparade builds än.</p>
      ) : (
        <ul>
          {builds.map(build => {
            const klass = classes.find(c => c.id === build.class_id)?.name || 'Okänd'
            const vag = paths.find(p => p.id === build.path_id)?.name || 'Okänd'

            return (
              <li key={build.id}>
                <strong>{build.title}</strong> — Klass: {klass} — Väg: {vag}
              </li>
            )
          })}
        </ul>
      )}
    </div>
  )
}
