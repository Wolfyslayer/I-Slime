import React, { useEffect, useState } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import { useUser } from '../context/UserContext'
import { supabase } from '../lib/supabaseClient'
import { LogOut, Menu } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import './Sidebar.css'

export default function Sidebar() {
  const { user, logout } = useUser()
  const [isAdmin, setIsAdmin] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const location = useLocation()
  const { t } = useTranslation()

  useEffect(() => {
    const fetchAdminStatus = async () => {
      if (user) {
        const { data, error } = await supabase
          .from('admin_users')
          .select('user_id')
          .eq('user_id', user.id)
          .single()

        setIsAdmin(!!data && !error)
      } else {
        setIsAdmin(false)
      }
    }

    fetchAdminStatus()
  }, [user])

  useEffect(() => {
    setMenuOpen(false)
  }, [location.pathname])

  const handleLogout = async () => {
    await logout()
    setIsAdmin(false)
  }

  const onClose = () => setMenuOpen(false)

  return (
    <aside className={`sidebar${menuOpen ? ' open' : ''}`}>
      <button className="close-sidebar" onClick={onClose} aria-label={t('Sign out')}>
        &times;
      </button>
      <h2>{t('Build Planner')}</h2>
      <nav>
        <NavLink to="/" onClick={onClose} end>{t('All Builds')}</NavLink>
        {user && (
          <>
            <NavLink to="/my-builds" onClick={onClose}>{t('My Builds')}</NavLink>
            <NavLink to="/create-build" onClick={onClose}>{t('Create Build')}</NavLink>
          </>
        )}
        {isAdmin && (
          <NavLink to="/admin-panel" onClick={onClose}>{t('Admin Panel')}</NavLink>
        )}
      </nav>
      <div className="bottom-buttons">
        {user && (
          <button className="logout-button" onClick={handleLogout}>
            {t('Sign out')}
          </button>
        )}
        <button className="language-switcher">
          <span className="flag">🌐</span>
          {t('Change language')}
        </button>
      </div>
    </aside>
  )
}
