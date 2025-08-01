import React, { useState } from 'react'
import { Link } from 'react-router-dom'

export default function Sidebar() {
  const [isOpen, setIsOpen] = useState(true)

  const toggleSidebar = () => setIsOpen(!isOpen)

  return (
    <>
      <button className="sidebar-toggle" onClick={toggleSidebar}>
        {isOpen ? '✕' : '☰'}
      </button>
      <div className={`sidebar ${!isOpen ? 'hidden' : ''}`}>
        <h2>Build Planner</h2>
        <nav>
          <ul>
            <li><Link to="/">Alla Builds</Link></li>
            <li><Link to="/create-build">Skapa Build</Link></li>
            <li><Link to="/my-builds">Mina Builds</Link></li>
            <li><Link to="/login">Logga in</Link></li>
            <li><Link to="/register">Registrera</Link></li>
          </ul>
        </nav>
      </div>
    </>
  )
}
