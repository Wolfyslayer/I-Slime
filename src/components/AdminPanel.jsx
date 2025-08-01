import React, { useEffect, useState } from 'react'
import { supabase, ADMIN_USERS } from '../lib/supabaseClient'
import { useTranslation } from 'react-i18next'

export default function AdminPanel() {
  const { t } = useTranslation()
  const [reports, setReports] = useState([])
  const [loading, setLoading] = useState(true)
  const user = supabase.auth.user()
  const [error, setError] = useState(null)

  useEffect(() => {
    if (!user || !ADMIN_USERS.includes(user.id)) {
      setError(t('no_permission'))
      setLoading(false)
      return
    }
    async function fetchReports() {
      const { data, error } = await supabase
        .from('reports')
        .select('id, reason, build_id, reported_user_id, reporting_user_id, created_at, builds (title, user_id)')
        .order('created_at', { ascending: false })
      if (error) setError(t('error_fetching_reports'))
      else setReports(data)
      setLoading(false)
    }
    fetchReports()
  }, [user])

  async function deleteBuild(buildId) {
    if (!window.confirm(t('confirm_delete_build'))) return
    const { error } = await supabase.from('builds').delete().eq('id', buildId)
    if (error) alert(t('error_deleting_build'))
    else setReports(reports.filter(r => r.build_id !== buildId))
  }

  async function banUser(userId) {
    if (!window.confirm(t('confirm_ban_user'))) return
    const { error } = await supabase.from('banned_users').insert([{ user_id: userId }])
    if (error) alert(t('error_banning_user'))
    else alert(t('ban_user'))
  }

  if (error) return <p>{error}</p>
  if (loading) return <p>{t('loading_reports')}</p>
  if (reports.length === 0) return <p>{t('no_reports')}</p>

  return (
    <div style={{ padding: '20px' }}>
      <h1>{t('admin_panel')} - Rapporthantering</h1>
      {reports.map(report => (
        <div key={report.id} className="card" style={{ marginBottom: '10px' }}>
          <p><strong>{t('build')}:</strong> {report.builds?.title}</p>
          <p><strong>{t('build_owner')}:</strong> {report.builds?.user_id}</p>
          <p><strong>{t('reported_user')}:</strong> {report.reported_user_id}</p>
          <p><strong>{t('reported_by')}:</strong> {report.reporting_user_id}</p>
          <p><strong>{t('reason')}:</strong> {report.reason}</p>
          <p><strong>{t('date')}:</strong> {new Date(report.created_at).toLocaleString()}</p>
          <button onClick={() => deleteBuild(report.build_id)}>{t('delete_build')}</button>
          <button onClick={() => banUser(report.reported_user_id)}>{t('ban_user')}</button>
        </div>
      ))}
    </div>
  )
}
