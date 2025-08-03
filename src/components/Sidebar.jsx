// src/components/Sidebar.jsx
import React, { useState, useEffect } from 'react'
import { NavLink, useLocation } from 'react-router-dom'
import { useUser } from '../context/UserContext'
import './Sidebar.css'

export default function Sidebar() {
  const { user, isAdmin, loading } = useUser()
  const location = useLocation()
  const [isOpen, setIsOpen] = useState(false)

  useEffect(() => {
    setIsOpen(false)
  }, [location.pathname])

  if (loading) return null

  return (
    <>
      <button className="hamburger" onClick={() => setIsOpen(!isOpen)}>☰</button>
      <aside className={`sidebar ${isOpen ? 'open' : ''}`}>
        <h2>I-Slime</h2>
        <nav>
          <NavLink to="/" end>All Builds</NavLink>
          {user && (
            <>
              <NavLink to="/CreateBuild">Create Build</NavLink>
              <NavLink to="/MyBuilds">My Builds</NavLink>
              {isAdmin && <NavLink to="/AdminPanel">Admin</NavLink>}
            </>
          )}
          {!user && (
  <>
    <NavLink to="/login">{t('Login')}</NavLink>
    <NavLink to="/register">{t('Register')}</NavLink>
    <NavLink to="/forgot-password">{t('Forgot Password')}</NavLink>
  </>
)}
      </aside>
    </>
  )
}
