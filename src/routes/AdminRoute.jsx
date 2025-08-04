// src/components/AdminRoute.jsx
import { Navigate } from 'react-router-dom'
import { useUser } from '../context/UserContext'
import AccessDenied from './components/AccessDenied'

export default function AdminRoute({ children }) {
  const { user, isAdmin, loading } = useUser()

  if (loading) return <div style={{ padding: 20 }}>🔄 Laddar adminrättigheter...</div>

  if (!user || !isAdmin) {
  return <AccessDenied message=\"Du måste vara administratör för att komma åt denna sida.\" />
  }

  return children
}
