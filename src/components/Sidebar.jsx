import React from 'react'
import { Link } from 'react-router-dom'
import { supabase, ADMIN_USERS } from 'src/lib/supabaseClient'
import '../index.css'

export default function Sidebar({ isOpen, toggleSidebar }) {
  const user = supabase.auth.user()
  const isAdmin = user && ADMIN_USERS.includes(user.id)

  return (
    <>
      <button className="sidebar-toggle" onClick={toggleSidebar}>
        ☰
      </button>
      <div className={`sidebar ${isOpen ? 'open' : 'closed'}`}>
        <h2>Build Planner</h2>
        <ul>
          <li><Link to="/" onClick={toggleSidebar}>Alla Builds</Link></li>
          {user && (
            <>
              <li><Link to="/create-build" onClick={toggleSidebar}>Skapa Build</Link></li>
              <li><Link to="/my-builds" onClick={toggleSidebar}>Mina Builds</Link></li>
              <li><button onClick={async () => {await supabase.auth.signOut(); toggleSidebar()}} style={{background:'none',border:'none',color:'white',cursor:'pointer',padding:'0'}}>Logga ut</button></li>
            </>
          )}
          {!user && (
            <>
              <li><Link to="/login" onClick={toggleSidebar}>Logga In</Link></li>
              <li><Link to="/register" onClick={toggleSidebar}>Registrera</Link></li>
            </>
          )}
          {isAdmin && (
            <li><Link to="/admin" onClick={toggleSidebar}>Adminpanel</Link></li>
          )}
        </ul>
      </div>
    </>
  )
}
