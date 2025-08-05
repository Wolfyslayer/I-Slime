import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { supabase } from '../lib/supabaseClient'
import { useBuild } from './BuildSystem/BuildContext'
import { itemCategories, statOptions } from '../data/data'
import { useTranslation } from 'react-i18next'
import '../styles/build.css'

export default function EditBuild() {
  const { id } = useParams()
  const { t } = useTranslation()
  const {
    user,
    title, setTitle,
    description, setDescription,
    selectedClass, setSelectedClass,
    selectedPath, setSelectedPath,
    selectedSkills, setSelectedSkills,
    selectedPets, setSelectedPets,
    selectedItems, setSelectedItems,
    resetBuild,
    classes,
    paths,
    skills,
    pets,
  } = useBuild()

  const [error, setError] = useState(null)
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [successMessage, setSuccessMessage] = useState('')

  useEffect(() => {
    const fetchBuild = async () => {
      setLoading(true)
      const { data, error } = await supabase
        .from('builds')
        .select('*')
        .eq('id', id)
        .single()

      if (error || !data) {
        setError(t('Build not found'))
        setLoading(false)
        return
      }

      setTitle(data.title || '')
      setDescription(data.description || '')
      setSelectedClass(data.class_id || '')
      setSelectedPath(data.path_id || '')
      setSelectedSkills(Array.isArray(data.skills) ? data.skills : [])
      setSelectedPets(Array.isArray(data.pets) ? data.pets : [])

      // Säkerställ att selectedItems alltid är ett objekt med alla kategorier
      const safeItems = {}
      itemCategories.forEach(cat => {
        safeItems[cat] = {
          stat1: data.items?.[cat]?.stat1 || '',
          stat2: data.items?.[cat]?.stat2 || '',
          atkSpd: !!data.items?.[cat]?.atkSpd,
        }
      })
      setSelectedItems(safeItems)
      setLoading(false)
    }

    fetchBuild()
  }, [id, setTitle, setDescription, setSelectedClass, setSelectedPath, setSelectedSkills, setSelectedPets, setSelectedItems])

  // När klass ändras, uppdatera väg
  useEffect(() => {
    if (selectedClass) {
      const filteredPaths = paths.filter(p => p.classId === selectedClass)
      setSelectedPath(filteredPaths.length > 0 ? filteredPaths[0].id : '')
    } else {
      setSelectedPath('')
    }
  }, [selectedClass, paths, setSelectedPath])

  const toggleSelect = (array, setArray, value, max = 5) => {
    if (array.includes(value)) {
      setArray(array.filter(v => v !== value))
    } else if (array.length < max) {
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
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError(null)
    setSuccessMessage('')
    setSaving(true)

    if (!title.trim() || !selectedClass || !selectedPath) {
      setError(t('Title, class and path are required.'))
      setSaving(false)
      return
    }

    if (!user) {
      setError(t('You must be logged in to create a build.'))
      setSaving(false)
      return
    }

    const updatedBuild = {
      title: title.trim(),
      description: description?.trim() || '',
      class_id: selectedClass,
      path_id: selectedPath,
      skills: Array.isArray(selectedSkills) ? selectedSkills : [],
      pets: Array.isArray(selectedPets) ? selectedPets : [],
      items: selectedItems && typeof selectedItems === 'object' ? selectedItems : {}
    }

    const { error: updateError } = await supabase
      .from('builds')
      .update(updatedBuild)
      .eq('id', id)

    if (updateError) {
      setError(t('Failed to update the build:') + ' ' + updateError.message)
    } else {
      setSuccessMessage(t('Changes saved!'))
    }

    setSaving(false)
  }

  if (loading) {
    return <div style={{ textAlign: 'center', padding: 40 }}>{t('Loading build...')}</div>
  }

  return (
    <form onSubmit={handleSubmit} style={{ maxWidth: 700, margin: '0 auto', padding: 20 }}>
      <h2>{t('Edit Build')}</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {successMessage && <p style={{ color: 'green' }}>{successMessage}</p>}

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

      {/* Valda skills */}
      <div style={{ display: 'flex', gap: 8, marginBottom: 10, flexWrap: 'wrap' }}>
        {selectedSkills.map(skillId => {
          const skill = skills.find(s => s.id === skillId)
          return (
            <img
              key={skillId}
              src={skill?.cardImage}
              alt={`Skill ${skillId}`}
              title={skill?.name}
              style={{
                width: 60,
                height: 80,
                border: '2px solid #4caf50',
                borderRadius: 4,
                objectFit: 'cover',
              }}
            />
          )
        })}
      </div>

      <fieldset
        style={{
          maxHeight: 180,
          overflowY: 'auto',
          border: '1px solid #ccc',
          padding: 10,
          marginBottom: 15,
          display: 'flex',
          flexWrap: 'wrap',
          gap: 10,
        }}
      >
        <legend>{t('Skills')}</legend>
        {skills.map(skill => {
          const isSelected = selectedSkills.includes(skill.id)

          return (
            <div
              key={skill.id}
              onClick={() => toggleSelect(selectedSkills, setSelectedSkills, skill.id)}
              style={{
                position: 'relative',
                width: 50,
                height: 50,
                cursor: 'pointer',
                border: isSelected ? '3px solid #4caf50' : '2px solid #ccc',
                borderRadius: 4,
                overflow: 'hidden',
              }}
              title={`${skill.name}: ${skill.description}`}
            >
              <img
                src={skill.icon}
                alt={skill.name}
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
              />
              <div
                style={{
                  position: 'absolute',
                  bottom: 0,
                  right: 0,
                  background: 'rgba(0,0,0,0.6)',
                  color: 'white',
                  fontSize: 12,
                  padding: '1px 3px',
                  borderTopLeftRadius: 4,
                }}
              >
                +
              </div>
            </div>
          )
        })}
      </fieldset>

      {/* Valda pets */}
      <div style={{ display: 'flex', gap: 8, marginBottom: 10, flexWrap: 'wrap' }}>
        {/* fix från pet?.Icon */}
        {selectedPets.map(petId => {
          const pet = pets.find(p => p.id === petId)
          return (
            <img
              key={petId}
              src={pet?.icon}
              alt={`Pet ${petId}`}
              title={pet?.name}
              style={{
                width: 60,
                height: 80,
                border: '2px solid #4caf50',
                borderRadius: 4,
                objectFit: 'cover',
              }}
            />
          )
        })}
      </div>

      <fieldset
        style={{
          maxHeight: 180,
          overflowY: 'auto',
          border: '1px solid #ccc',
          padding: 10,
          marginBottom: 15,
          display: 'flex',
          flexWrap: 'wrap',
          gap: 10,
        }}
      >
        <legend>{t('Pets')}</legend>
        {pets.map(pet => {
          const isSelected = selectedPets.includes(pet.id)

          return (
            <div
              key={pet.id}
              onClick={() => toggleSelect(selectedPets, setSelectedPets, pet.id)}
              style={{
                position: 'relative',
                width: 50,
                height: 50,
                cursor: 'pointer',
                border: isSelected ? '3px solid #4caf50' : '2px solid #ccc',
                borderRadius: 4,
                overflow: 'hidden',
              }}
              title={`${pet.name}: ${pet.description}`}
            >
              <img
                src={pet.icon}
                alt={pet.name}
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
              />
              <div
                style={{
                  position: 'absolute',
                  bottom: 0,
                  right: 0,
                  background: 'rgba(0,0,0,0.6)',
                  color: 'white',
                  fontSize: 12,
                  padding: '1px 3px',
                  borderTopLeftRadius: 4,
                }}
              >
                +
              </div>
            </div>
          )
        })}
      </fieldset>

      {/* Items */}
      <fieldset style={{ marginBottom: 15 }}>
        <legend>{t('Items Stats')}</legend>
        {itemCategories.map(category => (
          <div key={category} style={{ marginBottom: 10 }}>
            <h4>{t(category)}</h4>
            <label>
              {t('Stat 1')}:
              <select
                value={selectedItems[category]?.stat1 || ''}
                onChange={e => handleStatChange(category, 'stat1', e.target.value)}
                style={{ marginLeft: 8, marginRight: 12 }}
              >
                <option value="">{t('Choose stat')}</option>
                {statOptions.map(stat => (
                  <option key={stat.value || stat} value={stat.value || stat}>{t(stat.label || stat)}</option>
                ))}
              </select>
            </label>

            <label style={{ marginLeft: 20 }}>
              {t('Stat 2')}:
              <select
                value={selectedItems[category]?.stat2 || ''}
                onChange={e => handleStatChange(category, 'stat2', e.target.value)}
                style={{ marginLeft: 8 }}
              >
                <option value="">{t('Choose stat')}</option>
                {statOptions.map(stat => (
                  <option key={stat.value || stat} value={stat.value || stat}>{t(stat.label || stat)}</option>
                ))}
              </select>
            </label>

            <label style={{ marginLeft: 20 }}>
              {t('Attack Speed')}:
              <input
                type="checkbox"
                checked={selectedItems[category]?.atkSpd || false}
                onChange={e => handleStatChange(category, 'atkSpd', e.target.checked)}
                style={{ marginLeft: 8 }}
              />
            </label>
          </div>
        ))}
      </fieldset>

      <button type="submit" disabled={saving} style={{ padding: '10px 20px', fontSize: 16 }}>
        {saving ? t('Saving...') : t('Save Changes')}
      </button>
    </form>
  )
}
