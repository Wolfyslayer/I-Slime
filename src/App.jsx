import React from 'react'
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
  return (
    <ErrorBoundaryWithTranslation>
      <Router>
        <UserProvider>
          <BuildProvider>
            <div
              className="app-container"
              style={{
                display: 'flex', // Flex på desktop, flex-direction ändras via CSS media query för mobil
                flexDirection: 'row',
                minHeight: '100vh',
                backgroundColor: '#111', // valfri bakgrund för kontrast
              }}
            >
              <Sidebar />
              <main className="main-content" style={{ padding: '20px', flexGrow: 1 }}>
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
          </BuildProvider>
        </UserProvider>
      </Router>
    </ErrorBoundaryWithTranslation>
  )
}
