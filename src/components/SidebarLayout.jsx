import React, { useState } from 'react';
import './SidebarLayout.css';
import { Link } from 'react-router-dom';

export default function SidebarLayout({ children }) {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <div className="layout">
      <aside className={`sidebar ${isOpen ? 'open' : 'closed'}`}>
        <button className="toggle-btn" onClick={() => setIsOpen(!isOpen)}>
          ☰
        </button>
        {isOpen && (
          <nav className="nav-links">
            <Link to="/">Start</Link>
            <Link to="/create">Skapa Build</Link>
            <Link to="/my-builds">Mina Builds</Link>
            <Link to="/community">Community</Link>
            <Link to="/login">Logga in</Link>
          </nav>
        )}
      </aside>

      <main className="main-content">
        {children}
      </main>
    </div>
  );
}
