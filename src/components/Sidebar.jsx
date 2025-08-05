import React from 'react'
import { NavLink } from 'react-router-dom'
import { useTranslation } from 'react-i18next'

export default function Sidebar({ isOpen, onClose }) {
  const { t } = useTranslation()

  return (
    <aside className={`sidebar${isOpen ? ' open' : ''}`}>
      <button className="close-sidebar" onClick={onClose} aria-label={t('close_sidebar')}>
        &times;
      </button>
      <h2>{t('sidebar_title')}</h2>
      <nav>
        <NavLink to="/" onClick={onClose} end>{t('nav_home')}</NavLink>
        <NavLink to="/my-builds" onClick={onClose}>{t('nav_my_builds')}</NavLink>
        <NavLink to="/create-build" onClick={onClose}>{t('nav_create_build')}</NavLink>
        <NavLink to="/admin-panel" onClick={onClose}>{t('nav_admin_panel')}</NavLink>
        {/* Add more links as needed */}
      </nav>
      <div className="bottom-buttons">
        <button className="logout-button">{t('logout')}</button>
        <button className="language-switcher">
          <span className="flag">🌐</span>
          {t('switch_language')}
        </button>
      </div>
    </aside>
  )
}
