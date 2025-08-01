import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { supabase, ADMIN_USERS } from '../lib/supabaseClient'
import '../index.css'
import { useTranslation } from 'react-i18next'

export default function Sidebar({ isOpen, toggleSidebar }) {
  const [user, setUser] = useState(null)
  const { t } = useTranslation()

  useEffect(() => {
    const getUser = async () => {
      const { data } = await supabase.auth.getUser()
      if (data?.user) setUser(data.user)
      else setUser(null)
    }

    getUser()

    const { data: listener } = supabase.auth.onAuthStateChange((event, session) => {
      if (event === 'SIGNED_IN') setUser(session.user)
      if (event === 'SIGNED_OUT') setUser(null)
    })

    return () => {
      listener?.subscription?.unsubscribe()
    }
  }, [])

  const isAdmin = user && ADMIN_USERS.includes(user.id)

  return (
    <>
      <button className="sidebar-toggle" onClick={toggleSidebar}>
        ☰
      </button>
      <div className={`sidebar ${isOpen ? 'open' : 'closed'}`}>
        <h2>{t('Build Planner')}</h2>
        <ul>
          <li><Link to="/" onClick={toggleSidebar}>{t('All Builds')}</Link></li>
          {user && (
            <>
              <li><Link to="/create-build" onClick={toggleSidebar}>{t('Create Build')}</Link></li>
              <li><Link to="/my-builds" onClick={toggleSidebar}>{t('My Builds')}</Link></li>
              <li>
                <button
                  onClick={async () => {
                    await supabase.auth.signOut()
                    toggleSidebar()
                  }}
                  style={{
                    background: 'none',
                    border: 'none',
                    color: 'white',
                    cursor: 'pointer',
                    padding: 0,
                  }}
                >
                  {t('Log Out')}
                </button>
              </li>
            </>
          )}
          {!user && (
            <>
              <li><Link to="/login" onClick={toggleSidebar}>{t('Log In')}</Link></li>
              <li><Link to="/register" onClick={toggleSidebar}>{t('Register')}</Link></li>
            </>
          )}
          {isAdmin && (
            <li><Link to="/admin" onClick={toggleSidebar}>{t('Admin Panel')}</Link></li>
          )}
        </ul>
      </div>
    </>
  )
}
