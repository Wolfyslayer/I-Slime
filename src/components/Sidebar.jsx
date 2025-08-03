// src/components/Sidebar.jsx
import React, { useState, useEffect } from 'react'
import { NavLink, useLocation } from 'react-router-dom'
import { useUser } from '../context/UserContext'
import './Sidebar.css'

export default function Sidebar() {
  const { user } = useUser()
  const location = useLocation()
  const [isOpen, setIsOpen] = useState(false)

  const toggleSidebar = () => setIsOpen(!isOpen)

  // Stäng sidomeny automatiskt vid navigering
  useEffect(() => {
    setIsOpen(false)
  }, [location.pathname])

  return (
    <>
      <button className="hamburger" onClick={toggleSidebar}>☰</button>
      <aside className={`sidebar ${isOpen ? 'open' : ''}`}>
        <h2>I-Slime</h2>
        <nav>
          <NavLink to="/" end className={({ isActive }) => isActive ? 'active' : ''}>
            All Builds
          </NavLink>

          {user && (
            <>
              <NavLink to="/create-build" className={({ isActive }) => isActive ? 'active' : ''}>
                Create Build
              </NavLink>
              <NavLink to="/my-builds" className={({ isActive }) => isActive ? 'active' : ''}>
                My Builds
              </NavLink>
              {import.meta.env.VITE_ADMIN_IDS?.split(',').includes(user.id) && (
                <NavLink to="/admin" className={({ isActive }) => isActive ? 'active' : ''}>
                  Admin
                </NavLink>
              )}
            </>
          )}

          {!user && (
            <>
              <NavLink to="/login" className={({ isActive }) => isActive ? 'active' : ''}>
                Login
              </NavLink>
              <NavLink to="/register" className={({ isActive }) => isActive ? 'active' : ''}>
                Register
              </NavLink>
            </>
          )}
        </nav>
      </aside>
    </>
  )
}
