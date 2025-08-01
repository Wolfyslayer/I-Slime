import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import ProtectedRoute from './routes/ProtectedRoute'
import Register from './components/Register'
import Login from './components/Login'
import CreateBuild from './components/CreateBuild'
import BuildList from './components/BuildList'

export default function App() {
  return (
    <Router>
      <Navbar />
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
      </Routes>
    </Router>
  )
}
