import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { supabase } from '../lib/supabaseClient'
import { useUser } from '../context/UserContext'
import { classes, paths } from '../data/data'
import { useTranslation } from 'react-i18next'

export default function MyBuilds() {
  const { user } = useUser()
  const navigate = useNavigate()
  const { t } = useTranslation()
  const [builds, setBuilds] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    if (!user) return

    const fetchBuilds = async () => {
      setLoading(true)
      const { data, error } = await supabase
        .from('builds')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false })

      if (error) {
        setError(error.message)
      } else {
        setBuilds(data || [])
      }
      setLoading(false)
    }

    fetchBuilds()
  }, [user])

  const handleDelete = async (buildId) => {
    if (!window.confirm(t('Are you sure you want to delete this build?'))) return
    
    const { error } = await supabase
      .from('builds')
      .delete()
      .eq('id', buildId)
    
    if (error) {
      alert(t('Error deleting build'))
    } else {
      setBuilds(builds.filter(b => b.id !== buildId))
    }
  }

  const getClassName = (classId) => {
    const classObj = classes.find(c => c.id === classId)
    return classObj ? t(classObj.name) : t('Unknown')
  }

  const getPathName = (pathId) => {
    const pathObj = paths.find(p => p.id === pathId)
    return pathObj ? t(pathObj.name) : t('Unknown')
  }

  if (!user) return <p>{t('You must be logged in to view your builds.')}</p>
  if (loading) return <div className="loading">{t('Loading your builds...')}</div>
  if (error) return <div className="error">Error: {error}</div>

  return (
    <div className="my-builds-container">
      <div className="page-header">
        <h1>{t('My Builds')}</h1>
        <button 
          onClick={() => navigate('/create-build')} 
          className="btn-primary"
        >
          {t('Create New Build')}
        </button>
      </div>
      
      {builds.length === 0 ? (
        <div className="no-builds">
          <p>{t('You have no saved builds yet.')}</p>
          <button 
            onClick={() => navigate('/create-build')} 
            className="btn-primary"
          >
            {t('Create Your First Build')}
          </button>
        </div>
      ) : (
        <div className="builds-grid">
          {builds.map(build => {
            return (
              <div key={build.id} className="build-card">
                <div className="build-card-header">
                  <h3>
                    <Link to={`/build-detail/${build.id}`} className="build-title-link">
                      {build.title}
                    </Link>
                  </h3>
                  <div className="build-actions">
                    <button 
                      onClick={() => navigate(`/edit-build/${build.id}`)}
                      className="btn-small btn-secondary"
                    >
                      {t('Edit')}
                    </button>
                    <button 
                      onClick={() => handleDelete(build.id)}
                      className="btn-small btn-danger"
                    >
                      {t('Delete')}
                    </button>
                  </div>
                </div>
                
                <p className="build-description">{build.description}</p>
                
                <div className="build-config">
                  <span className="config-tag">
                    {t('Class')}: {getClassName(build.class_id)}
                  </span>
                  <span className="config-tag">
                    {t('Path')}: {getPathName(build.path_id)}
                  </span>
                </div>
                
                <div className="build-meta">
                  <span>{new Date(build.created_at).toLocaleDateString()}</span>
                </div>
              </div>
            )
          })}
        </div>
      )}
    </div>
  )
}
