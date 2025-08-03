// src/routes/ProtectedRoute.jsx
import React from 'react'
import { Navigate } from 'react-router-dom'
import { useUser } from '../context/UserContext'

export default function ProtectedRoute({ children }) {
  const { user, loading } = useUser()

  if (loading) return <p>Loading...</p>
  if (!user) return <Navigate to="/login" />

  return children
}
