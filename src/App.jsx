import React, { useState } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import supabase from './lib/supabaseClient'
import Sidebar from './components/Sidebar'
import ProtectedRoute from './routes/ProtectedRoute'
import Register from './components/Register'
import Login from './components/Login'
import CreateBuild from './components/CreateBuild'
import BuildList from './components/BuildList'
import MyBuilds from './components/MyBuilds'
import ClassSelector from './components/classes/ClassSelector';
import PathSelector from './components/classes/PathSelector';
import PetsSelector from './components/classes/PetsSelector';
import SkillsSelector from './components/classes/SkillsSelector';
import ItemsEditor from './components/classes/ItemsEditor';
import './styles/theme.css';
import AdminPanel from './components/AdminPanel'
import { useTranslation } from 'react-i18next'

export default function App() {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const toggleSidebar = () => setSidebarOpen(!sidebarOpen)

  const { t } = useTranslation()

  return (
    <Router>
      <Sidebar isOpen={sidebarOpen} toggleSidebar={toggleSidebar} />
      <main className={`main-content ${sidebarOpen ? 'sidebar-active' : ''}`}>
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
    </Router>
  )
}
