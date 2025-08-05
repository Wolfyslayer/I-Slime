// src/components/Sidebar.jsx

import React, { useEffect, useState } from 'react'
import { NavLink, useLocation } from 'react-router-dom'
import { useUser } from '../context/UserContext'
import { supabase } from '../lib/supabaseClient'
import { useTranslation } from 'react-i18next'
import './Sidebar.css'

export default function Sidebar({ isOpen, onClose }) {
  const { user, logout } = useUser()
  const [isAdmin, setIsAdmin] = useState(false)
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

  // Stäng sidebar vid navigering
  useEffect(() => {
    onClose()
  }, [location.pathname])

  const handleLogout = async () => {
    await logout()
    setIsAdmin(false)
    onClose()
  }

  return (
    <aside className={`sidebar${isOpen ? ' open' : ''}`}>
      <button className="close-sidebar" onClick={onClose} aria-label={t('Close sidebar')}>
        &times;
      </button>
      <h2>{t('Build Planner')}</h2>
      <nav>
        <NavLink to="/" onClick={onClose} end>
          {t('All Builds')}
        </NavLink>
        {user && (
          <>
            <NavLink to="/my-builds" onClick={onClose}>
              {t('My Builds')}
            </NavLink>
            <NavLink to="/create-build" onClick={onClose}>
              {t('Create Build')}
            </NavLink>
          </>
        )}
        {isAdmin && (
          <NavLink to="/admin-panel" onClick={onClose}>
            {t('Admin Panel')}
          </NavLink>
        )}
      </nav>
      <div className="bottom-buttons">
        {user && (
          <button className="logout-button" onClick={handleLogout}>
            {t('Sign out')}
          </button>
        )}
        <button className="language-switcher">
          <span className="flag">🌐</span> {t('Change language')}
        </button>
      </div>
    </aside>
  )
}
