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

  // Anta att class och path är stringvärden, och skills/pets/items arrays av strängar
  return (
    <div style={{ maxWidth: 600, margin: '0 auto', padding: 20, background: 'rgba(0,0,0,0.6)', borderRadius: 8, color: '#0ff' }}>
      <h2>{t('Build Detail')}</h2>
      <h3>{build.title}</h3>
      <p>{build.description}</p>

      <div>
        <strong>{t('Class')}:</strong> {classes.includes(build.class) ? build.class : t('Unknown')}
      </div>

      <div>
        <strong>{t('Path')}:</strong> {build.class && paths[build.class]?.includes(build.path) ? build.path : t('Unknown')}
      </div>

      <div>
        <strong>{t('Skills')}:</strong>
        {build.skills && build.skills.length > 0 ? (
          <ul>
            {build.skills.map(skill => (
              <li key={skill}>
                {/* Om du har bilder i skills, kan du hitta objektet och visa img här */}
                {skill}
              </li>
            ))}
          </ul>
        ) : (
          <p>{t('None')}</p>
        )}
      </div>

      <div>
        <strong>{t('Pets')}:</strong>
        {build.pets && build.pets.length > 0 ? (
          <ul>
            {build.pets.map(pet => (
              <li key={pet}>
                {pet}
              </li>
            ))}
          </ul>
        ) : (
          <p>{t('None')}</p>
        )}
      </div>

      <div>
        <strong>{t('Items')}:</strong>
        {build.items && build.items.length > 0 ? (
          <ul>
            {build.items.map(item => (
              <li key={item}>
                {item}
              </li>
            ))}
          </ul>
        ) : (
          <p>{t('None')}</p>
        )}
      </div>

      <button onClick={() => navigate(`/edit/${id}`)} style={{ marginTop: 20, padding: '10px 20px', cursor: 'pointer', backgroundColor: '#00f9ff', border: 'none', borderRadius: 6, color: '#000' }}>
        {t('Edit Build')}
      </button>
    </div>
  )
}
