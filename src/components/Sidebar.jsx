// src/components/Sidebar.jsx
import React from 'react'
import { Link, useLocation } from 'react-router-dom'
import { useUser } from '../context/UserContext'
import { LogOut } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import '../components/Sidebar.css'

export default function Sidebar({ isOpen, onClose }) {
  const { user, isAdmin, setUser } = useUser()
  const { t, i18n } = useTranslation()
  const location = useLocation()

  const handleLogout = async () => {
    const { error } = await supabase.auth.signOut()
    if (!error) setUser(null)
  }

  const changeLanguage = () => {
    i18n.changeLanguage(i18n.language === 'en' ? 'sv' : 'en')
  }

  const isActive = (path) => location.pathname === path

  return (
    <div className={`sidebar${isOpen ? ' open' : ''}`}>
      <button className="close-sidebar" onClick={onClose}>×</button>

      <h2>{t('navigation_title') || 'Menu'}</h2>

      <nav>
        <Link to="/" className={isActive('/') ? 'active' : ''}>
          {t('all_builds') || 'All Builds'}
        </Link>

        {user && (
          <>
            <Link to="/create-build" className={isActive('/create-build') ? 'active' : ''}>
              {t('create_build') || 'Create Build'}
            </Link>
            <Link to="/my-builds" className={isActive('/my-builds') ? 'active' : ''}>
              {t('my_builds') || 'My Builds'}
            </Link>
          </>
        )}

        {isAdmin && (
          <Link to="/admin-panel" className={isActive('/admin-panel') ? 'active' : ''}>
            {t('admin_panel') || 'Admin Panel'}
          </Link>
        )}

        {!user && (
          <>
            <Link to="/login" className={isActive('/login') ? 'active' : ''}>
              {t('login') || 'Login'}
            </Link>
            <Link to="/register" className={isActive('/register') ? 'active' : ''}>
              {t('register') || 'Register'}
            </Link>
          </>
        )}
      </nav>

      <div className="bottom-buttons">
        {user && (
          <button onClick={handleLogout} className="logout-button">
            <LogOut size={14} /> {t('logout') || 'Logout'}
          </button>
        )}
        <button onClick={changeLanguage} className="language-switcher">
          🌐 {i18n.language === 'en' ? 'SV' : 'EN'}
        </button>
      </div>
    </div>
  )
}
