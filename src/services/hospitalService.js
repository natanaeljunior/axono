import { api } from '../api'

/**
 * Serviço de hospitais - API Spring Boot /api/hospitals
 */
export const hospitalService = {
  findAll(name = null, page = 0, size = 20, sort = 'name') {
    const params = { page, size, sort }
    if (name != null && name !== '') params.name = name
    return api.get('/api/hospitals', { params }).then((res) => res.data)
  },

  getById(id) {
    return api.get(`/api/hospitals/${id}`).then((res) => res.data)
  },

  create(data) {
    return api.post('/api/hospitals', data).then((res) => res.data)
  },

  update(id, data) {
    return api.put(`/api/hospitals/${id}`, data).then((res) => res.data)
  },

  delete(id) {
    return api.delete(`/api/hospitals/${id}`)
  },
}
