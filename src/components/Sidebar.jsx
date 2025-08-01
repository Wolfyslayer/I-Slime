import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import './Sidebar.css'

export default function Sidebar() {
  const [isOpen, setIsOpen] = useState(false)

  const toggleSidebar = () => {
    setIsOpen(!isOpen)
  }

  return (
    <>
      <button className="menu-toggle" onClick={toggleSidebar}>
        ☰
      </button>
      <div className={`sidebar ${isOpen ? 'active' : ''}`}>
        <h2>Menu</h2>
        <Link to="/">Builds</Link>
        <Link to="/create-build">Skapa Build</Link>
        <Link to="/login">Logga In</Link>
        <Link to="/register">Sign Up</Link>
        <Link to="/my-builds">Mina Builds</Link>
      </div>
    </>
  )
}
