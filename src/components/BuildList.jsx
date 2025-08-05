import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { supabase } from '../lib/supabaseClient'
import { useTranslation } from 'react-i18next'

export default function BuildList() {
  const [builds, setBuilds] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const { t } = useTranslation()

  useEffect(() => {
    const fetchBuilds = async () => {
      setLoading(true)
      const { data, error } = await supabase
        .from('builds')
        .select(`
          *,
          profiles:user_id (username)
        `)
        .order('created_at', { ascending: false })
      
      if (error) {
        setError(error.message)
      } else {
        setBuilds(data || [])
      }
      setLoading(false)
    }
    fetchBuilds()
  }, [])

  if (loading) return <div className="loading">{t('Loading...')}</div>
  if (error) return <div className="error">Error: {error}</div>

  return (
    <div className="builds-container">
      <h1>{t('All Builds')}</h1>
      
      {builds.length === 0 ? (
        <p className="no-builds">{t('No builds found.')}</p>
      ) : (
        <div className="builds-grid">
          {builds.map((build) => (
            <div key={build.id} className="build-card">
              <h3>
                <Link to={`/build-detail/${build.id}`} className="build-title-link">
                  {build.title}
                </Link>
              </h3>
              <p className="build-description">{build.description}</p>
              <div className="build-meta">
                <span className="build-author">
                  {t('By')}: {build.profiles?.username || t('Anonymous')}
                </span>
                <span className="build-date">
                  {new Date(build.created_at).toLocaleDateString()}
                </span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
