// src/App.jsximport React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { UserProvider } from './context/UserContext'
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
              <Route path="/build-detail/:id" element={<BuildDetail />} />
              <Route path="/create-build" element={
                <ProtectedRoute><CreateBuild /></ProtectedRoute>
              } />
              <Route path="/my-builds" element={
                <ProtectedRoute><MyBuilds /></ProtectedRoute>
              } />
              <Route path="/edit-build/:id" element={
                <ProtectedRoute><EditBuild /></ProtectedRoute>
              } />
              <Route path="/AdminPanel" element={
                <ProtectedRoute><AdminPanel /></ProtectedRoute>
              } />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/forgot-password" element={<ForgotPassword />} />
              <Route path="/reset-password" element={<ResetPassword />} />
              <Route path="/welcome" element={<Welcome />} />
            </Routes>
          </main>
        </div>
      </UserProvider>
    </Router>
  )
}
