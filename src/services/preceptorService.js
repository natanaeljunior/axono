import { api } from '../api'

/**
 * Serviço de preceptores - API Spring Boot /api/preceptors
 */
export const preceptorService = {
  findAll(page = 0, size = 20, sort = 'name') {
    return api
      .get('/api/preceptors', { params: { page, size, sort } })
      .then((res) => res.data)
  },

  getById(id) {
    return api.get(`/api/preceptors/${id}`).then((res) => res.data)
  },

  create(data) {
    return api.post('/api/preceptors', data).then((res) => res.data)
  },

  update(id, data) {
    return api.put(`/api/preceptors/${id}`, data).then((res) => res.data)
  },

  delete(id) {
    return api.delete(`/api/preceptors/${id}`)
  },
}
