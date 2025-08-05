import React, { useContext } from 'react'
import { NavLink } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { UserContext } from '../context/UserContext'

export default function Sidebar({ isOpen, onClose }) {
  const { t } = useTranslation()
  const { user, isAdmin } = useContext(UserContext) // Assumes isAdmin is exposed in context

  const signedIn = !!user

  return (
    <aside className={`sidebar${isOpen ? ' open' : ''}`}>
      <button className="close-sidebar" onClick={onClose} aria-label={t('Sign out')}>
        &times;
      </button>
      <h2>{t('Build Planner')}</h2>
      <nav>
        <NavLink to="/" onClick={onClose} end>{t('All Builds')}</NavLink>
        {signedIn && (
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
        {signedIn && (
          <button className="logout-button">{t('Sign out')}</button>
        )}
        <button className="language-switcher">
          <span className="flag">🌐</span>
          {t('Build Planner')}
        </button>
      </div>
    </aside>
  )
}
