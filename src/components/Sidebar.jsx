// src/components/Sidebar.jsx
import React, { useState, useEffect } from 'react'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import { useUser } from '../context/UserContext'
import './Sidebar.css'

export default function Sidebar() {
  const { user, logout } = useUser()
  const navigate = useNavigate()
  const location = useLocation()
  const [isOpen, setIsOpen] = useState(false)

  const toggleSidebar = () => setIsOpen(!isOpen)

  const handleLogout = () => {
    logout()
    navigate('/')
    setIsOpen(false)
  }

  // Close sidebar when navigating
  useEffect(() => {
    setIsOpen(false)
  }, [location.pathname])

  return (
    <>
      <button className="sidebar-toggle" onClick={toggleSidebar}>
        ☰
      </button>
      <div className={`sidebar ${isOpen ? 'open' : ''}`}>
        <h2>I-Slime</h2>
        <nav>
          <ul>
            <li><Link to="/">{'Home'}</Link></li>
            {user ? (
              <>
                <li><Link to="/my-builds">{'My Builds'}</Link></li>
                <li><Link to="/create-build">{'Create Build'}</Link></li>
                <li><Link to="/admin">{'Admin Panel'}</Link></li>
                <li><button onClick={handleLogout}>{'Logout'}</button></li>
              </>
            ) : (
              <>
                <li><Link to="/login">{'Login'}</Link></li>
                <li><Link to="/register">{'Sign Up'}</Link></li>
              </>
            )}
          </ul>
        </nav>
      </div>
    </>
  )
}
