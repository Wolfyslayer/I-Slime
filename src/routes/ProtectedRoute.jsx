import { Navigate } from 'react-router-dom'
import { useUser } from '../context/UserContext'

export default function ProtectedRoute({ children }) {
  const { user, loading } = useUser()

  if (loading) return null

  // Kontrollera att user finns OCH att e-post är verifierad
  const isVerified = user?.email_confirmed_at || user?.confirmed_at

  if (!user || !isVerified) {
    return <Navigate to="/login" replace />
  }

  return children
}
