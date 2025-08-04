// src/components/Sidebar.jsx
import React, { useState, useEffect } from 'react'
import { NavLink, useLocation, useNavigate } from 'react-router-dom'
import { useUser } from '../context/UserContext'
import { supabase } from '../lib/supabaseClient'
import './Sidebar.css'

export default function Sidebar() {
  const { user, loading, isAdmin } = useUser()
  const location = useLocation()
  const navigate = useNavigate()
  const [isOpen, setIsOpen] = useState(false)

  const toggleSidebar = () => setIsOpen(!isOpen)

  useEffect(() => {
    setIsOpen(false)
  }, [location.pathname])

  if (loading) return null

  const handleLogout = async () => {
    await supabase.auth.signOut()
    navigate('/login')
  }

  return (
    <>
      <button className="hamburger" onClick={toggleSidebar}>☰</button>
      <aside className={`sidebar ${isOpen ? 'open' : ''}`}>
        <h2>I-Slime</h2>
        <nav>
          <NavLink to="/" end>All Builds</NavLink>
          {user && (
            <>
              <NavLink to="/create-build">Create Build</NavLink>
              <NavLink to="/my-builds">My Builds</NavLink>
              {isAdmin && (
               <NavLink to="/admin-panel">
                  🛠️ Admin Panel
               </NavLink>
               )}

              {/* Logga ut-knappen som en vanlig knapp med styling som länk */}
              <button
                onClick={handleLogout}
                className="logout-button"
                style={{
                  background: 'none',
                  border: 'none',
                  padding: 0,
                  marginTop: '1rem',
                  color: '#00f9ff',
                  cursor: 'pointer',
                  fontSize: '1rem',
                  textAlign: 'left',
                  fontFamily: 'inherit'
                }}
              >
                Sign out
              </button>
            </>
          )}
          {!user && (
            <>
              <NavLink to="/login">Login</NavLink>
              <NavLink to="/register">Sign Up</NavLink>
            </>
          )}
        </nav>
      </aside>
    </>
  )
}
