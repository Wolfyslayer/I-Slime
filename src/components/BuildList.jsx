import React, { useEffect, useState } from 'react'
import { supabase } from '../lib/supabaseClient'

export default function BuildList() {
  const [builds, setBuilds] = useState([])

  useEffect(() => {
    const fetchBuilds = async () => {
      let { data, error } = await supabase.from('builds').select('*')
      if (error) console.log(error)
      else setBuilds(data)
    }
    fetchBuilds()
  }, [])

  return (
    <div>
      <h1>Builds</h1>
      {builds.map((build) => (
        <div key={build.id}>
          <h3>{build.title}</h3>
          <p>{build.description}</p>
        </div>
      ))}
    </div>
  )
}
