import { api } from '../api'

/**
 * Serviço de alunos - API Spring Boot /api/students
 */
export const studentService = {
  findAll(page = 0, size = 20, sort = 'name') {
    return api
      .get('/api/students', { params: { page, size, sort } })
      .then((res) => res.data)
  },

  getById(id) {
    return api.get(`/api/students/${id}`).then((res) => res.data)
  },

  create(data) {
    return api.post('/api/students', data).then((res) => res.data)
  },

  update(id, data) {
    return api.put(`/api/students/${id}`, data).then((res) => res.data)
  },

  delete(id) {
    return api.delete(`/api/students/${id}`)
  },
}
