import React from 'react'
import { Link } from 'react-router-dom'
import '../Sidebar.css' // Eller behåll './Sidebar.css' om du använder det separat

export default function Sidebar({ isOpen, toggleSidebar }) {
  return (
    <>
      <button className="sidebar-toggle" onClick={toggleSidebar}>
        ☰
      </button>
      <div className={`sidebar ${isOpen ? 'open' : 'closed'}`}>
        <h2>Build Planner</h2>
        <ul>
          <li><Link to="/" onClick={toggleSidebar}>Alla Builds</Link></li>
          <li><Link to="/create-build" onClick={toggleSidebar}>Skapa Build</Link></li>
          <li><Link to="/my-builds" onClick={toggleSidebar}>Mina Builds</Link></li>
          <li><Link to="/login" onClick={toggleSidebar}>Logga In</Link></li>
          <li><Link to="/register" onClick={toggleSidebar}>Registrera</Link></li>
        </ul>
      </div>
    </>
  )
}
