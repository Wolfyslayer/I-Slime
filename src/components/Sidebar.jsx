import React, { useState, useEffect } from 'react'
import { NavLink, useLocation, useNavigate } from 'react-router-dom'
import { useUser } from '../context/UserContext'
import { supabase } from '../lib/supabaseClient'
import { useTranslation } from 'react-i18next'
import LanguageSwitcher from './LanguageSwitcher'
import './Sidebar.css'

export default function Sidebar() {
  const { user, loading, isAdmin } = useUser()
  const location = useLocation()
  const navigate = useNavigate()
  const { t } = useTranslation()
  const [isOpen, setIsOpen] = useState(false)

  const toggleSidebar = () => setIsOpen(!isOpen)

  useEffect(() => {
    setIsOpen(false)
  }, [location.pathname])

  if (loading) return null

  const handleLogout = async () => {
    await supabase.auth.signOut()
    navigate('/login')
  }

  return (
    <>
      <button className="hamburger" onClick={toggleSidebar}>☰</button>
      <aside className={`sidebar ${isOpen ? 'open' : ''}`} style={{ position: 'relative' }}>
        <h2>I-Slime</h2>
        <nav>
          <NavLink to="/" end>{t('All Builds')}</NavLink>

          {user && (
            <>
              <NavLink to="/create-build">{t('Create Build')}</NavLink>
              <NavLink to="/my-builds">{t('My Builds')}</NavLink>
              {isAdmin && <NavLink to="/admin-panel">🛠️ {t('Admin Panel')}</NavLink>}

              <button
                onClick={handleLogout}
                className="logout-button"
                style={{
                  background: 'none',
                  border: 'none',
                  padding: 0,
                  marginTop: '1rem',
                  color: '#00f9ff',
                  cursor: 'pointer',
                  fontSize: '1rem',
                  textAlign: 'left',
                  fontFamily: 'inherit',
                }}
              >
                {t('Sign out')}
              </button>
            </>
          )}

          {!user && (
            <>
              <NavLink to="/login">{t('Login')}</NavLink>
              <NavLink to="/register">{t('Sign Up')}</NavLink>
            </>
          )}
        </nav>

        {/* LanguageSwitcher längst ner */}
        <LanguageSwitcher />
      </aside>
    </>
  )
}
