// src/components/Sidebar.jsx
import React, { useState, useEffect } from 'react'
import { NavLink, useLocation } from 'react-router-dom'
import { useUser } from '../context/UserContext'
import { supabase } from '../lib/supabaseClient'
import './Sidebar.css'

export default function Sidebar() {
  const { user, loading } = useUser()
  const [isAdmin, setIsAdmin] = useState(false)
  const location = useLocation()
  const [isOpen, setIsOpen] = useState(false)

  const toggleSidebar = () => setIsOpen(!isOpen)

  useEffect(() => {
    setIsOpen(false)
  }, [location.pathname])

  useEffect(() => {
    const checkAdmin = async () => {
      if (user?.id) {
        const { data } = await supabase
          .from('admin_users')
          .select('user_id')
          .eq('user_id', user.id)
          .single()

        setIsAdmin(!!data)
      }
    }

    checkAdmin()
  }, [user])

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
              <NavLink to="/CreateBuild">Create Build</NavLink>
              <NavLink to="/MyBuilds">My Builds</NavLink>
              {isAdmin && <NavLink to="/AdminPanel">Admin</NavLink>}
            </>
          )}
          {!user && (
            <>
              <NavLink to="/login">Login</NavLink>
              <NavLink to="/register">Sign Up</NavLink>
            </>
          )}
        </nav>
      </aside>
    </>
  )
}
