import { useState, useEffect, useCallback } from 'react'
import { useTranslation } from 'react-i18next'
import { studentService, groupService } from '../services'

const PAGE_SIZE = 10

function getInitials(name) {
  return name?.split(' ').map((n) => n[0]).slice(0, 2).join('').toUpperCase() || '??'
}

export default function Students() {
  const { t } = useTranslation()
  const [students, setStudents] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [page, setPage] = useState(0)
  const [totalElements, setTotalElements] = useState(0)
  const [totalPages, setTotalPages] = useState(0)
  const [modalOpen, setModalOpen] = useState(false)
  const [editingStudent, setEditingStudent] = useState(null)
  const [saving, setSaving] = useState(false)
  const [formData, setFormData] = useState({ name: '', email: '', matricula: '', password: '', groupId: '' })
  const [groups, setGroups] = useState([])
  const [deleteConfirmStudent, setDeleteConfirmStudent] = useState(null)
  const [deleting, setDeleting] = useState(false)

  useEffect(() => {
    groupService.findAll(null, 0, 500).then((data) => {
      setGroups(data.content || [])
    }).catch(() => {})
  }, [])

  const fetchStudents = useCallback(async () => {
    setLoading(true)
    setError('')
    try {
      const data = await studentService.findAll(page, PAGE_SIZE)
      setStudents(data.content || [])
      setTotalElements(data.totalElements ?? 0)
      setTotalPages(data.totalPages ?? 0)
    } catch (err) {
      setError(err.response?.data?.message || 'Erro ao carregar alunos')
    } finally {
      setLoading(false)
    }
  }, [page])

  useEffect(() => {
    fetchStudents()
  }, [fetchStudents])

  const openCreate = () => {
    setEditingStudent(null)
    setFormData({ name: '', email: '', matricula: '', password: '', groupId: '' })
    setModalOpen(true)
  }

  const openEdit = (student) => {
    setEditingStudent(student)
    setFormData({
      name: student.name,
      email: student.email,
      matricula: student.matricula,
      password: '',
      groupId: student.groupId || '',
    })
    setModalOpen(true)
  }

  const closeModal = () => {
    setModalOpen(false)
    setEditingStudent(null)
    setFormData({ name: '', email: '', matricula: '', password: '', groupId: '' })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setSaving(true)
    setError('')
    try {
      const payload = {
        name: formData.name,
        email: formData.email,
        matricula: formData.matricula,
        groupId: formData.groupId || null,
      }
      if (formData.password) payload.password = formData.password
      if (editingStudent) {
        await studentService.update(editingStudent.id, payload)
      } else {
        await studentService.create(payload)
      }
      closeModal()
      fetchStudents()
    } catch (err) {
      setError(err.response?.data?.message || 'Erro ao salvar')
    } finally {
      setSaving(false)
    }
  }

  const openDeleteConfirm = (student) => setDeleteConfirmStudent(student)
  const closeDeleteConfirm = () => {
    if (!deleting) setDeleteConfirmStudent(null)
  }

  const handleConfirmDelete = async () => {
    if (!deleteConfirmStudent) return
    setDeleting(true)
    setError('')
    try {
      await studentService.delete(deleteConfirmStudent.id)
      setDeleteConfirmStudent(null)
      fetchStudents()
    } catch (err) {
      setError(err.response?.data?.message || 'Erro ao excluir')
    } finally {
      setDeleting(false)
    }
  }

  const from = totalElements === 0 ? 0 : page * PAGE_SIZE + 1
  const to = Math.min((page + 1) * PAGE_SIZE, totalElements)

  return (
    <>
      <div className="students-page-actions">
        <button type="button" className="dashboard-btn dashboard-btn--secondary" disabled>
          <span className="material-icons">cloud_upload</span>
          {t('students.importSpreadsheet')}
        </button>
        <button type="button" className="dashboard-btn dashboard-btn--primary" onClick={openCreate}>
          <span className="material-icons">person_add</span>
          {t('students.registerStudent')}
        </button>
      </div>
      <section className="students-section">
        {error && (
          <div className="students-error" role="alert">
            <span className="material-icons">error_outline</span>
            {error}
          </div>
        )}
        <div className="students-toolbar">
          <div className="students-search-wrap">
            <span className="material-icons students-search-icon">search</span>
            <input
              type="search"
              className="students-search"
              placeholder={t('students.searchPlaceholder')}
              aria-label={t('students.searchPlaceholder')}
              readOnly
            />
          </div>
          <p className="students-count">{t('students.found', { count: totalElements })}</p>
        </div>

        <div className="students-table-wrap">
          {loading ? (
            <p className="students-loading">Carregando...</p>
          ) : (
            <table className="students-table">
              <thead>
                <tr>
                  <th>{t('students.columnStudent')}</th>
                  <th>{t('students.columnRA')}</th>
                  <th>E-mail</th>
                  <th>{t('students.columnGroup')}</th>
                  <th>{t('students.columnStatus')}</th>
                  <th>{t('students.columnActions')}</th>
                </tr>
              </thead>
              <tbody>
                {students.map((row) => (
                  <tr key={row.id}>
                    <td>
                      <div className="students-cell-student">
                        <div
                          className={`dashboard-avatar dashboard-avatar--${
                            row.firstAccessPending ? 'orange' : 'blue'
                          }`}
                        >
                          {getInitials(row.name)}
                        </div>
                        <span className="students-cell-name">{row.name}</span>
                      </div>
                    </td>
                    <td className="students-cell-ra">{row.matricula}</td>
                    <td className="students-cell-email">{row.email}</td>
                    <td className="students-cell-group">{row.groupName || '—'}</td>
                    <td>
                      <span
                        className={`students-status students-status--${
                          row.firstAccessPending ? 'pending' : 'active'
                        }`}
                      >
                        {row.firstAccessPending
                          ? t('students.status.pending')
                          : t('students.status.active')}
                      </span>
                    </td>
                    <td>
                      <div className="students-actions">
                        <button
                          type="button"
                          className="students-action-btn"
                          aria-label={t('students.edit')}
                          onClick={() => openEdit(row)}
                        >
                          <span className="material-icons">edit</span>
                        </button>
                        <button
                          type="button"
                          className="students-action-btn"
                          aria-label={t('students.delete')}
                          onClick={() => openDeleteConfirm(row)}
                        >
                          <span className="material-icons">delete</span>
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>

        {!loading && totalPages > 0 && (
          <div className="students-pagination">
            <p className="students-pagination-info">
              {t('students.paginationShowing', { from, to, total: totalElements })}
            </p>
            <div className="dashboard-pagination-controls">
              <button
                type="button"
                className="dashboard-pagination-btn"
                disabled={page === 0}
                onClick={() => setPage((p) => p - 1)}
                aria-label={t('dashboard.prevPage')}
              >
                <span className="material-icons">chevron_left</span>
              </button>
              <button type="button" className="dashboard-pagination-btn dashboard-pagination-btn--active">
                {page + 1}
              </button>
              <span className="dashboard-pagination-ellipsis">/ {totalPages}</span>
              <button
                type="button"
                className="dashboard-pagination-btn"
                disabled={page >= totalPages - 1}
                onClick={() => setPage((p) => p + 1)}
                aria-label={t('dashboard.nextPage')}
              >
                <span className="material-icons">chevron_right</span>
              </button>
            </div>
          </div>
        )}

        <div className="students-import-tip">
          <span className="material-icons students-import-tip-icon">info</span>
          <div>
            <p className="students-import-tip-title">{t('students.importTipTitle')}</p>
            <p className="students-import-tip-text">{t('students.importTipText')}</p>
            <a href="#" className="students-import-tip-link" onClick={(e) => e.preventDefault()}>
              {t('students.downloadTemplate')}
            </a>
          </div>
        </div>
      </section>

      {modalOpen && (
        <div className="students-modal-overlay" onClick={closeModal} role="dialog" aria-modal="true" aria-labelledby="students-modal-title">
          <div className="students-modal" onClick={(e) => e.stopPropagation()}>
            <h3 id="students-modal-title" className="students-modal-title">
              {editingStudent ? t('students.modalTitleEdit') : t('students.modalTitleCreate')}
            </h3>
            <form onSubmit={handleSubmit}>
              <div className="students-modal-field">
                <label htmlFor="student-name">{t('students.modalName')}</label>
                <input
                  id="student-name"
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData((d) => ({ ...d, name: e.target.value }))}
                  required
                  placeholder={t('students.modalNamePlaceholder')}
                />
              </div>
              <div className="students-modal-field">
                <label htmlFor="student-email">{t('students.modalEmail')}</label>
                <input
                  id="student-email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData((d) => ({ ...d, email: e.target.value }))}
                  required
                  placeholder={t('students.modalEmailPlaceholder')}
                />
              </div>
              <div className="students-modal-field">
                <label htmlFor="student-matricula">{t('students.modalMatricula')}</label>
                <input
                  id="student-matricula"
                  type="text"
                  value={formData.matricula}
                  onChange={(e) => setFormData((d) => ({ ...d, matricula: e.target.value }))}
                  required
                  placeholder={t('students.modalMatriculaPlaceholder')}
                />
              </div>
              <div className="students-modal-field">
                <label htmlFor="student-group">{t('students.modalGroup')}</label>
                <select
                  id="student-group"
                  value={formData.groupId}
                  onChange={(e) => setFormData((d) => ({ ...d, groupId: e.target.value }))}
                >
                  <option value="">— {t('students.filterAll')}</option>
                  {groups.map((g) => (
                    <option key={g.id} value={g.id}>{g.code} {g.cycle ? `(${g.cycle})` : ''}</option>
                  ))}
                </select>
              </div>
              <div className="students-modal-field">
                <label htmlFor="student-password">
                  {t('students.modalPassword')} {editingStudent ? t('students.modalPasswordNoChange') : t('students.modalPasswordOptional')}
                </label>
                <input
                  id="student-password"
                  type="password"
                  value={formData.password}
                  onChange={(e) => setFormData((d) => ({ ...d, password: e.target.value }))}
                  placeholder={t('students.modalPasswordPlaceholder')}
                  minLength={formData.password ? 6 : 0}
                />
              </div>
              <div className="students-modal-actions">
                <button type="button" className="dashboard-btn dashboard-btn--secondary" onClick={closeModal}>
                  {t('students.modalCancel')}
                </button>
                <button
                  type="submit"
                  className="dashboard-btn dashboard-btn--primary"
                  disabled={saving}
                >
                  {saving ? t('students.modalSaving') : t('students.modalSave')}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {deleteConfirmStudent && (
        <div className="students-dialog-overlay" onClick={closeDeleteConfirm} role="alertdialog" aria-modal="true" aria-labelledby="students-dialog-title">
          <div className="students-dialog" onClick={(e) => e.stopPropagation()}>
            <div className="students-dialog-icon-wrap">
              <span className="material-icons" aria-hidden>warning</span>
            </div>
            <h3 id="students-dialog-title" className="students-dialog-title">
              {t('students.deleteConfirmTitle')}
            </h3>
            <p className="students-dialog-message">
              {t('students.deleteConfirmMessage', { name: deleteConfirmStudent.name })}
            </p>
            <div className="students-dialog-actions">
              <button
                type="button"
                className="dashboard-btn dashboard-btn--secondary"
                onClick={closeDeleteConfirm}
                disabled={deleting}
              >
                {t('students.deleteConfirmCancel')}
              </button>
              <button
                type="button"
                className="dashboard-btn dashboard-btn--danger"
                onClick={handleConfirmDelete}
                disabled={deleting}
              >
                {deleting ? t('students.deleteConfirmExcluding') : t('students.deleteConfirmExclude')}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
