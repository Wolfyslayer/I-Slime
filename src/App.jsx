// src/App.jsx

import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { UserProvider } from './context/UserContext'
import { useTranslation } from 'react-i18next'
import LanguageSwitcher from './components/LanguageSwitcher'
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

import './styles/theme.css'
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
          <h2>Ett fel har inträffat i App-komponenten</h2>
          <pre>{this.state.error?.message}</pre>
        </div>
      )
    }

    return this.props.children
  }
}

export default function App() {
  const { t } = useTranslation()

  return (
    <ErrorBoundary>
      <Router>
        <UserProvider>
          <BuildProvider>
            <LanguageSwitcher />
            <div className="app-container">
              <Sidebar />
              <main className="main-content" style={{ padding: '20px' }}>
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
    </ErrorBoundary>
  )
}
