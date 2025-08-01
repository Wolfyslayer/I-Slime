import React, { useState } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Sidebar from './components/Sidebar'
import BuildList from './components/BuildList'
import BuildDetail from './components/BuildDetail'
import CreateBuild from './components/CreateBuild'
import EditBuild from './components/EditBuild'
import MyBuilds from './components/MyBuilds'
import AdminPanel from './components/AdminPanel'
import ProtectedRoute from './routes/ProtectedRoute'
import './styles/theme.css'

export default function App() {
  const [sidebarOpen, setSidebarOpen] = useState(false)

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen)
  }

  return (
    <Router>
      <div className={`app-container ${sidebarOpen ? 'sidebar-open' : ''}`}>
        <Sidebar isOpen={sidebarOpen} toggleSidebar={toggleSidebar} />
        <main className="main-content">
          <Routes>
            <Route path="/" element={<BuildList />} />
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
            <Route path="/build/:id" element={<BuildDetail />} />
            <Route
              path="/edit-build/:id"
              element={
                <ProtectedRoute>
                  <EditBuild />
                </ProtectedRoute>
              }
            />
            <Route
              path="/admin"
              element={
                <ProtectedRoute>
                  <AdminPanel />
                </ProtectedRoute>
              }
            />
          </Routes>
        </main>
      </div>
    </Router>
  )
}
