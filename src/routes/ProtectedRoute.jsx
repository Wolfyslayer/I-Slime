import { Navigate } from 'react-router-dom'
import { useUser } from '../context/UserContext'

export default function ProtectedRoute({ children }) {
  const { user, loading } = useUser()

  if (loading) return <div style={{ padding: 20 }}>🔄 Laddar...</div>

  const isVerified = user?.email_confirmed_at || user?.confirmed_at

  if (!user || !isVerified) {
    return <Navigate to="/login" replace />
  }

  return children
}
