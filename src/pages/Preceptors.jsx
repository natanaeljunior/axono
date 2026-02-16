import { useState, useEffect, useCallback } from 'react'
import { useTranslation } from 'react-i18next'
import { preceptorService } from '../services'

const PAGE_SIZE = 10

function getInitials(name) {
  return name?.split(' ').map((n) => n[0]).slice(0, 2).join('').toUpperCase() || '??'
}

export default function Preceptors() {
  const { t } = useTranslation()
  const [preceptors, setPreceptors] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [page, setPage] = useState(0)
  const [totalElements, setTotalElements] = useState(0)
  const [totalPages, setTotalPages] = useState(0)
  const [modalOpen, setModalOpen] = useState(false)
  const [editingPreceptor, setEditingPreceptor] = useState(null)
  const [saving, setSaving] = useState(false)
  const [formData, setFormData] = useState({ name: '', email: '', crm: '', password: '' })
  const [deleteConfirmPreceptor, setDeleteConfirmPreceptor] = useState(null)
  const [deleting, setDeleting] = useState(false)

  const fetchPreceptors = useCallback(async () => {
    setLoading(true)
    setError('')
    try {
      const data = await preceptorService.findAll(page, PAGE_SIZE)
      setPreceptors(data.content || [])
      setTotalElements(data.totalElements ?? 0)
      setTotalPages(data.totalPages ?? 0)
    } catch (err) {
      setError(err.response?.data?.message || 'Erro ao carregar preceptores')
    } finally {
      setLoading(false)
    }
  }, [page])

  useEffect(() => {
    fetchPreceptors()
  }, [fetchPreceptors])

  const openCreate = () => {
    setEditingPreceptor(null)
    setFormData({ name: '', email: '', crm: '', password: '' })
    setModalOpen(true)
  }

  const openEdit = (preceptor) => {
    setEditingPreceptor(preceptor)
    setFormData({
      name: preceptor.name,
      email: preceptor.email,
      crm: preceptor.crm,
      password: '',
    })
    setModalOpen(true)
  }

  const closeModal = () => {
    setModalOpen(false)
    setEditingPreceptor(null)
    setFormData({ name: '', email: '', crm: '', password: '' })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setSaving(true)
    setError('')
    try {
      if (editingPreceptor) {
        const payload = {
          name: formData.name,
          email: formData.email,
          crm: formData.crm,
        }
        if (formData.password) payload.password = formData.password
        await preceptorService.update(editingPreceptor.id, payload)
      } else {
        const payload = {
          name: formData.name,
          email: formData.email,
          crm: formData.crm,
        }
        if (formData.password) payload.password = formData.password
        await preceptorService.create(payload)
      }
      closeModal()
      fetchPreceptors()
    } catch (err) {
      setError(err.response?.data?.message || 'Erro ao salvar')
    } finally {
      setSaving(false)
    }
  }

  const openDeleteConfirm = (preceptor) => setDeleteConfirmPreceptor(preceptor)
  const closeDeleteConfirm = () => {
    if (!deleting) setDeleteConfirmPreceptor(null)
  }

  const handleConfirmDelete = async () => {
    if (!deleteConfirmPreceptor) return
    setDeleting(true)
    setError('')
    try {
      await preceptorService.delete(deleteConfirmPreceptor.id)
      setDeleteConfirmPreceptor(null)
      fetchPreceptors()
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
      <header className="preceptors-page-header">
        <div className="preceptors-header-text">
          <h1 className="preceptors-title">{t('preceptors.pageTitle')}</h1>
          <p className="preceptors-subtitle">{t('preceptors.subtitle')}</p>
        </div>
        <div className="preceptors-header-actions">
          <button type="button" className="dashboard-btn dashboard-btn--secondary" disabled>
            <span className="material-icons">download</span>
            {t('preceptors.export')}
          </button>
          <button type="button" className="dashboard-btn dashboard-btn--primary preceptors-btn-primary" onClick={openCreate}>
            <span className="material-icons">add</span>
            {t('preceptors.addPreceptor')}
          </button>
        </div>
      </header>

      <section className="preceptors-filters-card">
        <div className="preceptors-search-wrap">
          <span className="material-icons preceptors-search-icon">search</span>
          <input
            type="search"
            className="preceptors-search"
            placeholder={t('preceptors.searchPlaceholder')}
            aria-label={t('preceptors.searchPlaceholder')}
            readOnly
          />
        </div>
        <p className="students-count">{t('preceptors.found', { count: totalElements })}</p>
      </section>

      {error && (
        <div className="students-error" role="alert">
          <span className="material-icons">error_outline</span>
          {error}
        </div>
      )}

      <div className="preceptors-table-card">
        <div className="preceptors-table-wrap">
          {loading ? (
            <p className="students-loading">Carregando...</p>
          ) : (
            <table className="preceptors-table">
              <thead>
                <tr>
                  <th className="preceptors-th">{t('preceptors.columnName')}</th>
                  <th className="preceptors-th">{t('preceptors.columnCrm')}</th>
                  <th className="preceptors-th">{t('preceptors.columnEmail')}</th>
                  <th className="preceptors-th">{t('preceptors.columnStatus')}</th>
                  <th className="preceptors-th preceptors-th--actions">{t('preceptors.columnActions')}</th>
                </tr>
              </thead>
              <tbody>
                {preceptors.map((row) => (
                  <tr key={row.id} className="preceptors-tr">
                    <td className="preceptors-td">
                      <div className="preceptors-name-cell">
                        <div className={`dashboard-avatar dashboard-avatar--${row.firstAccessPending ? 'orange' : 'blue'}`}>
                          {getInitials(row.name)}
                        </div>
                        <div>
                          <div className="preceptors-name">{row.name}</div>
                        </div>
                      </div>
                    </td>
                    <td className="preceptors-td preceptors-td--crm">{row.crm}</td>
                    <td className="preceptors-td preceptors-td--email">{row.email}</td>
                    <td className="preceptors-td">
                      <span
                        className={`students-status students-status--${
                          row.firstAccessPending ? 'pending' : 'active'
                        }`}
                      >
                        {row.firstAccessPending
                          ? t('preceptors.status.pending')
                          : t('preceptors.status.active')}
                      </span>
                    </td>
                    <td className="preceptors-td preceptors-td--actions">
                      <div className="preceptors-actions">
                        <button
                          type="button"
                          className="preceptors-action-btn"
                          aria-label={t('students.edit')}
                          onClick={() => openEdit(row)}
                        >
                          <span className="material-icons">edit</span>
                        </button>
                        <button
                          type="button"
                          className="preceptors-action-btn preceptors-action-btn--danger"
                          aria-label={t('students.delete')}
                          onClick={() => openDeleteConfirm(row)}
                        >
                          <span className="material-icons">delete_outline</span>
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
          <div className="preceptors-pagination">
            <p className="preceptors-pagination-text">
              {t('preceptors.paginationShowing', { from, to, total: totalElements })}
            </p>
            <div className="preceptors-pagination-controls">
              <button
                type="button"
                className="preceptors-page-btn preceptors-page-btn--arrow"
                disabled={page === 0}
                onClick={() => setPage((p) => p - 1)}
                aria-label={t('dashboard.prevPage')}
              >
                <span className="material-icons">chevron_left</span>
              </button>
              <button type="button" className="preceptors-page-btn preceptors-page-btn--active">
                {page + 1}
              </button>
              <span className="preceptors-page-ellipsis">/ {totalPages}</span>
              <button
                type="button"
                className="preceptors-page-btn preceptors-page-btn--arrow"
                disabled={page >= totalPages - 1}
                onClick={() => setPage((p) => p + 1)}
                aria-label={t('dashboard.nextPage')}
              >
                <span className="material-icons">chevron_right</span>
              </button>
            </div>
          </div>
        )}
      </div>

      <div className="preceptors-stats">
        <div className="preceptors-stat-card">
          <div className="preceptors-stat-icon preceptors-stat-icon--blue">
            <span className="material-icons">person</span>
          </div>
          <div>
            <p className="preceptors-stat-label">{t('preceptors.statTotal')}</p>
            <p className="preceptors-stat-value">{totalElements}</p>
          </div>
        </div>
      </div>

      {modalOpen && (
        <div className="students-modal-overlay" onClick={closeModal} role="dialog" aria-modal="true" aria-labelledby="preceptors-modal-title">
          <div className="students-modal" onClick={(e) => e.stopPropagation()}>
            <h3 id="preceptors-modal-title" className="students-modal-title">
              {editingPreceptor ? t('preceptors.modalTitleEdit') : t('preceptors.modalTitleCreate')}
            </h3>
            <form onSubmit={handleSubmit}>
              <div className="students-modal-field">
                <label htmlFor="preceptor-name">{t('preceptors.modalName')}</label>
                <input
                  id="preceptor-name"
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData((d) => ({ ...d, name: e.target.value }))}
                  required
                  placeholder={t('preceptors.modalNamePlaceholder')}
                />
              </div>
              <div className="students-modal-field">
                <label htmlFor="preceptor-email">{t('preceptors.modalEmail')}</label>
                <input
                  id="preceptor-email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData((d) => ({ ...d, email: e.target.value }))}
                  required
                  placeholder={t('preceptors.modalEmailPlaceholder')}
                />
              </div>
              <div className="students-modal-field">
                <label htmlFor="preceptor-crm">{t('preceptors.modalCrm')}</label>
                <input
                  id="preceptor-crm"
                  type="text"
                  value={formData.crm}
                  onChange={(e) => setFormData((d) => ({ ...d, crm: e.target.value }))}
                  required
                  placeholder={t('preceptors.modalCrmPlaceholder')}
                />
              </div>
              <div className="students-modal-field">
                <label htmlFor="preceptor-password">
                  {t('preceptors.modalPassword')} {editingPreceptor ? t('preceptors.modalPasswordNoChange') : t('preceptors.modalPasswordOptional')}
                </label>
                <input
                  id="preceptor-password"
                  type="password"
                  value={formData.password}
                  onChange={(e) => setFormData((d) => ({ ...d, password: e.target.value }))}
                  placeholder={t('preceptors.modalPasswordPlaceholder')}
                  minLength={formData.password ? 6 : 0}
                />
              </div>
              <div className="students-modal-actions">
                <button type="button" className="dashboard-btn dashboard-btn--secondary" onClick={closeModal}>
                  {t('preceptors.modalCancel')}
                </button>
                <button
                  type="submit"
                  className="dashboard-btn dashboard-btn--primary"
                  disabled={saving}
                >
                  {saving ? t('preceptors.modalSaving') : t('preceptors.modalSave')}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {deleteConfirmPreceptor && (
        <div className="students-dialog-overlay" onClick={closeDeleteConfirm} role="alertdialog" aria-modal="true" aria-labelledby="preceptors-dialog-title">
          <div className="students-dialog" onClick={(e) => e.stopPropagation()}>
            <div className="students-dialog-icon-wrap">
              <span className="material-icons" aria-hidden>warning</span>
            </div>
            <h3 id="preceptors-dialog-title" className="students-dialog-title">
              {t('preceptors.deleteConfirmTitle')}
            </h3>
            <p className="students-dialog-message">
              {t('preceptors.deleteConfirmMessage', { name: deleteConfirmPreceptor.name })}
            </p>
            <div className="students-dialog-actions">
              <button
                type="button"
                className="dashboard-btn dashboard-btn--secondary"
                onClick={closeDeleteConfirm}
                disabled={deleting}
              >
                {t('preceptors.deleteConfirmCancel')}
              </button>
              <button
                type="button"
                className="dashboard-btn dashboard-btn--danger"
                onClick={handleConfirmDelete}
                disabled={deleting}
              >
                {deleting ? t('preceptors.deleteConfirmExcluding') : t('preceptors.deleteConfirmExclude')}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
