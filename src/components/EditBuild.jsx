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
  const [classId, setClassId] = useState('')
  const [pathId, setPathId] = useState('')
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
      if (error) setError(error.message)
      else {
        setTitle(data.title)
        setDescription(data.description)
        setClassId(data.classId || '')
        setPathId(data.pathId || '')
        setSelectedSkills(data.skills || [])
        setSelectedPets(data.pets || [])
        setSelectedItems(data.items || [])
      }
    }
    fetchBuild()
  }, [id])

  const handleSkillToggle = (skillId) => {
    setSelectedSkills(prev =>
      prev.includes(skillId) ? prev.filter(id => id !== skillId) : [...prev, skillId]
    )
  }

  const handlePetToggle = (petId) => {
    setSelectedPets(prev =>
      prev.includes(petId) ? prev.filter(id => id !== petId) : [...prev, petId]
    )
  }

  const handleItemToggle = (itemId) => {
    setSelectedItems(prev =>
      prev.includes(itemId) ? prev.filter(id => id !== itemId) : [...prev, itemId]
    )
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
        classId,
        pathId,
        skills: selectedSkills,
        pets: selectedPets,
        items: selectedItems,
      })
      .eq('id', id)
    if (error) setError(error.message)
    else {
      alert(t('Build updated!'))
      navigate(`/build/${id}`)
    }
  }

  return (
    <form onSubmit={handleUpdate}>
      <input
        type="text"
        placeholder={t('Title')}
        value={title}
        onChange={e => setTitle(e.target.value)}
        required
      />
      <textarea
        placeholder={t('Description')}
        value={description}
        onChange={e => setDescription(e.target.value)}
        required
      />

      <label>{t('Class')}</label>
      <select value={classId} onChange={e => setClassId(e.target.value)} required>
        <option value="">{t('Select Class')}</option>
        {classes.map(c => (
          <option key={c.id} value={c.id}>{c.name}</option>
        ))}
      </select>

      <label>{t('Path')}</label>
      <select value={pathId} onChange={e => setPathId(e.target.value)} required>
        <option value="">{t('Select Path')}</option>
        {paths
          .filter(p => p.classId === classId)
          .map(p => (
            <option key={p.id} value={p.id}>{p.name}</option>
          ))}
      </select>

      <fieldset>
        <legend>{t('Skills')}</legend>
        {skills
          .filter(s => s.classId === classId && s.pathId === pathId)
          .map(skill => (
            <label key={skill.id}>
              <input
                type="checkbox"
                checked={selectedSkills.includes(skill.id)}
                onChange={() => handleSkillToggle(skill.id)}
              />
              {skill.name}
            </label>
          ))}
      </fieldset>

      <fieldset>
        <legend>{t('Pets')}</legend>
        {pets.map(pet => (
          <label key={pet.id}>
            <input
              type="checkbox"
              checked={selectedPets.includes(pet.id)}
              onChange={() => handlePetToggle(pet.id)}
            />
            {pet.name}
          </label>
        ))}
      </fieldset>

      <fieldset>
        <legend>{t('Items')}</legend>
        {items.map(item => (
          <label key={item.id}>
            <input
              type="checkbox"
              checked={selectedItems.includes(item.id)}
              onChange={() => handleItemToggle(item.id)}
            />
            {item.name}
          </label>
        ))}
      </fieldset>

      <button type="submit">{t('Update Build')}</button>
      {error && <p style={{ color: 'red' }}>{error}</p>}
    </form>
  )
}
// EditBuild.jsx
