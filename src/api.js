import axios from 'axios'

const STORAGE_TOKEN = 'axono_token'
const STORAGE_USER = 'axono_user'

/**
 * Cliente HTTP para a API (Spring Boot).
 * Em dev, o Vite faz proxy de /api para http://localhost:8080.
 * Interceptor adiciona o token e trata 401 (sessão inválida).
 */
export const api = axios.create({
  baseURL: '',
  headers: {
    'Content-Type': 'application/json',
  },
})

api.interceptors.request.use((config) => {
  const token = localStorage.getItem(STORAGE_TOKEN)
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      const isLoginRequest = error.config?.url?.includes('/api/auth/login')
      if (!isLoginRequest) {
        localStorage.removeItem(STORAGE_TOKEN)
        localStorage.removeItem(STORAGE_USER)
        window.location.href = '/login'
      }
    }
    return Promise.reject(error)
  }
)
