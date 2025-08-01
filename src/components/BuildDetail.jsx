import React, { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { supabase } from '../lib/supabaseClient'
import { classes, paths, skills, pets, items } from '../data/data'
import { useTranslation } from 'react-i18next'

export default function BuildDetail() {
  const { id } = useParams()
  const navigate = useNavigate()
  const { t } = useTranslation()

  const [build, setBuild] = useState(null)
  const [error, setError] = useState('')

  useEffect(() => {
    async function fetchBuild() {
      const { data, error } = await supabase
        .from('builds')
        .select('*')
        .eq('id', id)
        .single()
      if (error) setError(error.message)
      else setBuild(data)
    }
    fetchBuild()
  }, [id])

  if (error) return <p style={{ color: 'red' }}>{error}</p>
  if (!build) return <p>{t('Loading...')}</p>

  return (
    <div>
      <h2>{t('Build Detail')}</h2>
      <h3>{build.title}</h3>
      <p>{build.description}</p>

      {/* Example: Display selected class, path, etc. from build JSON data */}
      <div>
        <strong>{t('Class')}:</strong> {classes.find(c => c.id === build.classId)?.name || t('Unknown')}
      </div>
      <div>
        <strong>{t('Path')}:</strong> {paths.find(p => p.id === build.pathId)?.name || t('Unknown')}
      </div>
      <div>
        <strong>{t('Skills')}:</strong> 
        <ul>
          {build.skills?.map(skillId => (
            <li key={skillId}>{skills.find(s => s.id === skillId)?.name || t('Unknown')}</li>
          )) || t('None')}
        </ul>
      </div>
      <div>
        <strong>{t('Pets')}:</strong> 
        <ul>
          {build.pets?.map(petId => (
            <li key={petId}>{pets.find(p => p.id === petId)?.name || t('Unknown')}</li>
          )) || t('None')}
        </ul>
      </div>
      <div>
        <strong>{t('Items')}:</strong> 
        <ul>
          {build.items?.map(itemId => (
            <li key={itemId}>{items.find(i => i.id === itemId)?.name || t('Unknown')}</li>
          )) || t('None')}
        </ul>
      </div>

      <button onClick={() => navigate(`/edit/${id}`)}>{t('Edit Build')}</button>
    </div>
  )
}
// BuildDetail.jsx
