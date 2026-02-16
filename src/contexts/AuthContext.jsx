import { createContext, useContext, useState, useCallback, useEffect } from 'react'
import { authService } from '../services'

const STORAGE_TOKEN = 'axono_token'
const STORAGE_USER = 'axono_user'

const AuthContext = createContext(null)

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const token = localStorage.getItem(STORAGE_TOKEN)
    if (!token) {
      setLoading(false)
      return
    }
    authService
      .getCurrentUser()
      .then((userData) => {
        setUser(userData)
        localStorage.setItem(STORAGE_USER, JSON.stringify(userData))
      })
      .catch(() => {
        localStorage.removeItem(STORAGE_TOKEN)
        localStorage.removeItem(STORAGE_USER)
        setUser(null)
      })
      .finally(() => setLoading(false))
  }, [])

  const login = useCallback(async (identifier, password) => {
    const data = await authService.login(identifier, password)
    localStorage.setItem(STORAGE_TOKEN, data.token)
    localStorage.setItem(STORAGE_USER, JSON.stringify(data.user))
    setUser(data.user)
    return data
  }, [])

  const logout = useCallback(() => {
    localStorage.removeItem(STORAGE_TOKEN)
    localStorage.removeItem(STORAGE_USER)
    setUser(null)
  }, [])

  const completeFirstAccess = useCallback(async (newPassword) => {
    const updated = await authService.completeFirstAccess({ newPassword })
    setUser(updated)
    localStorage.setItem(STORAGE_USER, JSON.stringify(updated))
    return updated
  }, [])

  const isAuthenticated = !!user

  return (
    <AuthContext.Provider value={{ user, login, logout, completeFirstAccess, isAuthenticated, loading }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuth must be used within AuthProvider')
  return ctx
}
