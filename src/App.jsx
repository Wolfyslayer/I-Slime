import React, { useState } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { UserProvider } from './context/UserContext'
import { useTranslation } from 'react-i18next'

import Sidebar from './components/Sidebar'
import BuildList from './components/BuildList'
import BuildDetail from './components/BuildDetail'
import CreateBuild from './components/CreateBuild'
import EditBuild from './components/EditBuild'
import MyBuilds from './components/MyBuilds'
import AdminPanel from './components/AdminPanel'
import Login from './components/Login'
import Register from './components/Register'
import ForgotPassword from './components/ForgotPassword'
import ResetPassword from './components/ResetPassword'
import ProtectedRoute from './routes/ProtectedRoute'
import Welcome from './components/Welcome'
import AdminRoute from './routes/AdminRoute'
import { BuildProvider } from './components/BuildSystem/BuildContext'

import './lib/i18n'
import './components/Sidebar.css'
import './index.css'
import './styles/theme.css'

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props)
    this.state = { hasError: false, error: null }
  }
  static getDerivedStateFromError(error) {
    return { hasError: true, error }
  }
  componentDidCatch(error, errorInfo) {
    console.error('App Error:', error, errorInfo)
  }
  render() {
    if (this.state.hasError) {
      return (
        <div style={{ padding: 20, color: 'red' }}>
          <h2>{this.props.t('app_error_heading')}</h2>
          <pre>{this.state.error?.message}</pre>
        </div>
      )
    }
    return this.props.children
  }
}

function ErrorBoundaryWithTranslation(props) {
  const { t } = useTranslation()
  return <ErrorBoundary t={t} {...props} />
}

export default function App() {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const toggleSidebar = () => setSidebarOpen(open => !open)
  const closeSidebar = () => setSidebarOpen(false)

  return (
    <ErrorBoundaryWithTranslation>
      <Router>
        <UserProvider>
          <BuildProvider>
            <>
              {/* Hamburger button fixed top left */}
              <button
                className={`hamburger${sidebarOpen ? ' open' : ''}`}
                onClick={toggleSidebar}
                aria-label="Toggle sidebar"
              >
                ☰
              </button>
              <div className={`app-container${sidebarOpen ? ' sidebar-open' : ''}`}>
                <Sidebar isOpen={sidebarOpen} onClose={closeSidebar} />
                <main className="main-content" onClick={closeSidebar}>
                  <Routes>
                    <Route path="/" element={<BuildList />} />
                    <Route path="/build-detail/:id" element={<BuildDetail />} />
                    <Route
                      path="/create-build"
                      element={
                        <ProtectedRoute>
                          <CreateBuild />
                        </ProtectedRoute>
                      }
                    />
                    <Route
                      path="/edit-build/:id"
                      element={
                        <ProtectedRoute>
                          <EditBuild />
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
                    <Route
                      path="/admin-panel"
                      element={
                        <AdminRoute>
                          <AdminPanel />
                        </AdminRoute>
                      }
                    />
                    <Route path="/login" element={<Login />} />
                    <Route path="/register" element={<Register />} />
                    <Route path="/forgot-password" element={<ForgotPassword />} />
                    <Route path="/reset-password" element={<ResetPassword />} />
                    <Route path="/welcome" element={<Welcome />} />
                  </Routes>
                </main>
              </div>
            </>
          </BuildProvider>
        </UserProvider>
      </Router>
    </ErrorBoundaryWithTranslation>
  )
}
