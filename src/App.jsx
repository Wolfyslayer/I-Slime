import React, { useState } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import ProtectedRoute from './routes/ProtectedRoute'
import Register from './components/Register'
import Login from './components/Login'
import CreateBuild from './components/CreateBuild'
import BuildList from './components/BuildList'
import MyBuilds from './components/MyBuilds'
import Sidebar from './components/Sidebar'
import './index.css'

export default function App() {
  const [sidebarOpen, setSidebarOpen] = useState(false)

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen)
  }

  return (
    <Router>
      <Sidebar isOpen={sidebarOpen} toggleSidebar={toggleSidebar} />
      <div className={`main-content ${sidebarOpen ? 'sidebar-active' : ''}`}>
        <Routes>
          <Route path="/" element={<BuildList />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route
            path="/create-build"
            element={
              <ProtectedRoute>
                <CreateBuild />
              </ProtectedRoute>
            }
          />
          <Route
            path="/my-builds"
            element={
              <ProtectedRoute>
                <MyBuilds />
              </ProtectedRoute>
            }
          />
        </Routes>
      </div>
    </Router>
  )
}
