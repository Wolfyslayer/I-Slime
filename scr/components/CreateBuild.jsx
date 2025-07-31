import React, { useState } from 'react'
import { supabase } from '../lib/supabaseClient'
import { useNavigate } from 'react-router-dom'

export default function CreateBuild() {
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

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
    <form onSubmit={handleSubmit}>
      <h2>Skapa ny Build</h2>
      <input
        type="text"
        placeholder="Titel"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        required
      />
      <textarea
        placeholder="Beskrivning"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        required
      />
      <button type="submit" disabled={loading}>
        {loading ? 'Sparar...' : 'Spara Build'}
      </button>
    </form>
  )
}
    <form onSubmit={handleSubmit}>
      <h2>Skapa ny Build</h2>
      <input
        type="text"
        placeholder="Titel"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        required
      />
      <textarea
        placeholder="Beskrivning"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        required
      />
      <button type="submit" disabled={loading}>
        {loading ? 'Sparar...' : 'Spara Build'}
      </button>
    </form>
  )
}

  return (
    <form onSubmit={handleSubmit}>
      <h2>Skapa ny Build</h2>
      <input
        type="text"
        placeholder="Titel"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        required
      />
      <textarea
        placeholder="Beskrivning"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        required
      />
      <button type="submit" disabled={loading}>
        {loading ? 'Sparar...' : 'Spara Build'}
      </button>
    </form>
  )
}                                                                                                                                <textarea                                                                                                                                        placeholder="Beskrivning"
                                                                                                                                                value={description}
                                                                                                                                                        onChange={(e) => setDescription(e.target.value)}
                                                                                                                                                                required
                                                                                                                                                                      />
                                                                                                                                                                            <button type="submit" disabled={loading}>
                                                                                                                                                                                    {loading ? 'Sparar...' : 'Spara Build'}
                                                                                                                                                                                          </button>
                                                                                                                                                                                              </form>
                                                                                                                                                                                                )
                                                                                                                                                                                                }
                                                                                                                                                                                                
