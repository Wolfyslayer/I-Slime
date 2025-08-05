import React, { useState, useEffect } from 'react'
import { NavLink, useLocation, useNavigate } from 'react-router-dom'
import { useUser } from '../context/UserContext'
import { supabase } from '../lib/supabaseClient'
import { useTranslation } from 'react-i18next'
import './Sidebar.css'

export default function Sidebar() {
  const { user, loading, isAdmin } = useUser()
  const location = useLocation()
  const navigate = useNavigate()
  const { i18n, t } = useTranslation()

  // State för om sidebar är öppen (för mobil)
  const [isOpen, setIsOpen] = useState(false)

  const toggleSidebar = () => setIsOpen(!isOpen)

  // Stäng sidebar vid navigering
  useEffect(() => {
    setIsOpen(false)
  }, [location.pathname])

  if (loading) return null

  const handleLogout = async () => {
    await supabase.auth.signOut()
    navigate('/login')
    setIsOpen(false)
  }

  const toggleLanguage = () => {
    const newLang = i18n.language === 'sv' ? 'en' : 'sv'
    i18n.changeLanguage(newLang)
  }

  const flag = i18n.language === 'sv' ? '🇸🇪' : '🇬🇧'
  const langLabel = i18n.language === 'sv' ? 'SV' : 'EN'

  return (
    <>
      {/* Hamburgerknapp */}
      <button
        className="hamburger"
        onClick={toggleSidebar}
        aria-label={isOpen ? 'Close menu' : 'Open menu'}
        aria-expanded={isOpen}
      >
        ☰
      </button>

      {/* Sidebar */}
      <aside className={`sidebar ${isOpen ? 'open' : ''}`} aria-hidden={!isOpen && window.innerWidth <= 768}>
        <h2>I-Slime</h2>
        <nav>
          <NavLink to="/" end onClick={() => setIsOpen(false)}>
            {t('All Builds')}
          </NavLink>
          {user ? (
            <>
              <NavLink to="/create-build" onClick={() => setIsOpen(false)}>
                {t('Create Build')}
              </NavLink>
              <NavLink to="/my-builds" onClick={() => setIsOpen(false)}>
                {t('My Builds')}
              </NavLink>
              {isAdmin && (
                <NavLink to="/admin-panel" onClick={() => setIsOpen(false)}>
                  🛠️ {t('Admin Panel')}
                </NavLink>
              )}
            </>
          ) : (
            <>
              <NavLink to="/login" onClick={() => setIsOpen(false)}>
                {t('Login')}
              </NavLink>
              <NavLink to="/register" onClick={() => setIsOpen(false)}>
                {t('Sign Up')}
              </NavLink>
            </>
          )}
        </nav>

        {user && (
          <div className="bottom-buttons">
            <button onClick={handleLogout} className="logout-button" aria-label={t('Sign out')}>
              {t('Sign out')}
            </button>

            <button className="language-switcher" onClick={toggleLanguage} aria-label="Change language">
              <span className="flag">{flag}</span> {langLabel}
            </button>
          </div>
        )}
      </aside>
    </>
  )
}
