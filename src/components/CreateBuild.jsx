import React, { useState, useContext } from 'react'
import { useUser } from '../context/UserContext'
import { supabase } from '../lib/supabaseClient'
import { useNavigate } from 'react-router-dom'
import { BuildContext } from './BuildSystem/BuildContext'
import { classes, paths, skills, pets, items } from '../data/data'

export default function CreateBuild() {
  const { user } = useUser()
  const navigate = useNavigate()

  // Hämta formdata och setters från BuildContext
  const {
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
    setSelectedItems,
    resetBuild
  } = useContext(BuildContext)

  const [error, setError] = useState(null)

  // När klassen ändras, sätt första path automatiskt
  React.useEffect(() => {
    if (selectedClass) {
      const filteredPaths = paths.filter(p => p.classId === selectedClass)
      setSelectedPath(filteredPaths.length > 0 ? filteredPaths[0].id : '')
    } else {
      setSelectedPath('')
    }
  }, [selectedClass, setSelectedPath])

  const toggleSelect = (array, setArray, value) => {
    if (array.includes(value)) {
      setArray(array.filter(v => v !== value))
    } else {
      setArray([...array, value])
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError(null)

    if (!title.trim() || !selectedClass || !selectedPath) {
      setError('Titel, klass och väg är obligatoriska.')
      return
    }

    if (!user) {
      setError('Du måste vara inloggad för att skapa en build.')
      return
    }

    const buildData = {
      title: title.trim(),
      description: description.trim(),
      user_id: user.id,
      class_id: selectedClass,
      path_id: selectedPath,
      skills: selectedSkills,
      pets: selectedPets,
      items: selectedItems
    }

    const { error: insertError } = await supabase.from('builds').insert([buildData])

    if (insertError) {
      setError('Misslyckades med att spara builden: ' + insertError.message)
    } else {
      resetBuild()
      navigate('/my-builds')
    }
  }

  return (
    <form onSubmit={handleSubmit} style={{ maxWidth: 600, margin: '0 auto', padding: 20 }}>
      <h2>Skapa ny Build</h2>

      {error && <p style={{ color: 'red' }}>{error}</p>}

      <label>
        Titel:
        <input
          type="text"
          value={title}
          onChange={e => setTitle(e.target.value)}
          required
          style={{ width: '100%', padding: 8, marginBottom: 10 }}
        />
      </label>

      <label>
        Beskrivning:
        <textarea
          value={description}
          onChange={e => setDescription(e.target.value)}
          style={{ width: '100%', padding: 8, marginBottom: 10 }}
        />
      </label>

      <label>
        Klass:
        <select
          value={selectedClass}
          onChange={e => setSelectedClass(e.target.value)}
          required
          style={{ width: '100%', padding: 8, marginBottom: 10 }}
        >
          <option value="">Välj klass</option>
          {classes.map(c => (
            <option key={c.id} value={c.id}>
              {c.name}
            </option>
          ))}
        </select>
      </label>

      <label>
        Väg:
        <select
          value={selectedPath}
          onChange={e => setSelectedPath(e.target.value)}
          required
          disabled={!selectedClass}
          style={{ width: '100%', padding: 8, marginBottom: 10 }}
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
      </label>

      <fieldset style={{ marginBottom: 10 }}>
        <legend>Skills</legend>
        {skills.map(skill => (
          <label key={skill.id} style={{ display: 'block' }}>
            <input
              type="checkbox"
              checked={selectedSkills.includes(skill.id)}
              onChange={() => toggleSelect(selectedSkills, setSelectedSkills, skill.id)}
            />
            {skill.name}
          </label>
        ))}
      </fieldset>

      <fieldset style={{ marginBottom: 10 }}>
        <legend>Pets</legend>
        {pets.map(pet => (
          <label key={pet.id} style={{ display: 'block' }}>
            <input
              type="checkbox"
              checked={selectedPets.includes(pet.id)}
              onChange={() => toggleSelect(selectedPets, setSelectedPets, pet.id)}
            />
            {pet.name}
          </label>
        ))}
      </fieldset>

      <fieldset style={{ marginBottom: 10 }}>
        <legend>Items</legend>
        {items.map(item => (
          <label key={item.id} style={{ display: 'block' }}>
            <input
              type="checkbox"
              checked={selectedItems.includes(item.id)}
              onChange={() => toggleSelect(selectedItems, setSelectedItems, item.id)}
            />
            {item.name}
          </label>
        ))}
      </fieldset>

      <button type="submit" style={{ padding: '10px 20px', fontWeight: 'bold' }}>
        Skapa Build
      </button>
    </form>
  )
}
