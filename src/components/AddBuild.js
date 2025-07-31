import React, { useState } from 'react'
import { supabase } from '../supabaseClient'

export default function AddBuild({ onBuildAdded }) {
  const [name, setName] = useState('')
  const [classType, setClassType] = useState('')
  const [evolution, setEvolution] = useState('')
  const [loading, setLoading] = useState(false)

  const handleAdd = async () => {
    if (!name || !classType || !evolution) {
      alert('Please fill all fields')
      return
    }
    setLoading(true)
    const { error } = await supabase.from('builds').insert([
      { name, class: classType, evolution }
    ])
    setLoading(false)
    if (error) {
      alert('Error adding build: ' + error.message)
    } else {
      alert('Build added successfully!')
      setName('')
      setClassType('')
      setEvolution('')
      if (onBuildAdded) onBuildAdded()
    }
  }

  return (
    <div style={{ marginBottom: '2rem', border: '1px solid #ccc', padding: '1rem' }}>
      <h2>Add New Build</h2>
      <input
        type="text"
        placeholder="Build Name"
        value={name}
        onChange={e => setName(e.target.value)}
        style={{ display: 'block', marginBottom: '0.5rem', width: '100%' }}
      />
      <select
        value={classType}
        onChange={e => setClassType(e.target.value)}
        style={{ display: 'block', marginBottom: '0.5rem', width: '100%' }}
      >
        <option value="">Select Class</option>
        <option value="Archer">Archer</option>
        <option value="Swordsman">Swordsman</option>
        <option value="Mage">Mage</option>
      </select>
      <select
        value={evolution}
        onChange={e => setEvolution(e.target.value)}
        style={{ display: 'block', marginBottom: '0.5rem', width: '100%' }}
      >
        <option value="">Select Evolution Path</option>
        <option value="Path1">Path 1</option>
        <option value="Path2">Path 2</option>
      </select>
      <button onClick={handleAdd} disabled={loading} style={{ width: '100%' }}>
        {loading ? 'Adding...' : 'Add Build'}
      </button>
    </div>
  )
}
