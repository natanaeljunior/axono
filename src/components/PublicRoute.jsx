import { Navigate, useLocation } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'

/**
 * Rotas públicas (login, esqueci-senha, primeiro-acesso).
 * Se já estiver autenticado, redireciona para o dashboard — exceto em /primeiro-acesso
 * quando firstAccessPending, para o usuário concluir o fluxo.
 */
export default function PublicRoute({ children }) {
  const { isAuthenticated, user, loading } = useAuth()
  const location = useLocation()
  const isFirstAccessPage = location.pathname === '/primeiro-acesso'

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

  if (isAuthenticated && !(isFirstAccessPage && user?.firstAccessPending)) {
    return <Navigate to="/dashboard" replace />
  }

  return children
}
