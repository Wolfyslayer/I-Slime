import React from 'react';
import { NavLink } from 'react-router-dom';
import './Sidebar.css';

export default function Sidebar() {
  return (
    <nav className="sidebar">
      <h2 className="sidebar-title">Build Planner</h2>
      <ul className="sidebar-menu">
        <li><NavLink to="/" className={({isActive}) => isActive ? "sidebar-item active" : "sidebar-item"}>Alla Builds</NavLink></li>
        <li><NavLink to="/create-build" className={({isActive}) => isActive ? "sidebar-item active" : "sidebar-item"}>Skapa Build</NavLink></li>
        <li><NavLink to="/my-builds" className={({isActive}) => isActive ? "sidebar-item active" : "sidebar-item"}>Mina Builds</NavLink></li>
        <li><NavLink to="/admin" className={({isActive}) => isActive ? "sidebar-item active" : "sidebar-item"}>Adminpanel</NavLink></li>
      </ul>
      <div className="sidebar-footer">© 2025</div>
    </nav>
  );
}
