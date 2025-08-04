import React, { useState, useContext, useEffect } from 'react'
import { useUser } from '../context/UserContext'
import { supabase } from '../lib/supabaseClient'
import { useNavigate } from 'react-router-dom'
import { BuildContext } from './BuildSystem/BuildContext'
import { classes, paths, skills, pets } from '../data/data'

const itemCategories = [
  'weapon',
  'gloves',
  'armguards',
  'boots',
  'mask',
  'chest',
  'pants',
  'shoulder',
  'helmet',
  'belt'
];

const statOptions = [
  { value: '', label: 'Välj stat' },
  { value: 'crit_hit', label: 'Crit Hit' },
  { value: 'combo', label: 'Combo' },
  { value: 'counter', label: 'Counter' },
  { value: 'skill_crit_hit', label: 'Skill Crit Hit' },
  { value: 'recover', label: 'Recover' },
  { value: 'dodge', label: 'Dodge' },
  { value: 'stun', label: 'Stun' },
];

export default function CreateBuild() {
  const { user } = useUser()
  const navigate = useNavigate()

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
    resetBuild
  } = useContext(BuildContext)

  const [error, setError] = useState(null)

  // Item stats state
  const [selectedItems, setSelectedItems] = useState(() => {
    const initial = {};
    itemCategories.forEach(cat => {
      initial[cat] = { stat1: '', stat2: '', atkSpd: false };
    });
    return initial;
  });

  // När klassen ändras, sätt första path automatiskt
  useEffect(() => {
    if (selectedClass) {
      const filteredPaths = paths.filter(p => p.classId === selectedClass)
      setSelectedPath(filteredPaths.length > 0 ? filteredPaths[0].id : '')
    } else {
      setSelectedPath('')
    }
  }, [selectedClass, setSelectedPath])

  // Toggle för skills och pets (behålls som checkboxar eller uppdateras till ikoner enligt ditt val)
  const toggleSelect = (array, setArray, value) => {
    if (array.includes(value)) {
      setArray(array.filter(v => v !== value))
    } else {
      setArray([...array, value])
    }
  }

  const handleStatChange = (category, statKey, value) => {
    setSelectedItems(prev => ({
      ...prev,
      [category]: {
        ...prev[category],
        [statKey]: value
      }
    }));
  };

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
      items: selectedItems // sparar objekt med statval per kategori
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
    <form onSubmit={handleSubmit} style={{ maxWidth: 700, margin: '0 auto', padding: 20 }}>
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

      {/* Här kan du lägga till dina Pets och Skills med ikoner eller checkboxar som du önskar */}

      <fieldset style={{ marginBottom: 15 }}>
        <legend>Skills</legend>
        {skills.map(skill => (
          <label key={skill.id} style={{ display: 'inline-block', margin: '5px', cursor: 'pointer' }}>
            <input
              type="checkbox"
              checked={selectedSkills.includes(skill.id)}
              onChange={() => toggleSelect(selectedSkills, setSelectedSkills, skill.id)}
              style={{ display: 'none' }}
              id={`skill-checkbox-${skill.id}`}
            />
            <img
              src={skill.icon}
              alt={skill.name}
              style={{
                border: selectedSkills.includes(skill.id) ? '3px solid #4caf50' : '2px solid #ccc',
                borderRadius: 4,
                width: 50,
                height: 50,
                objectFit: 'cover',
              }}
              onClick={() => toggleSelect(selectedSkills, setSelectedSkills, skill.id)}
            />
          </label>
        ))}
      </fieldset>

      <fieldset style={{ marginBottom: 15 }}>
        <legend>Pets</legend>
        {pets.map(pet => (
          <label key={pet.id} style={{ display: 'inline-block', margin: '5px', cursor: 'pointer' }}>
            <input
              type="checkbox"
              checked={selectedPets.includes(pet.id)}
              onChange={() => toggleSelect(selectedPets, setSelectedPets, pet.id)}
              style={{ display: 'none' }}
              id={`pet-checkbox-${pet.id}`}
            />
            <img
              src={pet.icon}
              alt={pet.name}
              style={{
                border: selectedPets.includes(pet.id) ? '3px solid #4caf50' : '2px solid #ccc',
                borderRadius: 4,
                width: 50,
                height: 50,
                objectFit: 'cover',
              }}
              onClick={() => toggleSelect(selectedPets, setSelectedPets, pet.id)}
            />
          </label>
        ))}
      </fieldset>

      {/* Items stats */}
      <fieldset style={{ marginBottom: 15 }}>
        <legend>Items Stats</legend>
        {itemCategories.map(category => (
          <div key={category} style={{ marginBottom: 15, border: '1px solid #ddd', padding: 10, borderRadius: 6 }}>
            <h4 style={{ textTransform: 'capitalize', marginBottom: 10 }}>{category}</h4>
            <select
              value={selectedItems[category].stat1}
              onChange={e => handleStatChange(category, 'stat1', e.target.value)}
              style={{ marginRight: 10, padding: 6 }}
            >
              {statOptions.map(opt => (
                <option key={opt.value} value={opt.value}>{opt.label}</option>
              ))}
            </select>

            <select
              value={selectedItems[category].stat2}
              onChange={e => handleStatChange(category, 'stat2', e.target.value)}
              style={{ marginRight: 10, padding: 6 }}
            >
              {statOptions.map(opt => (
                <option key={opt.value} value={opt.value}>{opt.label}</option>
              ))}
            </select>

            <label style={{ cursor: 'pointer', userSelect: 'none' }}>
              <input
                type="checkbox"
                checked={selectedItems[category].atkSpd}
                onChange={e => handleStatChange(category, 'atkSpd', e.target.checked)}
                style={{ marginLeft: 5 }}
              />
              Atk Spd
            </label>
          </div>
        ))}
      </fieldset>

      <button type="submit" style={{ padding: '10px 20px', fontWeight: 'bold' }}>
        Skapa Build
      </button>
    </form>
  )
        }
    
