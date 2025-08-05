import React, { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { useUser } from '../context/UserContext'
import { supabase } from '../lib/supabaseClient'
import { Menu, X, Home, Plus, User, LogIn, LogOut, Shield, List } from 'lucide-react'
import './Sidebar.css'

export default function Sidebar() {
  const { user, logout } = useUser()
  const [isAdmin, setIsAdmin] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const location = useLocation()

  // Stäng meny automatiskt vid sidbyte
  useEffect(() => {
    setMenuOpen(false)
  }, [location.pathname])

  // Kolla om användaren är admin
  useEffect(() => {
    async function checkAdmin() {
      if (user) {
        const { data, error } = await supabase
          .from('admin_users')
          .select('id')
          .eq('id', user.id)
          .single()

        setIsAdmin(!!data && !error)
      } else {
        setIsAdmin(false)
      }
    }
    checkAdmin()
  }, [user])

  return (
    <div className="sidebar">
      <button className="menu-toggle" onClick={() => setMenuOpen(!menuOpen)}>
        {menuOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      <nav className={`menu ${menuOpen ? 'open' : ''}`}>
        <Link to="/" className="menu-item">
          <Home size={20} /> Home
        </Link>

        <Link to="/builds" className="menu-item">
          <List size={20} /> All Builds
        </Link>

        {user && (
          <>
            <Link to="/create-build" className="menu-item">
              <Plus size={20} /> Create Build
            </Link>

            <Link to="/my-builds" className="menu-item">
              <User size={20} /> My Builds
            </Link>
          </>
        )}

        {isAdmin && (
          <Link to="/admin" className="menu-item">
            <Shield size={20} /> Admin
          </Link>
        )}

        {!user ? (
          <>
            <Link to="/login" className="menu-item">
              <LogIn size={20} /> Login
            </Link>
            <Link to="/register" className="menu-item">
              <User size={20} /> Register
            </Link>
          </>
        ) : (
          <button onClick={logout} className="menu-item logout-btn">
            <LogOut size={20} /> Logout
          </button>
        )}
      </nav>
    </div>
  )
}
