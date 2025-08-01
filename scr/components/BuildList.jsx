// src/components/BuildList.jsx
import { useEffect, useState } from 'react'
import { supabase } from '../lib/supabaseClient'
import { Link } from 'react-router-dom'

export default function BuildList() {
  const [builds, setBuilds] = useState([])

  useEffect(() => {
    async function fetchBuilds() {
      const { data, error } = await supabase
        .from('builds')
        .select('*')
        .order('created_at', { ascending: false })

      if (!error) setBuilds(data)
    }
    fetchBuilds()
  }, [])

  return (
    <div>
      <h2>Alla Builds</h2>
      {builds.map(build => (
        <div key={build.id} style={{ borderBottom: '1px solid #ccc', marginBottom: '1rem' }}>
          <h3><Link to={`/build/${build.id}`}>{build.title}</Link></h3>
          <p>{build.description}</p>
        </div>
      ))}
    </div>
  )
}
