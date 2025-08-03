// src/components/Sidebar.jsx
import React, { useState, useEffect } from 'react'
import { NavLink, useLocation } from 'react-router-dom'
import { useUser } from '../context/UserContext'
import './Sidebar.css'

export default function Sidebar() {
  const { user, isAdmin, loading } = useUser()
  const location = useLocation()
  const [isOpen, setIsOpen] = useState(false)

  const toggleSidebar = () => setIsOpen(!isOpen)

  useEffect(() => {
    setIsOpen(false)
  }, [location.pathname])

  if (loading) return null

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
              {isAdmin && <NavLink to="/admin">Admin</NavLink>}
            </>
          )}
          {!user && <NavLink to="/login">Login</NavLink>}
        </nav>
      </aside>
    </>
  )
}
