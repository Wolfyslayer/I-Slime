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

      <h2>{t('I-Slime') || 'Menu'}</h2>

      <nav>
        <Link to="/" className={isActive('/') ? 'active' : ''}>
          {t('All Builds') || 'All Builds'}
        </Link>

        {user && (
          <>
            <Link to="/create-build" className={isActive('/create-build') ? 'active' : ''}>
              {t('Create Build') || 'Create Build'}
            </Link>
            <Link to="/my-builds" className={isActive('/my-builds') ? 'active' : ''}>
              {t('My Builds') || 'My Builds'}
            </Link>
          </>
        )}

        {isAdmin && (
          <Link to="/admin-panel" className={isActive('/admin-panel') ? 'active' : ''}>
            {t('Admin Panel') || 'Admin Panel'}
          </Link>
        )}

        {!user && (
          <>
            <Link to="/login" className={isActive('/login') ? 'active' : ''}>
              {t('Login') || 'Login'}
            </Link>
            <Link to="/register" className={isActive('/register') ? 'active' : ''}>
              {t('Sign Up') || 'Register'}
            </Link>
          </>
        )}
      </nav>

      <div className="bottom-buttons">
        {user && (
          <button onClick={handleLogout} className="logout-button">
            <LogOut size={14} /> {t('Sign Out') || 'Logout'}
          </button>
        )}
        <button onClick={changeLanguage} className="language-switcher">
          🌐 {i18n.language === 'en' ? 'SV' : 'EN'}
        </button>
      </div>
    </div>
  )
}
