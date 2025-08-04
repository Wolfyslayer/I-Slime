import React, { useEffect, useState } from 'react'
import { supabase } from '../lib/supabaseClient'
import { useTranslation } from 'react-i18next'
import { motion, AnimatePresence } from 'framer-motion'
import {
  FaTrashAlt,
  FaBan,
  FaChevronDown,
  FaChevronUp,
  FaExclamationTriangle
} from 'react-icons/fa'
import '../styles/theme.css'

export default function AdminPanel() {
  const [reports, setReports] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [expandedReportId, setExpandedReportId] = useState(null)
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
        .from('build_reports')
        .select('id, reason, build_id, reported_by, reported_at, reported_user_id, builds (title, user_id)')
        .order('reported_at', { ascending: false })

      if (reportError) setError(t('Error fetching reports'))
      else setReports(reportData)

      setLoading(false)
    }

    checkAdminAndFetch()
  }, [t])

  const toggleExpand = (id) => {
    setExpandedReportId(prev => (prev === id ? null : id))
  }

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
    <div className="main-content">
      <h1>{t('Admin Panel - Report Management')}</h1>
      {reports.map(report => {
        const isExpanded = expandedReportId === report.id

        return (
          <motion.div
            key={report.id}
            layout
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="section"
            style={{ cursor: 'pointer' }}
            onClick={() => toggleExpand(report.id)}
          >
            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              gap: '0.5rem',
              flexWrap: 'wrap'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <FaExclamationTriangle color="#ffcc00" />
                <h2 style={{ margin: 0, fontSize: '1.2rem' }}>
                  {report.builds?.title || t('Unknown')}
                </h2>
              </div>
              {isExpanded ? <FaChevronUp /> : <FaChevronDown />}
            </div>

            <AnimatePresence>
              {isExpanded && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.3 }}
                  className="report-details"
                  onClick={(e) => e.stopPropagation()}
                  style={{ overflow: 'hidden', marginTop: '1rem' }}
                >
                  <p><strong>{t('Build Owner')}:</strong> {report.builds?.user_id}</p>
                  <p><strong>{t('Reported User')}:</strong> {report.reported_user_id}</p>
                  <p><strong>{t('Reported By')}:</strong> {report.reported_by}</p>
                  <p><strong>{t('Reason')}:</strong> {report.reason}</p>
                  <p><strong>{t('Date')}:</strong> {new Date(report.reported_at).toLocaleString()}</p>

                  <div className="report-actions" style={{ display: 'flex', flexWrap: 'wrap', gap: '0.75rem', marginTop: '1rem' }}>
                    <button onClick={() => deleteBuild(report.build_id)}>
                      <FaTrashAlt style={{ marginRight: '0.4rem' }} />
                      {t('Delete Build')}
                    </button>
                    <button onClick={() => banUser(report.reported_user_id)}>
                      <FaBan style={{ marginRight: '0.4rem' }} />
                      {t('Ban User')}
                    </button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        )
      })}
    </div>
  )
}
