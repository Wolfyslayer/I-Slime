import React, { useEffect, useState } from 'react'
import { supabase, ADMIN_USERS } from '../lib/supabaseClient'

export default function AdminPanel() {
  const [reports, setReports] = useState([])
  const [loading, setLoading] = useState(true)
  const user = supabase.auth.user()
  const [error, setError] = useState(null)

  useEffect(() => {
    if (!user || !ADMIN_USERS.includes(user.id)) {
      setError('Ej behörighet')
      setLoading(false)
      return
    }
    async function fetchReports() {
      const { data, error } = await supabase
        .from('reports')
        .select('id, reason, build_id, reported_user_id, reporting_user_id, created_at, builds (title, user_id)')
        .order('created_at', { ascending: false })
      if (error) setError('Fel vid hämtning av rapporter')
      else setReports(data)
      setLoading(false)
    }
    fetchReports()
  }, [user])

  async function deleteBuild(buildId) {
    if (!window.confirm('Ta bort detta bygge permanent?')) return
    const { error } = await supabase.from('builds').delete().eq('id', buildId)
    if (error) alert('Fel vid borttagning av bygge')
    else setReports(reports.filter(r => r.build_id !== buildId))
  }

  async function banUser(userId) {
    if (!window.confirm('Vill du banna denna användare?')) return
    const { error } = await supabase.from('banned_users').insert([{ user_id: userId }])
    if (error) alert('Fel vid bannlysning')
    else alert('Användare bannad')
  }

  if (error) return <p>{error}</p>
  if (loading) return <p>Laddar rapporter...</p>
  if (reports.length === 0) return <p>Inga rapporter för tillfället.</p>

  return (
    <div style={{ padding: '20px' }}>
      <h1>Adminpanel - Rapporthantering</h1>
      {reports.map(report => (
        <div key={report.id} className="card" style={{ marginBottom: '1rem' }}>
          <p><b>Bygge:</b> {report.builds?.title || 'Okänt'}</p>
          <p><b>Byggeägare:</b> {report.builds?.user_id}</p>
          <p><b>Rapporterad användare:</b> {report.reported_user_id}</p>
          <p><b>Rapporterad av:</b> {report.reporting_user_id}</p>
          <p><b>Anledning:</b> {report.reason}</p>
          <p><b>Datum:</b> {new Date(report.created_at).toLocaleString()}</p>
          <button onClick={() => deleteBuild(report.build_id)} style={{ marginRight: '10px' }}>Ta bort bygge</button>
          <button onClick={() => banUser(report.reported_user_id)}>Banna användare</button>
        </div>
      ))}
    </div>
  )
}
// AdminPanel.jsx
