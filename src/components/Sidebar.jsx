import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { FaBars, FaTimes } from "react-icons/fa";
import "./Sidebar.css"; // Anpassa om du har stil här

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const toggleSidebar = () => setIsOpen(!isOpen);
  const closeSidebar = () => setIsOpen(false);

  const isActive = (path) => location.pathname === path;

  return (
    <>
      <button className="sidebar-toggle" onClick={toggleSidebar}>
        {isOpen ? <FaTimes /> : <FaBars />}
      </button>
      <nav className={`sidebar ${isOpen ? "open" : ""}`}>
        <ul>
          <li><Link to="/" onClick={closeSidebar} className={isActive("/") ? "active" : ""}>Home</Link></li>
          <li><Link to="/create" onClick={closeSidebar} className={isActive("/create") ? "active" : ""}>Create Build</Link></li>
          <li><Link to="/my-builds" onClick={closeSidebar} className={isActive("/my-builds") ? "active" : ""}>My Builds</Link></li>
          <li><Link to="/admin" onClick={closeSidebar} className={isActive("/admin") ? "active" : ""}>Admin</Link></li>
          <li><Link to="/login" onClick={closeSidebar} className={isActive("/login") ? "active" : ""}>Login</Link></li>
          <li><Link to="/register" onClick={closeSidebar} className={isActive("/register") ? "active" : ""}>Sign Up</Link></li>
        </ul>
      </nav>
    </>
  );
};

export default Sidebar;
