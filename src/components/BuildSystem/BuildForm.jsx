import React, { useContext, useEffect } from 'react'
import { BuildContext } from './BuildContext'

export default function BuildForm() {
  const {
    classes,
    paths,
    skills,
    pets,
    items,
    title,
    setTitle,
    description,
    setDescription,
    selectedClass,
    setSelectedClass,
    selectedPath,
    setSelectedPath,
    selectedSkills,
    setSelectedSkills,
    selectedPets,
    setSelectedPets,
    selectedItems,
    setSelectedItems
  } = useContext(BuildContext)

  // Auto-updatera paths när klass ändras
  useEffect(() => {
    if (selectedClass) {
      const filtered = paths.filter(p => p.classId === selectedClass)
      setSelectedPath(filtered.length > 0 ? filtered[0].id : '')
    } else {
      setSelectedPath('')
    }
  }, [selectedClass])

  const toggle = (array, setter, id) => {
    setter(prev =>
      prev.includes(id)
        ? prev.filter(v => v !== id)
        : [...prev, id]
    )
  }

  return (
    <>
      <label>Titel</label>
      <input value={title} onChange={e => setTitle(e.target.value)} required />

      <label>Beskrivning</label>
      <textarea value={description} onChange={e => setDescription(e.target.value)} />

      <label>Klass</label>
      <select
        value={selectedClass}
        onChange={e => setSelectedClass(e.target.value)}
        required
      >
        <option value="">Välj klass</option>
        {classes.map(c => (
          <option key={c.id} value={c.id}>{c.name}</option>
        ))}
      </select>

      <label>Väg</label>
      <select
        value={selectedPath}
        onChange={e => setSelectedPath(e.target.value)}
        required
        disabled={!selectedClass}
      >
        <option value="">Välj väg</option>
        {paths.filter(p => p.classId === selectedClass).map(p => (
          <option key={p.id} value={p.id}>{p.name}</option>
        ))}
      </select>

      <label>Skills</label>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
        {skills.map(s => (
          <button
            key={s.id}
            type="button"
            onClick={() => toggle(selectedSkills, setSelectedSkills, s.id)}
            style={{
              padding: '5px 10px',
              marginBottom: '0.3rem',
              background: selectedSkills.includes(s.id) ? '#022' : '#111',
              color: '#0ff',
              border: selectedSkills.includes(s.id) ? '2px solid #0ff' : '1px solid #444'
            }}
          >
            {s.name}
          </button>
        ))}
      </div>

      <label>Pets</label>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
        {pets.map(p => (
          <button
            key={p.id}
            type="button"
            onClick={() => toggle(selectedPets, setSelectedPets, p.id)}
            style={{
              padding: '5px 10px',
              background: selectedPets.includes(p.id) ? '#022' : '#111',
              color: '#0ff',
              border: selectedPets.includes(p.id) ? '2px solid #0ff' : '1px solid #444'
            }}
          >
            {p.name}
          </button>
        ))}
      </div>

      <label>Items</label>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
        {items.map(i => (
          <button
            key={i.id}
            type="button"
            onClick={() => toggle(selectedItems, setSelectedItems, i.id)}
            style={{
              padding: '5px 10px',
              background: selectedItems.includes(i.id) ? '#022' : '#111',
              color: '#0ff',
              border: selectedItems.includes(i.id) ? '2px solid #0ff' : '1px solid #444'
            }}
          >
            {i.name}
          </button>
        ))}
      </div>
    </>
  )
}
