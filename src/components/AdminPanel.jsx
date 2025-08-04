// src/components/AdminPanel.jsx
import React, { useEffect, useState } from 'react'
import { supabase } from '../lib/supabaseClient'
import { useTranslation } from 'react-i18next'
import '../styles/Auth.css

export default function AdminPanel() {
  const [reports, setReports] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const { t } = useTranslation()
  const [isAdmin, setIsAdmin] = useState(false)

  useEffect(() => {
    async function checkAdminAndFetch() {
      const {
        data: { user },
        error: userError
      } = await supabase.auth.getUser()

      if (userError || !user) {
        setError(t('No permission'))
        setLoading(false)
        return
      }

      const { data: adminData, error: adminError } = await supabase
        .from('admin_users')
        .select('*')
        .eq('user_id', user.id)
        .single()

      if (adminError || !adminData) {
        setError(t('No permission'))
        setLoading(false)
        return
      }

      setIsAdmin(true)

      const { data: reportData, error: reportError } = await supabase
        .from('reports')
        .select('id, reason, build_id, reported_user_id, reporting_user_id, created_at, builds (title, user_id)')
        .order('created_at', { ascending: false })

      if (reportError) setError(t('Error fetching reports'))
      else setReports(reportData)

      setLoading(false)
    }

    checkAdminAndFetch()
  }, [t])

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

  if (loading) return <p>{t('Loading reports...')}</p>
  if (!isAdmin) return <p>{error || t('No permission')}</p>
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
