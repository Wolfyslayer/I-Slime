// src/components/Sidebar.jsx
import React, { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { useUser } from '../context/UserContext'
import './Sidebar.css'

export default function Sidebar() {
  const { user, loading } = useUser()
  if (loading) return null
  const location = useLocation()
  const [isOpen, setIsOpen] = useState(false)

  const toggleSidebar = () => setIsOpen(!isOpen)

  // Stäng sidomeny automatiskt vid navigering
  useEffect(() => {
    setIsOpen(false)
  }, [location.pathname])

  return (
    <>
      <button className="hamburger" onClick={toggleSidebar}>
        ☰
      </button>
      <aside className={`sidebar ${isOpen ? 'open' : ''}`}>
        <h2>I-Slime</h2>
        <nav>
          <Link to="/" className={location.pathname === '/' ? 'active' : ''}>All Builds</Link>
          {user && (
            <>
              <Link to="/create-build" className={location.pathname === '/create-build' ? 'active' : ''}>Create Build</Link>
              <Link to="/my-builds" className={location.pathname === '/my-builds' ? 'active' : ''}>My Builds</Link>
              {user && user.id && import.meta.env.VITE_ADMIN_IDS?.split(',').includes(user.id) && (
                <Link to="/admin" className={location.pathname === '/admin' ? 'active' : ''}>Admin</Link>
              )}
            </>
          )}
          {!user && <Link to="/login">Login</Link>}
        </nav>
      </aside>
    </>
  )
}
