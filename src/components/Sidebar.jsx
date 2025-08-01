import React from 'react'
import { Link } from 'react-router-dom'
import './Sidebar.css'

export default function Sidebar() {
  const [isOpen, setIsOpen] = React.useState(true)

  return (
    <>
      <button onClick={() => setIsOpen(!isOpen)} style={{ position: 'fixed', top: 10, left: 10, zIndex: 999 }}>
        ☰
      </button>
      <nav className={`sidebar ${isOpen ? 'open' : 'closed'}`}>
        <h2>Build Planner</h2>
        <ul>
          <li><Link to="/">Build List</Link></li>
          <li><Link to="/create-build">Skapa Build</Link></li>
          <li><Link to="/my-builds">Mina Builds</Link></li>
          <li><Link to="/login">Logga In</Link></li>
          <li><Link to="/register">Registrera</Link></li>
        </ul>
      </nav>
    </>
  )
}
