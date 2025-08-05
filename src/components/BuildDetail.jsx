// src/components/BuildDetail.jsx
import React, { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { supabase } from '../lib/supabaseClient'
import { classes, paths, skills, pets } from '../data/data'
import { useTranslation } from 'react-i18next'
import { useUser } from '../context/UserContext'
import '../styles/build.css'

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
    return classObj ? t(classObj.name) : t('Unknown')
  }

  const getPathName = (pathId) => {
    const pathObj = paths.find(p => p.id === pathId)
    return pathObj ? t(pathObj.name) : t('Unknown')
  }

  const canEdit = user && build && user.id === build.user_id

  const handleReport = async () => {
    const { error } = await supabase
      .from('build_reports')
      .insert({
        build_id: build.id,
        reported_by: user.id,
        reported_at: new Date().toISOString(),
      })

    if (error) {
      alert(t('Something went wrong reporting the build.'))
      console.error(error)
    } else {
      alert(t('Thank you for reporting this build.'))
    }
  }

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

        {/* Skills med preview i samma stil som CreateBuild/EditBuild */}
        <div className="build-section">
          <h3>{t('Skills')}</h3>
          <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', minHeight: 60 }}>
            {(!build.skills || build.skills.length === 0) && <em>{t('No selected skills')}</em>}
            {build.skills && build.skills.map(skillId => {
              const skill = skills.find(s => s.id === skillId)
              if (!skill) return null
              return (
                <img
                  key={skillId}
                  src={skill.icon || skill.cardImage}
                  alt={skill.name}
                  title={skill.name}
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

        {/* Pets med preview i samma stil som CreateBuild/EditBuild */}
        <div className="build-section">
          <h3>{t('Pets')}</h3>
          <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', minHeight: 60 }}>
            {(!build.pets || build.pets.length === 0) && <em>{t('No selected pets')}</em>}
            {build.pets && build.pets.map(petId => {
              const pet = pets.find(p => p.id === petId)
              if (!pet) return null
              return (
                <img
                  key={petId}
                  src={pet.icon}
                  alt={pet.name}
                  title={pet.name}
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

        {/* Items som lista med stats */}
        {build.items && typeof build.items === 'object' && (
          <div className="build-section">
            <h3>{t('Items')}</h3>
            {Object.entries(build.items).map(([category, stats]) => (
              <div key={category} style={{ marginBottom: 10 }}>
                <strong>{t(category)}</strong>:&nbsp;
                {stats.stat1 && <span>{t(stats.stat1)}</span>}
                {stats.stat2 && <span>, {t(stats.stat2)}</span>}
                {stats.atkSpd && <span>, {t('Attack Speed')}</span>}
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="build-actions" style={{ marginTop: 20 }}>
        <button onClick={() => navigate('/')} className="btn-secondary" style={{ marginRight: 10 }}>
          {t('Back to Builds')}
        </button>

        {canEdit && (
          <button 
            onClick={() => navigate(`/edit-build/${id}`)} 
            className="btn-primary"
            style={{ marginRight: 10 }}
          >
            {t('Edit Build')}
          </button>
        )}

        {user && build && user.id !== build.user_id && (
          <button 
            onClick={handleReport}
            className="btn-danger"
          >
            {t('Report Build')}
          </button>
        )}
      </div>
    </div>
  )
}
