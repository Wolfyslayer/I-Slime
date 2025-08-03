import React, { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { supabase } from '../lib/supabaseClient'
import { classes, paths, skills, pets, items } from '../data/data'
import { useTranslation } from 'react-i18next'

export default function EditBuild() {
  const { id } = useParams()
  const navigate = useNavigate()
  const { t } = useTranslation()

  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [selectedClass, setSelectedClass] = useState('')
  const [selectedPath, setSelectedPath] = useState('')
  const [selectedSkills, setSelectedSkills] = useState([])
  const [selectedPets, setSelectedPets] = useState([])
  const [selectedItems, setSelectedItems] = useState([])
  const [error, setError] = useState('')

  useEffect(() => {
    async function fetchBuild() {
      const { data, error } = await supabase
        .from('builds')
        .select('*')
        .eq('id', id)
        .single()

      if (error) {
        setError(error.message)
      } else if (data) {
        setTitle(data.title)
        setDescription(data.description)
        setSelectedClass(data.class || '')  // assuming string class
        setSelectedPath(data.path || '')    // assuming string path
        setSelectedSkills(data.skills || [])
        setSelectedPets(data.pets || [])
        setSelectedItems(data.items || [])
      }
    }
    fetchBuild()
  }, [id])

  // Uppdatera path när klass ändras (som i CreateBuild)
  useEffect(() => {
    if (selectedClass && paths[selectedClass]) {
      if (!paths[selectedClass].includes(selectedPath)) {
        setSelectedPath(paths[selectedClass][0])
      }
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

  const handleUpdate = async (e) => {
    e.preventDefault()
    const user = supabase.auth.user()
    if (!user) {
      setError(t('You must be logged in to edit a build.'))
      return
    }
    const { error } = await supabase
      .from('builds')
      .update({
        title,
        description,
        class: selectedClass,
        path: selectedPath,
        skills: selectedSkills,
        pets: selectedPets,
        items: selectedItems,
      })
      .eq('id', id)

    if (error) setError(error.message)
    else {
      alert(t('Build updated!'))
      navigate(`/BuildDetail/${id}`)  // matcha route i App.jsx
    }
  }

  return (
    <form onSubmit={handleUpdate} style={{ maxWidth: 600, margin: '0 auto', padding: 20, background: 'rgba(0,0,0,0.6)', borderRadius: 8, color: '#0ff' }}>
      <h2>{t('Edit Build')}</h2>
      <input
        type="text"
        placeholder={t('Title')}
        value={title}
        onChange={e => setTitle(e.target.value)}
        required
        style={{ width: '100%', padding: 8, marginBottom: 10, borderRadius: 4, border: 'none', background: '#111', color: '#0ff' }}
      />
      <textarea
        placeholder={t('Description')}
        value={description}
        onChange={e => setDescription(e.target.value)}
        required
        style={{ width: '100%', padding: 8, marginBottom: 10, borderRadius: 4, border: 'none', resize: 'vertical', background: '#111', color: '#0ff' }}
      />

      <label>{t('Class')}</label>
      <select
        value={selectedClass}
        onChange={e => setSelectedClass(e.target.value)}
        required
        style={{ width: '100%', padding: 8, marginBottom: 10, borderRadius: 4, border: 'none', background: '#111', color: '#0ff' }}
      >
        <option value="">{t('Select Class')}</option>
        {classes.map(c => (
          <option key={c} value={c}>{c}</option>
        ))}
      </select>

      <label>{t('Path')}</label>
      <select
        value={selectedPath}
        onChange={e => setSelectedPath(e.target.value)}
        required
        disabled={!selectedClass}
        style={{ width: '100%', padding: 8, marginBottom: 10, borderRadius: 4, border: 'none', background: '#111', color: '#0ff' }}
      >
        {selectedClass && paths[selectedClass].map(p => (
          <option key={p} value={p}>{p}</option>
        ))}
      </select>

      <label>{t('Skills')}</label>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10, marginBottom: 10 }}>
        {skills.map(skill => (
          <button
            key={skill}
            type="button"
            onClick={() => toggleSelect(selectedSkills, setSelectedSkills, skill)}
            style={{
              padding: '5px 10px',
              borderRadius: 4,
              border: selectedSkills.includes(skill) ? '2px solid #0ff' : '1px solid #444',
              background: selectedSkills.includes(skill) ? '#022' : '#111',
              color: '#0ff',
              cursor: 'pointer'
            }}
          >
            {skill}
          </button>
        ))}
      </div>

      <label>{t('Pets')}</label>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10, marginBottom: 10 }}>
        {pets.map(pet => (
          <button
            key={pet}
            type="button"
            onClick={() => toggleSelect(selectedPets, setSelectedPets, pet)}
            style={{
              padding: '5px 10px',
              borderRadius: 4,
              border: selectedPets.includes(pet) ? '2px solid #0ff' : '1px solid #444',
              background: selectedPets.includes(pet) ? '#022' : '#111',
              color: '#0ff',
              cursor: 'pointer'
            }}
          >
            {pet}
          </button>
        ))}
      </div>

      <label>{t('Items')}</label>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10, marginBottom: 10 }}>
        {items.map(item => (
          <button
            key={item}
            type="button"
            onClick={() => toggleSelect(selectedItems, setSelectedItems, item)}
            style={{
              padding: '5px 10px',
              borderRadius: 4,
              border: selectedItems.includes(item) ? '2px solid #0ff' : '1px solid #444',
              background: selectedItems.includes(item) ? '#022' : '#111',
              color: '#0ff',
              cursor: 'pointer'
            }}
          >
            {item}
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
        {t('Update Build')}
      </button>

      {error && <p style={{ color: 'red', marginTop: 10 }}>{error}</p>}
    </form>
  )
}
