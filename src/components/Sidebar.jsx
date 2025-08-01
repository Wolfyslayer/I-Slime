import React from 'react'
import { Link } from 'react-router-dom'
import '../index.css'

export default function Sidebar({ isOpen, toggleSidebar, user, onLogout }) {
  return (
    <>
      <button className="sidebar-toggle" onClick={toggleSidebar}>
        ☰
      </button>
      <nav className={`sidebar ${isOpen ? 'open' : 'closed'}`}>
        <h2>Build Planner</h2>
        <ul>
          <li>
            <Link to="/" onClick={toggleSidebar}>
              Alla Builds
            </Link>
          </li>
          {user && (
            <>
              <li>
                <Link to="/create-build" onClick={toggleSidebar}>
                  Skapa Build
                </Link>
              </li>
              <li>
                <Link to="/my-builds" onClick={toggleSidebar}>
                  Mina Builds
                </Link>
              </li>
              <li>
                <button onClick={() => { onLogout(); toggleSidebar(); }} className="logout-btn">
                  Logga ut
                </button>
              </li>
            </>
          )}
          {!user && (
            <>
              <li>
                <Link to="/login" onClick={toggleSidebar}>
                  Logga In
                </Link>
              </li>
              <li>
                <Link to="/register" onClick={toggleSidebar}>
                  Registrera
                </Link>
              </li>
            </>
          )}
        </ul>
      </nav>
    </>
  )
}
