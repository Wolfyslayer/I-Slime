// src/App.jsx
import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Sidebar from './components/Sidebar'
import BuildList from './components/BuildList'
import BuildDetail from './components/BuildDetail'
import CreateBuild from './components/CreateBuild'
import EditBuild from './components/EditBuild'
import MyBuilds from './components/MyBuilds'
import AdminPanel from './components/AdminPanel'
import Login from './components/Login'
import Register from './components/Register'
import ProtectedRoute from './routes/ProtectedRoute'
import './styles/theme.css'
import './components/Sidebar.css'

export default function App() {
  return (
    <Router>
      <UserProvider>
        <div className="app-container">
          <Sidebar />
          <main className="main-content" style={{ padding: '20px' }}>
            <Routes>
              <Route path="/" element={<BuildList />} />
              <Route path="/BuildDetail/:id" element={<BuildDetail />} />
              <Route
                path="/CreateBuild"
                element={
                  <ProtectedRoute>
                    <CreateBuild />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/MyBuilds"
                element={
                  <ProtectedRoute>
                    <MyBuilds />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/EditBuild/:id"
                element={
                  <ProtectedRoute>
                    <EditBuild />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/AdminPanel"
                element={
                  <ProtectedRoute>
                    <AdminPanel />
                  </ProtectedRoute>
                }
              />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
            </Routes>
          </main>
        </div>
      </UserProvider>
    </Router>
  )
}
