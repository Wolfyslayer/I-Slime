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

      <div>
        <strong>{t('Class')}:</strong> {classes.find(c => c.id === build.classId)?.name || t('Unknown')}
      </div>

      <div>
        <strong>{t('Path')}:</strong> {paths.find(p => p.id === build.pathId)?.name || t('Unknown')}
      </div>

      <div>
        <strong>{t('Skills')}:</strong>
        {build.skills && build.skills.length > 0 ? (
          <ul>
            {build.skills.map(skillId => {
              const skill = skills.find(s => s.id === skillId)
              return (
                <li key={skillId}>
                  {skill?.img && <img src={skill.img} alt={skill?.name} style={{ width: 30, marginRight: 8 }} />}
                  {skill?.name || t('Unknown')}
                </li>
              )
            })}
          </ul>
        ) : (
          <p>{t('None')}</p>
        )}
      </div>

      <div>
        <strong>{t('Pets')}:</strong>
        {build.pets && build.pets.length > 0 ? (
          <ul>
            {build.pets.map(petId => {
              const pet = pets.find(p => p.id === petId)
              return (
                <li key={petId}>
                  {pet?.img && <img src={pet.img} alt={pet?.name} style={{ width: 30, marginRight: 8 }} />}
                  {pet?.name || t('Unknown')}
                </li>
              )
            })}
          </ul>
        ) : (
          <p>{t('None')}</p>
        )}
      </div>

      <div>
        <strong>{t('Items')}:</strong>
        {build.items && build.items.length > 0 ? (
          <ul>
            {build.items.map(itemId => {
              const item = items.find(i => i.id === itemId)
              return (
                <li key={itemId}>
                  {item?.img && <img src={item.img} alt={item?.name} style={{ width: 30, marginRight: 8 }} />}
                  {item?.name || t('Unknown')}
                </li>
              )
            })}
          </ul>
        ) : (
          <p>{t('None')}</p>
        )}
      </div>

      <button onClick={() => navigate(`/edit/${id}`)}>{t('Edit Build')}</button>
    </div>
  )
}
