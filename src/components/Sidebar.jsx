import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { createClient } from '@supabase/supabase-js'
import '../index.css'

// Skapa Supabase klient - byt ut URL och key mot dina egna miljövariabler
const supabase = createClient(process.env.REACT_APP_SUPABASE_URL, process.env.REACT_APP_SUPABASE_ANON_KEY)

export default function Sidebar({ isOpen, toggleSidebar }) {
  const [user, setUser] = useState(null)

  useEffect(() => {
    const sessionUser = supabase.auth.getUser().then(({ data }) => {
      setUser(data.user)
    })

    // Prenumerera på auth changes så vi kan uppdatera om användaren loggar in/ut
    const { data: authListener } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null)
    })

    return () => {
      authListener?.subscription.unsubscribe()
    }
  }, [])

  return (
    <>
      <button className="sidebar-toggle" onClick={toggleSidebar}>
        ☰
      </button>
      <div className={`sidebar ${isOpen ? 'open' : 'closed'}`}>
        <h2>Build Planner</h2>
        <ul>
          <li><Link to="/" onClick={toggleSidebar}>Alla Builds</Link></li>

          {/* Visa dessa bara om användare är inloggad */}
          {user && (
            <>
              <li><Link to="/create-build" onClick={toggleSidebar}>Skapa Build</Link></li>
              <li><Link to="/my-builds" onClick={toggleSidebar}>Mina Builds</Link></li>
              <li>
                <button
                  onClick={async () => {
                    await supabase.auth.signOut()
                    setUser(null)
                    toggleSidebar()
                  }}
                  className="logout-button"
                >
                  Logga ut
                </button>
              </li>
            </>
          )}

          {/* Visa bara om ingen användare är inloggad */}
          {!user && (
            <>
              <li><Link to="/login" onClick={toggleSidebar}>Logga In</Link></li>
              <li><Link to="/register" onClick={toggleSidebar}>Registrera</Link></li>
            </>
          )}
        </ul>
      </div>
    </>
  )
}
