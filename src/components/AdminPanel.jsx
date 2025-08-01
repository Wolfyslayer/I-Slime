import React, { useEffect, useState } from 'react'
import { supabase, ADMIN_USERS } from '../lib/supabaseClient'
import { useTranslation } from 'react-i18next'

export default function AdminPanel() {
  const [reports, setReports] = useState([])
  const [loading, setLoading] = useState(true)
  const user = supabase.auth.user()
  const [error, setError] = useState(null)
  const { t } = useTranslation()

  useEffect(() => {
    if (!user || !ADMIN_USERS.includes(user.id)) {
      setError(t('No permission'))
      setLoading(false)
      return
    }
    async function fetchReports() {
      const { data, error } = await supabase
        .from('reports')
        .select('id, reason, build_id, reported_user_id, reporting_user_id, created_at, builds (title, user_id)')
        .order('created_at', { ascending: false })
      if (error) setError(t('Error fetching reports'))
      else setReports(data)
      setLoading(false)
    }
    fetchReports()
  }, [user, t])

  async function deleteBuild(buildId) {
    if (!window.confirm(t('Delete this build permanently?'))) return
    const { error } = await supabase.from('builds').delete().eq('id', buildId)
    if (error) alert(t('Error deleting build'))
    else setReports(reports.filter(r => r.build_id !== buildId))
  }

  async function banUser(userId) {
    if (!window.confirm(t('Do you want to ban this user?'))) return
    const { error } = await supabase.from('banned_users').insert([{ user_id: userId }])
    if (error) alert(t('Error banning user'))
    else alert(t('User banned'))
  }

  if (error) return <p>{error}</p>
  if (loading) return <p>{t('Loading reports...')}</p>
  if (reports.length === 0) return <p>{t('No reports at the moment.')}</p>

  return (
    <div style={{ padding: '20px' }}>
      <h1>{t('Admin Panel - Report Management')}</h1>
      {reports.map(report => (
        <div key={report.id} className="card" style={{ marginBottom: '1rem' }}>
          <p><b>{t('Build')}:</b> {report.builds?.title || t('Unknown')}</p>
          <p><b>{t('Build Owner')}:</b> {report.builds?.user_id}</p>
          <p><b>{t('Reported User')}:</b> {report.reported_user_id}</p>
          <p><b>{t('Reported By')}:</b> {report.reporting_user_id}</p>
          <p><b>{t('Reason')}:</b> {report.reason}</p>
          <p><b>{t('Date')}:</b> {new Date(report.created_at).toLocaleString()}</p>
          <button onClick={() => deleteBuild(report.build_id)} style={{ marginRight: '10px' }}>
            {t('Delete Build')}
          </button>
          <button onClick={() => banUser(report.reported_user_id)}>
            {t('Ban User')}
          </button>
        </div>
      ))}
    </div>
  )
}
