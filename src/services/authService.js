import { api } from '../api'

/**
 * Serviço de autenticação - API Spring Boot /api/auth (porta 8080)
 */
export const authService = {
  login(identifier, password) {
    return api
      .post('/api/auth/login', {
        identifier: identifier?.trim() || '',
        password: password || '',
      })
      .then((res) => res.data)
  },

  getCurrentUser() {
    return api.get('/api/auth/me').then((res) => res.data)
  },

  /**
   * Conclui o primeiro acesso (define nova senha). Requer autenticação.
   * @param {{ newPassword: string }} payload
   * @returns {Promise<import('../contexts/AuthContext').User>} user atualizado (firstAccessPending = false)
   */
  completeFirstAccess(payload) {
    return api.post('/api/auth/complete-first-access', payload).then((res) => res.data)
  },
}
