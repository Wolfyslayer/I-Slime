import React, { useState, useEffect } from 'react'
import { useUser } from '../context/UserContext'
import { supabase } from '../lib/supabaseClient'
import { useNavigate } from 'react-router-dom'
import { useBuild } from './BuildSystem/BuildContext'
import { classes, paths, skills, pets, itemCategories, statOptions } from '../data/data'
import { useTranslation } from 'react-i18next'
import './CreateBuild.css'

export default function CreateBuild() {
  const { user } = useUser()
  const navigate = useNavigate()
  const { t } = useTranslation()

  const {
    title, setTitle,
    description, setDescription,
    selectedClass, setSelectedClass,
    selectedPath, setSelectedPath,
    selectedSkills = [], setSelectedSkills,
    selectedPets = [], setSelectedPets,
    selectedItems, setSelectedItems,
    resetBuild
  } = useBuild()

  const [error, setError] = useState(null)

  // Justera path baserat på klass
  useEffect(() => {
    if (selectedClass) {
      const filteredPaths = paths.filter(p => p.classId === selectedClass)
      setSelectedPath(filteredPaths.length > 0 ? filteredPaths[0].id : '')
    } else {
      setSelectedPath('')
    }
  }, [selectedClass, setSelectedPath])

  const toggleSelect = (array, setArray, value, max = 5) => {
    if (array.includes(value)) {
      setArray(array.filter(v => v !== value))
    } else if (array.length < max) {
      setArray([...array, value])
    }
  }

  const handleStatChange = (category, key, value) => {
    setSelectedItems(prev => ({
      ...prev,
      [category]: {
        ...prev[category],
        [key]: value
      }
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError(null)

    if (!title.trim() || !selectedClass || !selectedPath) {
      setError(t('Title, class and path are required.'))
      return
    }

    if (!user) {
      setError(t('You must be logged in to create a build.'))
      return
    }

    const buildData = {
      title: title.trim(),
      description: description?.trim() || '',
      user_id: user.id,
      class_id: selectedClass,
      path_id: selectedPath,
      skills: selectedSkills,
      pets: selectedPets,
      items: selectedItems
    }

    const { error: insertError } = await supabase.from('builds').insert([buildData])

    if (insertError) {
      setError(t('Failed to save the build:') + ' ' + insertError.message)
    } else {
      resetBuild()
      navigate('/my-builds')
    }
  }

  return (
    <form onSubmit={handleSubmit} style={{ maxWidth: 700, margin: '0 auto', padding: 20 }}>
      <h2>{t('Create new Build')}</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}

      <label>
        {t('Title')}:
        <input
          type="text"
          value={title}
          onChange={e => setTitle(e.target.value)}
          required
          style={{ width: '100%', padding: 8, marginBottom: 10 }}
        />
      </label>

      <label>
        {t('Description')}:
        <textarea
          value={description}
          onChange={e => setDescription(e.target.value)}
          style={{ width: '100%', padding: 8, marginBottom: 10 }}
        />
      </label>

      <label>
        {t('Class')}:
        <select
          value={selectedClass}
          onChange={e => setSelectedClass(e.target.value)}
          required
          style={{ width: '100%', padding: 8, marginBottom: 10 }}
        >
          <option value="">{t('Choose class')}</option>
          {classes.map(c => (
            <option key={c.id} value={c.id}>{t(c.name)}</option>
          ))}
        </select>
      </label>

      <label>
        {t('Path')}:
        <select
          value={selectedPath}
          onChange={e => setSelectedPath(e.target.value)}
          required
          disabled={!selectedClass}
          style={{ width: '100%', padding: 8, marginBottom: 10 }}
        >
          {paths
            .filter(p => p.classId === selectedClass)
            .map(p => (
              <option key={p.id} value={p.id}>{t(p.name)}</option>
            ))}
        </select>
      </label>

      {/* Valda Skills Preview */}
      <div style={{ marginBottom: 10 }}>
        <h4>{t('Selected Skills:')}:</h4>
        <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', minHeight: 60 }}>
          {selectedSkills.length === 0 && <em>{t('No selected skills')}</em>}
          {selectedSkills.map(skillId => {
            const skill = skills.find(s => s.id === skillId)
            return (
              <img
                key={skillId}
                src={skill?.icon}
                alt={skill?.name}
                title={skill?.name}
                style={{
                  width: 40,
                  height: 40,
                  border: '2px solid #4caf50',
                  borderRadius: 4,
                  objectFit: 'cover',
                }}
              />
            )
          })}
        </div>
      </div>

      {/* Skills Väljare med max 3 rader + scroll */}
      <fieldset style={{ marginBottom: 15 }}>
        <legend>{t('Skills')}</legend>
        <div
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: 10,
            maxHeight: 180,
            overflowY: 'auto',
            border: '1px solid #ddd',
            padding: 8,
            borderRadius: 6,
          }}
        >
          {skills.map(skill => {
            const isSelected = selectedSkills.includes(skill.id)
            return (
              <div
                key={skill.id}
                onClick={() => toggleSelect(selectedSkills, setSelectedSkills, skill.id)}
                style={{
                  width: 50,
                  height: 50,
                  border: isSelected ? '3px solid #4caf50' : '2px solid #ccc',
                  borderRadius: 4,
                  overflow: 'hidden',
                  cursor: 'pointer'
                }}
                title={`${skill.name}: ${skill.description}`}
              >
                <img src={skill.icon} alt={skill.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              </div>
            )
          })}
        </div>
      </fieldset>

      {/* Valda Pets Preview */}
      <div style={{ marginBottom: 10 }}>
        <h4>{t('Selected Pets:')}:</h4>
        <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', minHeight: 60 }}>
          {selectedPets.length === 0 && <em>{t('No selected pets')}</em>}
          {selectedPets.map(petId => {
            const pet = pets.find(p => p.id === petId)
            return (
              <img
                key={petId}
                src={pet?.icon}
                alt={pet?.name}
                title={pet?.name}
                style={{
                  width: 40,
                  height: 40,
                  border: '2px solid #4caf50',
                  borderRadius: 4,
                  objectFit: 'cover',
                }}
              />
            )
          })}
        </div>
      </div>

      {/* Pets Väljare med max 3 rader + scroll */}
      <fieldset style={{ marginBottom: 15 }}>
        <legend>{t('Pets')}</legend>
        <div
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: 10,
            maxHeight: 180,
            overflowY: 'auto',
            border: '1px solid #ddd',
            padding: 8,
            borderRadius: 6,
          }}
        >
          {pets.map(pet => {
            const isSelected = selectedPets.includes(pet.id)
            return (
              <div
                key={pet.id}
                onClick={() => toggleSelect(selectedPets, setSelectedPets, pet.id)}
                style={{
                  width: 50,
                  height: 50,
                  border: isSelected ? '3px solid #4caf50' : '2px solid #ccc',
                  borderRadius: 4,
                  overflow: 'hidden',
                  cursor: 'pointer'
                }}
                title={`${pet.name}: ${pet.description}`}
              >
                <img src={pet.icon} alt={pet.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              </div>
            )
          })}
        </div>
      </fieldset>

      {/* Items Stats */}
      <fieldset style={{ marginBottom: 15 }}>
        <legend>{t('Items Stats')}</legend>
        {itemCategories.map(category => (
          <div key={category} style={{ marginBottom: 15, border: '1px solid #ddd', padding: 10, borderRadius: 6 }}>
            <h4 style={{ textTransform: 'capitalize', marginBottom: 10 }}>{t(category)}</h4>
            <select
              value={selectedItems[category].stat1}
              onChange={e => handleStatChange(category, 'stat1', e.target.value)}
              style={{ marginRight: 10, padding: 6 }}
            >
              <option value="">{t('Stat 1')}</option>
              {statOptions.map(opt => (
                <option key={opt.value} value={opt.value}>{t(opt.label)}</option>
              ))}
            </select>

            <select
              value={selectedItems[category].stat2}
              onChange={e => handleStatChange(category, 'stat2', e.target.value)}
              style={{ marginRight: 10, padding: 6 }}
            >
              <option value="">{t('Stat 2')}</option>
              {statOptions.map(opt => (
                <option key={opt.value} value={opt.value}>{t(opt.label)}</option>
              ))}
            </select>

            <label style={{ cursor: 'pointer', userSelect: 'none' }}>
              <input
                type="checkbox"
                checked={selectedItems[category].atkSpd}
                onChange={e => handleStatChange(category, 'atkSpd', e.target.checked)}
              /> {t('Attack Speed')}
            </label>
          </div>
        ))}
      </fieldset>

      <button type="submit" style={{ padding: '10px 20px', fontSize: 16 }}>{t('Create')}</button>
    </form>
  )
}
