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
  const [isAdmin, setIsAdmin] = useState(false)
  const { t } = useTranslation()

  useEffect(() => {
    const fetchData = async () => {
      try {
        const {
          data: { user },
          error: userError
        } = await supabase.auth.getUser()

        if (userError || !user) {
          setError(t('No permission'))
          return
        }

        const { data: adminData, error: adminError } = await supabase
          .from('admin_users')
          .select('*')
          .eq('user_id', user.id)
          .single()

        if (adminError || !adminData) {
          setError(t('No permission'))
          return
        }

        setIsAdmin(true)

        const { data: reportData, error: reportError } = await supabase
          .from('build_reports')
          .select(`
            id,
            reason,
            build_id,
            reported_by,
            reported_at,
            reported_user_id,
            builds (
              title,
              user_id
            ),
            reported_by_profile:profiles!build_reports_reported_by_fkey (
              username
            ),
            reported_user_profile:profiles!build_reports_reported_user_id_fkey (
              username
            ),
            build_owner_profile:profiles!builds_user_id_fkey (
              username
            )
          `)
          .order('reported_at', { ascending: false })

        if (reportError) {
          console.error('Report fetch error:', reportError)
          setError(t('Error fetching reports'))
        } else {
          setReports(reportData)
        }
      } catch (err) {
        console.error('Unexpected error:', err)
        setError(t('Unexpected error'))
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [t])

  const toggleExpand = (id) => {
    setExpandedReportId(prev => (prev === id ? null : id))
  }

  const deleteBuild = async (buildId) => {
    if (!window.confirm(t('Delete this build permanently?'))) return
    const { error } = await supabase.from('builds').delete().eq('id', buildId)
    if (error) {
      console.error('Delete error:', error)
      alert(t('Error deleting build'))
    } else {
      setReports(prev => prev.filter(r => r.build_id !== buildId))
    }
  }

  const banUser = async (userId) => {
    if (!window.confirm(t('Do you want to ban this user?'))) return
    const { error } = await supabase
      .from('banned_users')
      .insert([{ user_id: userId }])
    if (error) {
      console.error('Ban error:', error)
      alert(t('Error banning user'))
    } else {
      alert(t('User banned'))
    }
  }

  if (loading) return <p>{t('Loading reports...')}</p>
  if (error) return <p>{error}</p>
  if (!isAdmin) return <p>{t('No permission')}</p>
  if (reports.length === 0) return <p>{t('No reports at the moment.')}</p>

  return (
    <div className="main-content">
      <h1>{t('Admin Panel - Report Management')}</h1>
      {reports.map(report => {
        const isExpanded = expandedReportId === report.id
        const buildTitle = report.builds?.title || t('Unknown')
        const buildOwner = report.build_owner_profile?.username || report.builds?.user_id || t('Unknown')
        const reportedUser = report.reported_user_profile?.username || report.reported_user_id || t('Unknown')
        const reportedBy = report.reported_by_profile?.username || report.reported_by || t('Unknown')

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
                  {buildTitle}
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
                  <p><strong>{t('Build Owner')}:</strong> {buildOwner}</p>
                  <p><strong>{t('Reported User')}:</strong> {reportedUser}</p>
                  <p><strong>{t('Reported By')}:</strong> {reportedBy}</p>
                  <p><strong>{t('Reason')}:</strong> {report.reason}</p>
                  <p><strong>{t('Date')}:</strong> {new Date(report.reported_at).toLocaleString()}</p>

                  <div className="report-actions" style={{
                    display: 'flex',
                    flexWrap: 'wrap',
                    gap: '0.75rem',
                    marginTop: '1rem'
                  }}>
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
