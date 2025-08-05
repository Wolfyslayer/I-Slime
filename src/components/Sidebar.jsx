import React, { useEffect } from 'react'
import { NavLink, useLocation, useNavigate } from 'react-router-dom'
import { useUser } from '../context/UserContext'
import { supabase } from '../lib/supabaseClient'
import { useTranslation } from 'react-i18next'
import './Sidebar.css'

export default function Sidebar({ isOpen, onClose }) {
  const { user, loading, isAdmin } = useUser()
  const location = useLocation()
  const navigate = useNavigate()
  const { i18n, t } = useTranslation()

  // Stäng sidebar när path ändras
  useEffect(() => {
    onClose()
  }, [location.pathname, onClose])

  if (loading) return null

  const handleLogout = async () => {
    await supabase.auth.signOut()
    navigate('/login')
    onClose() // Stäng menyn vid logout
  }

  const toggleLanguage = () => {
    const newLang = i18n.language === 'sv' ? 'en' : 'sv'
    i18n.changeLanguage(newLang)
  }

  const flag = i18n.language === 'sv' ? '🇸🇪' : '🇬🇧'
  const langLabel = i18n.language === 'sv' ? 'SV' : 'EN'

  return (
    <aside className={`sidebar ${isOpen ? 'open' : ''}`} aria-hidden={!isOpen}>
      {/* Valfri knapp för att stänga sidebar på mobil */}
      <button
        className="close-sidebar"
        onClick={onClose}
        aria-label={t('Close menu')}
      >
        ✕
      </button>

      <h2>I-Slime</h2>
      <nav>
        <NavLink to="/" end onClick={onClose}>
          {t('All Builds')}
        </NavLink>
        {user ? (
          <>
            <NavLink to="/create-build" onClick={onClose}>{t('Create Build')}</NavLink>
            <NavLink to="/my-builds" onClick={onClose}>{t('My Builds')}</NavLink>
            {isAdmin && (
              <NavLink to="/admin-panel" onClick={onClose}>
                🛠️ {t('Admin Panel')}
              </NavLink>
            )}
          </>
        ) : (
          <>
            <NavLink to="/login" onClick={onClose}>{t('Login')}</NavLink>
            <NavLink to="/register" onClick={onClose}>{t('Sign Up')}</NavLink>
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
  )
}
