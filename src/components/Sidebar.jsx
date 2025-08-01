import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { supabase, ADMIN_USERS } from '../lib/supabaseClient'
import '../index.css'

export default function Sidebar({ isOpen, toggleSidebar }) {
  const { t } = useTranslation()
  const [user, setUser] = useState(null)

  useEffect(() => {
    const getUser = async () => {
      const { data, error } = await supabase.auth.getUser()
      if (data?.user) {
        setUser(data.user)
      } else {
        setUser(null)
      }
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
        <h2>{t('buildPlanner')}</h2>
        <ul>
          <li><Link to="/" onClick={toggleSidebar}>{t('allBuilds')}</Link></li>
          {user && (
            <>
              <li><Link to="/create-build" onClick={toggleSidebar}>{t('createBuild')}</Link></li>
              <li><Link to="/my-builds" onClick={toggleSidebar}>{t('myBuilds')}</Link></li>
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
                  {t('logout')}
                </button>
              </li>
            </>
          )}
          {!user && (
            <>
              <li><Link to="/login" onClick={toggleSidebar}>{t('login')}</Link></li>
              <li><Link to="/register" onClick={toggleSidebar}>{t('register')}</Link></li>
            </>
          )}
          {isAdmin && (
            <li><Link to="/admin" onClick={toggleSidebar}>{t('adminPanel')}</Link></li>
          )}
        </ul>
      </div>
    </>
  )
}
