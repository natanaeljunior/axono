import { api } from '../api'

/**
 * Serviço de alocações da matriz de rotações - API /api/groups/{groupId}/assignments
 */
export const rotationAssignmentService = {
  getByGroupId(groupId) {
    return api.get(`/api/groups/${groupId}/assignments`).then((res) => res.data)
  },

  saveAssignments(groupId, slots) {
    return api.put(`/api/groups/${groupId}/assignments`, slots).then((res) => res.data)
  },
}
