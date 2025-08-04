import React, { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { supabase } from '../lib/supabaseClient'
import { classes, paths } from '../data/data'
import { useTranslation } from 'react-i18next'
import { useUser } from '../context/UserContext'

export default function BuildDetail() {
  const { id } = useParams()
  const navigate = useNavigate()
  const { t } = useTranslation()
  const { user } = useUser()

  const [build, setBuild] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    async function fetchBuild() {
      setLoading(true)
      const { data, error } = await supabase
        .from('builds')
        .select(`
          *,
          profiles:user_id (username)
        `)
        .eq('id', id)
        .single()
      
      if (error) {
        setError(error.message)
      } else {
        setBuild(data)
      }
      setLoading(false)
    }
    fetchBuild()
  }, [id])

  const getClassName = (classId) => {
    const classObj = classes.find(c => c.id === classId)
    return classObj ? classObj.name : t('Unknown')
  }

  const getPathName = (pathId) => {
    const pathObj = paths.find(p => p.id === pathId)
    return pathObj ? pathObj.name : t('Unknown')
  }

  const canEdit = user && build && user.id === build.user_id

  if (loading) return <div className="loading">{t('Loading...')}</div>
  if (error) return <p style={{ color: 'red' }}>{error}</p>
  if (!build) return <p>{t('Build not found')}</p>

  return (
    <div className="build-detail-container">
      <div className="build-header">
        <h1>{build.title}</h1>
        <div className="build-meta">
          <span>{t('By')}: {build.profiles?.username || 'Anonymous'}</span>
          <span>{new Date(build.created_at).toLocaleDateString()}</span>
        </div>
      </div>

      <div className="build-content">
        <div className="build-section">
          <h3>{t('Description')}</h3>
          <p>{build.description || t('No description provided')}</p>
        </div>

        <div className="build-section">
          <h3>{t('Build Configuration')}</h3>
          <div className="build-config">
            <div className="config-item">
              <strong>{t('Class')}:</strong> {getClassName(build.class_id)}
            </div>
            <div className="config-item">
              <strong>{t('Path')}:</strong> {getPathName(build.path_id)}
            </div>
          </div>
        </div>

        {build.skills && build.skills.length > 0 && (
          <div className="build-section">
            <h3>{t('Skills')}</h3>
            <div className="skills-list">
              {build.skills.map((skill, index) => (
                <span key={index} className="skill-tag">{skill}</span>
              ))}
            </div>
          </div>
        )}

        {build.pets && build.pets.length > 0 && (
          <div className="build-section">
            <h3>{t('Pets')}</h3>
            <div className="pets-list">
              {build.pets.map((pet, index) => (
                <span key={index} className="pet-tag">{pet}</span>
              ))}
            </div>
          </div>
        )}

        {build.items && build.items.length > 0 && (
          <div className="build-section">
            <h3>{t('Items')}</h3>
            <div className="items-list">
              {build.items.map((item, index) => (
                <span key={index} className="item-tag">{item}</span>
              ))}
            </div>
          </div>
        )}
      </div>

      <div className="build-actions">
        <button onClick={() => navigate('/')} className="btn-secondary">
          {t('Back to Builds')}
        </button>
        {canEdit && (
          <button 
            onClick={() => navigate(`/edit-build/${id}`)} 
            className="btn-primary"
          >
            {t('Edit Build')}
          </button>
        )}
      </div>
    </div>
  )
}
