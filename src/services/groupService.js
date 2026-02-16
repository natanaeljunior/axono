import { api } from '../api'

/**
 * Serviço de grupos - API Spring Boot /api/groups
 */
export const groupService = {
  findAll(cycle = null, page = 0, size = 20, sort = 'code') {
    const params = { page, size, sort }
    if (cycle != null && cycle !== '') params.cycle = cycle
    return api.get('/api/groups', { params }).then((res) => res.data)
  },

  getById(id) {
    return api.get(`/api/groups/${id}`).then((res) => res.data)
  },

  create(data) {
    return api.post('/api/groups', data).then((res) => res.data)
  },

  update(id, data) {
    return api.put(`/api/groups/${id}`, data).then((res) => res.data)
  },

  delete(id) {
    return api.delete(`/api/groups/${id}`)
  },
}
