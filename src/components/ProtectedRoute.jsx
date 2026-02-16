import { Navigate, useLocation } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'

export default function ProtectedRoute({ children }) {
  const { isAuthenticated, user, loading } = useAuth()
  const location = useLocation()
  const isDashboard = location.pathname.startsWith('/dashboard')

  if (loading) {
    return (
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '100vh',
        fontFamily: 'var(--font-display, sans-serif)',
      }}>
        Carregando...
      </div>
    )
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />
  }

  if (user?.firstAccessPending && isDashboard) {
    return <Navigate to="/primeiro-acesso" replace />
  }

  return children
}
