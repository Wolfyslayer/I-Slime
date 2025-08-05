fromext React, { useContext } from 'react'
import { NavLink } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { useUser } from '../context/UserContext'

export default function Sidebar({ isOpen, onClose }) {
  const { t } = useTranslation()
  const { user, isAdmin, setUser } = useContext(UserContext)

  // Only show for signed in users
  const signedIn = !!user

  const handleSignOut = async () => {
    // If you want signout logic here, you can call supabase.auth.signOut and update context
    if (window.confirm(t("Are you sure you want to sign out?"))) {
      // You may want to trigger a sign out here if not handled elsewhere
      // Example: await supabase.auth.signOut();
      setUser(null)
      window.location.href = '/login' // Or use your router to redirect
    }
  }

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
          <button className="logout-button" onClick={handleSignOut}>
            {t('Sign out')}
          </button>
        )}
        <button className="language-switcher">
          <span className="flag">🌐</span>
          {t('Build Planner')}
        </button>
      </div>
    </aside>
  )
}
