import React, { useEffect, useState } from 'react'
import { supabase } from '../supabaseClient'

export default function BuildList({ search, filters, user }) {
  const [builds, setBuilds] = useState([])

  useEffect(() => {
    fetchBuilds()
  }, [search, filters])

  async function fetchBuilds() {
    let query = supabase.from('builds').select('*')

    // Filter class and evolution if set
    if (filters.class) query = query.eq('class', filters.class)
    if (filters.evolution) query = query.eq('evolution', filters.evolution)

    // Fetch data
    let { data, error } = await query
    if (error) {
      alert('Error fetching builds: ' + error.message)
      return
    }

    // Filter by search locally (assuming no full text in DB)
    if (search) {
      data = data.filter(b =>
        b.name.toLowerCase().includes(search.toLowerCase())
      )
    }

    setBuilds(data)
  }

  async function handleLike(buildId) {
    if (!user) {
      alert('You must be logged in to like builds')
      return
    }
    const { error } = await supabase
      .from('build_likes')
      .insert([{ build_id: buildId, user_id: user.id }])
    if (error) alert('Error liking build: ' + error.message)
    else fetchBuilds()
  }

  async function handleReport(buildId) {
    if (!user) {
      alert('You must be logged in to report builds')
      return
    }
    const { error } = await supabase
      .from('build_reports')
      .insert([{ build_id: buildId, user_id: user.id }])
    if (error) alert('Error reporting build: ' + error.message)
    else alert('Build reported')
  }

  return (
    <div>
      {builds.length === 0 && <p>No builds found.</p>}
      <ul>
        {builds.map(b => (
          <li key={b.id} style={{ marginBottom: '1rem' }}>
            <strong>{b.name}</strong> — Class: {b.class}, Evolution: {b.evolution} <br />
            <button onClick={() => handleLike(b.id)}>Like</button>
            <button onClick={() => handleReport(b.id)} style={{ marginLeft: '1rem' }}>
              Report
            </button>
          </li>
        ))}
      </ul>
    </div>
  )
}
