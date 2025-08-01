import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import './Sidebar.css'  // vi gör en egen css för sidebar

export default function Sidebar() {
  const [isOpen, setIsOpen] = useState(true)

  return (
    <>
      <button className="toggle-btn" onClick={() => setIsOpen(!isOpen)}>
        {isOpen ? '☰' : '→'}
      </button>

      <nav className={`sidebar ${isOpen ? 'open' : 'closed'}`}>
        <h2>Build Planner</h2>
        <ul>
          <li><Link to="/">Build List</Link></li>
          <li><Link to="/my-builds">My Builds</Link></li>
          <li><Link to="/create-build">Create Build</Link></li>
          <li><Link to="/login">Login</Link></li>
          <li><Link to="/register">Register</Link></li>
        </ul>
      </nav>
    </>
  )
}
