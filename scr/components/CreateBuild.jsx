import React, { useState, useEffect } from 'react'
import { supabase } from '../lib/supabaseClient'
import { useNavigate } from 'react-router-dom'

export default function CreateBuild() {
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [loading, setLoading] = useState(false)
  const [sessionInfo, setSessionInfo] = useState(null)
  const navigate = useNavigate()

  useEffect(() => {
    const getSession = async () => {
      const { data, error } = await supabase.auth.getSession()
      setSessionInfo(data?.session || null)
    }
    getSession()
  }, [])

  async function handleSubmit(e) {
    e.preventDefault()
    setLoading(true)

    const { data: { user }, error: userError } = await supabase.auth.getUser()

    if (userError || !user) {
      alert('Du måste vara inloggad för att skapa en build.')
      setLoading(false)
      return
    }

    const { error } = await supabase
      .from('builds')
      .insert([{ title, description, user_id: user.id }])

    setLoading(false)

    if (error) {
      alert('Fel vid skapande: ' + error.message)
    } else {
      alert('Build skapad!')
      navigate('/')
    }
  }

  return (
    <div>
      <h2>Skapa ny Build</h2>

      {/* 🔍 Visa session info för felsökning */}
      <div style={{ backgroundColor: '#eee', padding: '10px', marginBottom: '10px' }}>
        <strong>Inloggad:</strong> {sessionInfo ? 'Ja ✅' : 'Nej ❌'}<br />
        <strong>User ID:</strong> {sessionInfo?.user?.id || 'Ingen'}
      </div>

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Titel"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
        <br />
        <textarea
          placeholder="Beskrivning"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
        />
        <br />
        <button type="submit" disabled={loading}>
          {loading ? 'Sparar...' : 'Spara Build'}
        </button>
      </form>
    </div>
  )
}
