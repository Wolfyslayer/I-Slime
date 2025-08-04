import React, { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { supabase } from '../lib/supabaseClient'
import { classes, paths, skills, pets, items } from '../data/data'
import { useTranslation } from 'react-i18next'
import { useUser } from '../context/UserContext'

export default function EditBuild() {
  const { id } = useParams()
  const navigate = useNavigate()
  const { t } = useTranslation()
  const { user } = useUser()

  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [selectedClass, setSelectedClass] = useState('')
  const [selectedPath, setSelectedPath] = useState('')
  const [selectedSkills, setSelectedSkills] = useState([])
  const [selectedPets, setSelectedPets] = useState([])
  const [selectedItems, setSelectedItems] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  if (user === undefined) return null // Vänta tills user laddats

  useEffect(() => {
    if (!user) return

    const fetchBuild = async () => {
      setLoading(true)

      const { data, error } = await supabase
        .from('builds')
        .select('*')
        .eq('id', id)
        .single()

      if (error) {
        setError(error.message)
        setLoading(false)
        return
      }

      if (data.user_id !== user.id) {
        setError(t('You can only edit your own builds.'))
        setLoading(false)
        return
      }

      setTitle(data.title)
      setDescription(data.description)
      setSelectedClass(data.class_id || '')
      setSelectedPath(data.path_id || '')
      setSelectedSkills(data.skills || [])
      setSelectedPets(data.pets || [])
      setSelectedItems(data.items || [])
      setLoading(false)
    }

    fetchBuild()
  }, [id, user, t])

  useEffect(() => {
    if (selectedClass) {
      const availablePaths = paths.filter(p => p.classId === selectedClass)
      const currentPathValid = availablePaths.some(p => p.id === selectedPath)
      if (!currentPathValid) {
        setSelectedPath(availablePaths[0]?.id || '')
      }
    } else {
      setSelectedPath('')
    }
  }, [selectedClass, selectedPath])

  const toggleSelect = (array, setArray, value) => {
    if (array.includes(value)) {
      setArray(array.filter(v => v !== value))
    } else {
      setArray([...array, value])
    }
  }

  const handleUpdate = async (e) => {
    e.preventDefault()

    if (!user) {
      setError(t('You must be logged in to edit a build.'))
      return
    }

    if (!title.trim() || !selectedClass || !selectedPath) {
      setError(t('Title, class and path are required.'))
      return
    }

    const { error } = await supabase
      .from('builds')
      .update({
        title,
        description,
        class_id: selectedClass,
        path_id: selectedPath,
        skills: selectedSkills,
        pets: selectedPets,
        items: selectedItems,
      })
      .eq('id', id)

    if (error) {
      setError(error.message)
    } else {
      navigate(`/build-detail/${id}`)
    }
  }

  if (loading) return <div className="loading">{t('Loading...')}</div>
  if (error && !title) return <div className="error">{error}</div>

  return (
    <div className="edit-build-container">
      <h1>{t('Edit Build')}</h1>

      <form onSubmit={handleUpdate} className="build-form">
        {error && <div className="error-message">{error}</div>}

        <div className="form-group">
          <label htmlFor="title">{t('Title')}</label>
          <input
            id="title"
            type="text"
            value={title}
            onChange={e => setTitle(e.target.value)}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="description">{t('Description')}</label>
          <textarea
            id="description"
            value={description}
            onChange={e => setDescription(e.target.value)}
            rows={4}
          />
        </div>

        <div className="form-row">
          <div className="form-group">
            <label htmlFor="class">{t('Class')}</label>
            <select
              id="class"
              value={selectedClass}
              onChange={e => setSelectedClass(e.target.value)}
              required
            >
              <option value="">{t('Select Class')}</option>
              {classes.map(c => (
                <option key={c.id} value={c.id}>{c.name}</option>
              ))}
            </select>
          </div>

          <div className="form-group">
            <label htmlFor="path">{t('Path')}</label>
            <select
              id="path"
              value={selectedPath}
              onChange={e => setSelectedPath(e.target.value)}
              required
              disabled={!selectedClass}
            >
              <option value="">{t('Select Path')}</option>
              {paths
                .filter(p => p.classId === selectedClass)
                .map(p => (
                  <option key={p.id} value={p.id}>{p.name}</option>
                ))}
            </select>
          </div>
        </div>

        <div className="form-group">
          <label>{t('Skills')}</label>
          <div className="selection-grid">
            {skills.map(skill => (
              <button
                key={skill.id}
                type="button"
                className={`selection-btn ${selectedSkills.includes(skill.id) ? 'selected' : ''}`}
                onClick={() => toggleSelect(selectedSkills, setSelectedSkills, skill.id)}
              >
                {skill.name}
              </button>
            ))}
          </div>
        </div>

        <div className="form-group">
          <label>{t('Pets')}</label>
          <div className="selection-grid">
            {pets.map(pet => (
              <button
                key={pet.id}
                type="button"
                className={`selection-btn ${selectedPets.includes(pet.id) ? 'selected' : ''}`}
                onClick={() => toggleSelect(selectedPets, setSelectedPets, pet.id)}
              >
                {pet.name}
              </button>
            ))}
          </div>
        </div>

        <div className="form-group">
          <label>{t('Items')}</label>
          <div className="selection-grid">
            {items.map(item => (
              <button
                key={item.id}
                type="button"
                className={`selection-btn ${selectedItems.includes(item.id) ? 'selected' : ''}`}
                onClick={() => toggleSelect(selectedItems, setSelectedItems, item.id)}
              >
                {item.name}
              </button>
            ))}
          </div>
        </div>

        <div className="form-actions">
          <button
            type="button"
            onClick={() => navigate(`/build-detail/${id}`)}
            className="btn-secondary"
          >
            {t('Cancel')}
          </button>
          <button type="submit" className="btn-primary">
            {t('Update Build')}
          </button>
        </div>
      </form>
    </div>
  )
}
