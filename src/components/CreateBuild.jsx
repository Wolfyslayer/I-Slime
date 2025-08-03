import React, { useState, useEffect } from 'react'
import { supabase } from '../lib/supabaseClient'
import { useTranslation } from 'react-i18next'
import { classes, paths, skills, pets, items } from '../data/data'

export default function CreateBuild() {
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [selectedClass, setSelectedClass] = useState('')
  const [selectedPath, setSelectedPath] = useState('')
  const [selectedSkills, setSelectedSkills] = useState([])
  const [selectedPets, setSelectedPets] = useState([])
  const [selectedItems, setSelectedItems] = useState([])
  const [error, setError] = useState('')
  const { t } = useTranslation()

  // När selectedClass ändras, sätt default path som första path för den klassen
  useEffect(() => {
    if (selectedClass) {
      const filteredPaths = paths.filter(p => p.classId === selectedClass)
      setSelectedPath(filteredPaths.length > 0 ? filteredPaths[0].id : '')
    } else {
      setSelectedPath('')
    }
  }, [selectedClass])

  const toggleSelect = (array, setArray, value) => {
    if (array.includes(value)) {
      setArray(array.filter(v => v !== value))
    } else {
      setArray([...array, value])
    }
  }

  const handleCreate = async (e) => {
    e.preventDefault()
    setError('')

    const user = supabase.auth.user()
    if (!user) {
      setError(t('You must be logged in to create a build.'))
      return
    }

    if (!selectedClass || !selectedPath) {
      setError(t('Please select class and path.'))
      return
    }

    const buildData = {
      title,
      description,
      user_id: user.id,
      classId: selectedClass,
      pathId: selectedPath,
      skills: selectedSkills,
      pets: selectedPets,
      items: selectedItems
    }

    const { error } = await supabase.from('builds').insert([buildData])
    if (error) {
      setError(error.message)
    } else {
      alert(t('Build created!'))
      // Nollställ formulärfält
      setTitle('')
      setDescription('')
      setSelectedClass('')
      setSelectedPath('')
      setSelectedSkills([])
      setSelectedPets([])
      setSelectedItems([])
      setError('')
    }
  }

  return (
    <form
      onSubmit={handleCreate}
      style={{
        maxWidth: 600,
        margin: '0 auto',
        padding: 20,
        background: 'rgba(0,0,0,0.6)',
        borderRadius: 8
      }}
    >
      <h2>{t('Create New Build')}</h2>

      <input
        type="text"
        placeholder={t('Title')}
        value={title}
        onChange={e => setTitle(e.target.value)}
        required
        style={{ width: '100%', padding: 8, marginBottom: 10, borderRadius: 4, border: 'none' }}
      />

      <textarea
        placeholder={t('Description')}
        value={description}
        onChange={e => setDescription(e.target.value)}
        required
        style={{ width: '100%', padding: 8, marginBottom: 10, borderRadius: 4, border: 'none', resize: 'vertical' }}
      />

      <label>{t('Class')}</label>
      <select
        value={selectedClass}
        onChange={e => setSelectedClass(e.target.value)}
        required
        style={{ width: '100%', padding: 8, marginBottom: 10, borderRadius: 4, border: 'none' }}
      >
        <option value="">{t('Select Class')}</option>
        {classes.map(c => (
          <option key={c.id} value={c.id}>
            {c.name}
          </option>
        ))}
      </select>

      <label>{t('Path')}</label>
      <select
        value={selectedPath}
        onChange={e => setSelectedPath(e.target.value)}
        required
        disabled={!selectedClass}
        style={{ width: '100%', padding: 8, marginBottom: 10, borderRadius: 4, border: 'none' }}
      >
        {selectedClass &&
          paths
            .filter(p => p.classId === selectedClass)
            .map(p => (
              <option key={p.id} value={p.id}>
                {p.name}
              </option>
            ))}
      </select>

      <label>{t('Skills')}</label>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10, marginBottom: 10 }}>
        {skills.map(skill => (
          <button
            key={skill.id}
            type="button"
            onClick={() => toggleSelect(selectedSkills, setSelectedSkills, skill.id)}
            style={{
              padding: '5px 10px',
              borderRadius: 4,
              border: selectedSkills.includes(skill.id) ? '2px solid #0ff' : '1px solid #444',
              background: selectedSkills.includes(skill.id) ? '#022' : '#111',
              color: '#0ff',
              cursor: 'pointer'
            }}
          >
            {skill.name}
          </button>
        ))}
      </div>

      <label>{t('Pets')}</label>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10, marginBottom: 10 }}>
        {pets.map(pet => (
          <button
            key={pet.id}
            type="button"
            onClick={() => toggleSelect(selectedPets, setSelectedPets, pet.id)}
            style={{
              padding: '5px 10px',
              borderRadius: 4,
              border: selectedPets.includes(pet.id) ? '2px solid #0ff' : '1px solid #444',
              background: selectedPets.includes(pet.id) ? '#022' : '#111',
              color: '#0ff',
              cursor: 'pointer'
            }}
          >
            {pet.name}
          </button>
        ))}
      </div>

      <label>{t('Items')}</label>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10, marginBottom: 10 }}>
        {items.map(item => (
          <button
            key={item.id}
            type="button"
            onClick={() => toggleSelect(selectedItems, setSelectedItems, item.id)}
            style={{
              padding: '5px 10px',
              borderRadius: 4,
              border: selectedItems.includes(item.id) ? '2px solid #0ff' : '1px solid #444',
              background: selectedItems.includes(item.id) ? '#022' : '#111',
              color: '#0ff',
              cursor: 'pointer'
            }}
          >
            {item.name}
          </button>
        ))}
      </div>

      <button
        type="submit"
        style={{
          backgroundColor: '#00f9ff',
          color: '#000',
          fontWeight: 'bold',
          padding: '10px 20px',
          borderRadius: 6,
          border: 'none',
          cursor: 'pointer',
          width: '100%'
        }}
      >
        {t('Create Build')}
      </button>

      {error && <p style={{ color: 'red', marginTop: 10 }}>{error}</p>}
    </form>
  )
}
