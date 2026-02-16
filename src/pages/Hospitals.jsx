import { useState, useEffect, useCallback } from 'react'
import { useTranslation } from 'react-i18next'
import { hospitalService } from '../services'

const VIEW_GRID = 'grid'
const VIEW_LIST = 'list'
const PAGE_SIZE = 12
const STATUS_OPTIONS = ['ACTIVE', 'EXPIRING', 'INACTIVE']

function getInitials(name) {
  return name?.split(' ').map((n) => n[0]).slice(0, 2).join('').toUpperCase() || '—'
}

function daysUntil(dateStr) {
  if (!dateStr) return null
  const d = new Date(dateStr)
  const today = new Date()
  today.setHours(0, 0, 0, 0)
  d.setHours(0, 0, 0, 0)
  return Math.ceil((d - today) / (1000 * 60 * 60 * 24))
}

export default function Hospitals() {
  const { t } = useTranslation()
  const [search, setSearch] = useState('')
  const [view, setView] = useState(VIEW_GRID)
  const [hospitals, setHospitals] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [page, setPage] = useState(0)
  const [totalElements, setTotalElements] = useState(0)
  const [totalPages, setTotalPages] = useState(0)
  const [modalOpen, setModalOpen] = useState(false)
  const [editingHospital, setEditingHospital] = useState(null)
  const [saving, setSaving] = useState(false)
  const [formData, setFormData] = useState({
    name: '',
    address: '',
    status: 'ACTIVE',
    directorName: '',
    directorEmail: '',
    capacity: '',
    conventionExpiresAt: '',
    tag: '',
  })
  const [deleteConfirmHospital, setDeleteConfirmHospital] = useState(null)
  const [deleting, setDeleting] = useState(false)

  const fetchHospitals = useCallback(async () => {
    setLoading(true)
    setError('')
    try {
      const nameFilter = search.trim() || null
      const data = await hospitalService.findAll(nameFilter, page, PAGE_SIZE)
      setHospitals(data.content || [])
      setTotalElements(data.totalElements ?? 0)
      setTotalPages(data.totalPages ?? 0)
    } catch (err) {
      setError(err.response?.data?.message || 'Erro ao carregar hospitais')
    } finally {
      setLoading(false)
    }
  }, [search, page])

  useEffect(() => {
    fetchHospitals()
  }, [fetchHospitals])

  const openCreate = () => {
    setEditingHospital(null)
    setFormData({
      name: '',
      address: '',
      status: 'ACTIVE',
      directorName: '',
      directorEmail: '',
      capacity: '',
      conventionExpiresAt: '',
      tag: '',
    })
    setModalOpen(true)
  }

  const openEdit = (hospital) => {
    setEditingHospital(hospital)
    setFormData({
      name: hospital.name || '',
      address: hospital.address || '',
      status: hospital.status || 'ACTIVE',
      directorName: hospital.directorName || '',
      directorEmail: hospital.directorEmail || '',
      capacity: hospital.capacity != null ? String(hospital.capacity) : '',
      conventionExpiresAt: hospital.conventionExpiresAt ? hospital.conventionExpiresAt.slice(0, 10) : '',
      tag: hospital.tag || '',
    })
    setModalOpen(true)
  }

  const closeModal = () => {
    setModalOpen(false)
    setEditingHospital(null)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setSaving(true)
    setError('')
    try {
      const payload = {
        name: formData.name.trim(),
        address: formData.address?.trim() || null,
        status: formData.status || null,
        directorName: formData.directorName?.trim() || null,
        directorEmail: formData.directorEmail?.trim() || null,
        capacity: formData.capacity ? parseInt(formData.capacity, 10) : null,
        conventionExpiresAt: formData.conventionExpiresAt || null,
        tag: formData.tag?.trim() || null,
      }
      if (editingHospital) {
        await hospitalService.update(editingHospital.id, payload)
      } else {
        await hospitalService.create(payload)
      }
      closeModal()
      fetchHospitals()
    } catch (err) {
      setError(err.response?.data?.message || 'Erro ao salvar')
    } finally {
      setSaving(false)
    }
  }

  const openDeleteConfirm = (hospital) => setDeleteConfirmHospital(hospital)
  const closeDeleteConfirm = () => {
    if (!deleting) setDeleteConfirmHospital(null)
  }

  const handleConfirmDelete = async () => {
    if (!deleteConfirmHospital) return
    setDeleting(true)
    setError('')
    try {
      await hospitalService.delete(deleteConfirmHospital.id)
      setDeleteConfirmHospital(null)
      fetchHospitals()
    } catch (err) {
      setError(err.response?.data?.message || 'Erro ao excluir')
    } finally {
      setDeleting(false)
    }
  }

  const statActive = hospitals.filter((h) => h.status === 'ACTIVE').length
  const statExpiring = hospitals.filter((h) => {
    if (h.status === 'EXPIRING') return true
    const days = daysUntil(h.conventionExpiresAt)
    return days != null && days >= 0 && days <= 30
  }).length
  const totalCapacity = hospitals.reduce((sum, h) => sum + (h.capacity || 0), 0)

  return (
    <>
      <header className="hospitals-page-header">
        <div className="hospitals-header-text">
          <h1 className="hospitals-title">{t('hospitals.pageTitle')}</h1>
          <p className="hospitals-subtitle">{t('hospitals.subtitle')}</p>
        </div>
        <div className="hospitals-header-actions">
          <button type="button" className="dashboard-btn dashboard-btn--secondary">
            <span className="material-icons">filter_list</span>
            {t('hospitals.filters')}
          </button>
          <button type="button" className="dashboard-btn dashboard-btn--primary hospitals-btn-primary" onClick={openCreate}>
            <span className="material-icons">add</span>
            {t('hospitals.newHospital')}
          </button>
        </div>
      </header>

      {error && (
        <div className="students-error" role="alert">
          <span className="material-icons">error_outline</span>
          {error}
        </div>
      )}

      <div className="hospitals-stats">
        <div className="hospitals-stat-card">
          <p className="hospitals-stat-label">{t('hospitals.statActive')}</p>
          <div className="hospitals-stat-row">
            <h3 className="hospitals-stat-value">{loading ? '—' : totalElements}</h3>
          </div>
        </div>
        <div className="hospitals-stat-card">
          <p className="hospitals-stat-label">{t('hospitals.statStudents')}</p>
          <div className="hospitals-stat-row">
            <h3 className="hospitals-stat-value">{loading ? '—' : totalCapacity}</h3>
            <span className="hospitals-stat-muted">{t('hospitals.statSpecialties')}</span>
          </div>
        </div>
        <div className="hospitals-stat-card">
          <p className="hospitals-stat-label">{t('hospitals.statExpiring')}</p>
          <div className="hospitals-stat-row">
            <h3 className="hospitals-stat-value hospitals-stat-value--amber">{loading ? '—' : statExpiring}</h3>
            <span className="hospitals-stat-badge hospitals-stat-badge--amber">{t('hospitals.statExpiringNext')}</span>
          </div>
        </div>
        <div className="hospitals-stat-card">
          <p className="hospitals-stat-label">{t('hospitals.statRotations')}</p>
          <div className="hospitals-stat-row">
            <h3 className="hospitals-stat-value">{loading ? '—' : totalElements}</h3>
            <span className="hospitals-stat-muted">{t('hospitals.statSpecialties')}</span>
          </div>
        </div>
      </div>

      <div className="hospitals-toolbar">
        <div className="hospitals-search-wrap">
          <span className="material-icons hospitals-search-icon">search</span>
          <input
            type="search"
            className="hospitals-search"
            placeholder={t('hospitals.searchPlaceholder')}
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && setPage(0)}
            aria-label={t('hospitals.searchPlaceholder')}
          />
        </div>
        <div className="hospitals-view-toggle">
          <button
            type="button"
            className={`hospitals-view-btn ${view === VIEW_GRID ? 'hospitals-view-btn--active' : ''}`}
            onClick={() => setView(VIEW_GRID)}
            aria-label={t('hospitals.viewGrid')}
          >
            <span className="material-icons">grid_view</span>
          </button>
          <button
            type="button"
            className={`hospitals-view-btn ${view === VIEW_LIST ? 'hospitals-view-btn--active' : ''}`}
            onClick={() => setView(VIEW_LIST)}
            aria-label={t('hospitals.viewList')}
          >
            <span className="material-icons">view_list</span>
          </button>
        </div>
      </div>

      <div className="hospitals-grid">
        {loading ? (
          <p className="students-loading">Carregando...</p>
        ) : (
          hospitals.map((h) => {
            const days = daysUntil(h.conventionExpiresAt)
            const hasWarning = h.status === 'EXPIRING' || (days != null && days >= 0 && days <= 30)
            const total = h.capacity || 0
            const current = 0
            const allocationVariant = total > 0 && current >= total ? 'amber' : 'primary'
            return (
              <article key={h.id} className="hospitals-card">
                <div className="hospitals-card-body">
                  <div className="hospitals-card-head">
                    <div className="hospitals-card-info">
                      <div className="hospitals-card-logo">
                        <span className="material-icons">local_hospital</span>
                      </div>
                      <div>
                        <h3 className="hospitals-card-name">{h.name}</h3>
                        <p className="hospitals-card-address">
                          <span className="material-icons hospitals-card-pin">location_on</span>
                          {h.address || '—'}
                        </p>
                        <div className="hospitals-card-badges">
                          <span className={`hospitals-badge hospitals-badge--${(h.status || 'ACTIVE').toLowerCase()}`}>
                            {h.status === 'EXPIRING' ? t('hospitals.badgeExpiring') : h.status === 'INACTIVE' ? t('hospitals.badgeInactive') : t('hospitals.badgeActive')}
                          </span>
                          {h.tag && <span className="hospitals-badge hospitals-badge--tag">{h.tag}</span>}
                        </div>
                      </div>
                    </div>
                    <div className="hospitals-card-actions">
                      <button type="button" className="hospitals-card-icon-btn" aria-label={t('students.edit')} onClick={() => openEdit(h)}>
                        <span className="material-icons">edit</span>
                      </button>
                      <button type="button" className="hospitals-card-icon-btn" aria-label={t('students.delete')} onClick={() => openDeleteConfirm(h)}>
                        <span className="material-icons">delete_outline</span>
                      </button>
                    </div>
                  </div>

                  <div className="hospitals-card-details">
                    <div>
                      <p className="hospitals-detail-label">{t('hospitals.director')}</p>
                      <div className="hospitals-director">
                        <span className="hospitals-director-avatar">{getInitials(h.directorName)}</span>
                        <div>
                          <p className="hospitals-director-name">{h.directorName || '—'}</p>
                          <p className="hospitals-director-email">{h.directorEmail || '—'}</p>
                        </div>
                      </div>
                    </div>
                    <div>
                      <p className="hospitals-detail-label">{t('hospitals.allocation')}</p>
                      <div className="hospitals-allocation-row">
                        <div className="hospitals-allocation-bar">
                          <div
                            className={`hospitals-allocation-fill hospitals-allocation-fill--${allocationVariant}`}
                            style={{ width: total ? `${Math.min(100, (current / total) * 100)}%` : '0%' }}
                          />
                        </div>
                        <span className="hospitals-allocation-text">{current}/{total}</span>
                      </div>
                      <p className={`hospitals-allocation-note hospitals-allocation-note--${allocationVariant}`}>
                        {t('hospitals.allocationAvailable')}
                      </p>
                    </div>
                  </div>

                  <div className="hospitals-rotations">
                    <p className="hospitals-detail-label">{t('hospitals.rotationsAvailable')}</p>
                    <div className="hospitals-rotations-tags">
                      {h.tag ? (
                        <span className="hospitals-rotation-tag">{h.tag}</span>
                      ) : (
                        <span className="hospitals-rotation-tag">—</span>
                      )}
                    </div>
                  </div>
                </div>

                <div className="hospitals-card-footer">
                  <div className="hospitals-footer-left">
                    {hasWarning && days != null && days >= 0 ? (
                      <>
                        <span className="material-icons hospitals-footer-warning">warning</span>
                        <span className="hospitals-footer-text">
                          {t('hospitals.renewalPending', { days })}
                        </span>
                      </>
                    ) : (
                      <>
                        <span className="material-icons hospitals-footer-doc">description</span>
                        <span className="hospitals-footer-text">—</span>
                      </>
                    )}
                  </div>
                  <div className="hospitals-footer-actions">
                    <button type="button" className="hospitals-footer-link">{t('hospitals.viewDocuments')}</button>
                    <span className="hospitals-footer-sep">|</span>
                    <button type="button" className="hospitals-footer-link">{t('hospitals.attachNew')}</button>
                  </div>
                </div>
              </article>
            )
          })
        )}
        {!loading && (
          <button type="button" className="hospitals-card hospitals-card--add" onClick={openCreate}>
            <div className="hospitals-add-icon">
              <span className="material-icons">add_business</span>
            </div>
            <h3 className="hospitals-add-title">{t('hospitals.addNewHospital')}</h3>
            <p className="hospitals-add-desc">{t('hospitals.addNewHospitalDesc')}</p>
          </button>
        )}
      </div>

      {!loading && totalPages > 1 && (
        <div className="hospitals-pagination">
          <p className="hospitals-pagination-text">
            {t('hospitals.paginationShowing', { showing: hospitals.length, total: totalElements })}
          </p>
          <div className="hospitals-pagination-controls">
            <button type="button" className="hospitals-pagination-btn" disabled={page === 0} onClick={() => setPage((p) => p - 1)}>
              {t('hospitals.prev')}
            </button>
            {Array.from({ length: totalPages }, (_, i) => (
              <button
                key={i}
                type="button"
                className={`hospitals-pagination-btn ${page === i ? 'hospitals-pagination-btn--active' : ''}`}
                onClick={() => setPage(i)}
              >
                {i + 1}
              </button>
            ))}
            <button type="button" className="hospitals-pagination-btn" disabled={page >= totalPages - 1} onClick={() => setPage((p) => p + 1)}>
              {t('hospitals.next')}
            </button>
          </div>
        </div>
      )}

      {modalOpen && (
        <div className="students-modal-overlay hospitals-modal-overlay" onClick={closeModal} role="dialog" aria-modal="true" aria-labelledby="hospitals-modal-title">
          <div className="students-modal hospitals-modal" onClick={(e) => e.stopPropagation()}>
            <h3 id="hospitals-modal-title" className="students-modal-title hospitals-modal-title">
              {editingHospital ? t('hospitals.modalTitleEdit') : t('hospitals.modalTitleCreate')}
            </h3>
            <form onSubmit={handleSubmit} className="hospitals-modal-form">
              <div className="hospitals-modal-fields">
                <div className="students-modal-field">
                  <label htmlFor="hospital-name">{t('hospitals.modalName')}</label>
                  <input id="hospital-name" type="text" value={formData.name} onChange={(e) => setFormData((d) => ({ ...d, name: e.target.value }))} required placeholder="Nome do hospital" />
                </div>
                <div className="students-modal-field">
                  <label htmlFor="hospital-address">{t('hospitals.modalAddress')}</label>
                  <input id="hospital-address" type="text" value={formData.address} onChange={(e) => setFormData((d) => ({ ...d, address: e.target.value }))} placeholder="Endereço" />
                </div>
                <div className="students-modal-field">
                  <label htmlFor="hospital-status">{t('hospitals.modalStatus')}</label>
                  <select id="hospital-status" value={formData.status} onChange={(e) => setFormData((d) => ({ ...d, status: e.target.value }))}>
                    {STATUS_OPTIONS.map((s) => (
                      <option key={s} value={s}>{s}</option>
                    ))}
                  </select>
                </div>
                <div className="students-modal-field">
                  <label htmlFor="hospital-tag">{t('hospitals.modalTag')}</label>
                  <input id="hospital-tag" type="text" value={formData.tag} onChange={(e) => setFormData((d) => ({ ...d, tag: e.target.value }))} placeholder="Ex: Clínica Médica" />
                </div>
                <div className="students-modal-field">
                  <label htmlFor="hospital-director">{t('hospitals.modalDirectorName')}</label>
                  <input id="hospital-director" type="text" value={formData.directorName} onChange={(e) => setFormData((d) => ({ ...d, directorName: e.target.value }))} placeholder="Nome do diretor" />
                </div>
                <div className="students-modal-field">
                  <label htmlFor="hospital-director-email">{t('hospitals.modalDirectorEmail')}</label>
                  <input id="hospital-director-email" type="email" value={formData.directorEmail} onChange={(e) => setFormData((d) => ({ ...d, directorEmail: e.target.value }))} placeholder="email@hospital.com" />
                </div>
                <div className="students-modal-field">
                  <label htmlFor="hospital-capacity">{t('hospitals.modalCapacity')}</label>
                  <input id="hospital-capacity" type="number" min="0" value={formData.capacity} onChange={(e) => setFormData((d) => ({ ...d, capacity: e.target.value }))} placeholder="0" />
                </div>
                <div className="students-modal-field">
                  <label htmlFor="hospital-convention">{t('hospitals.modalConventionExpiresAt')}</label>
                  <input id="hospital-convention" type="date" value={formData.conventionExpiresAt} onChange={(e) => setFormData((d) => ({ ...d, conventionExpiresAt: e.target.value }))} />
                </div>
              </div>
              <div className="students-modal-actions hospitals-modal-actions">
                <button type="button" className="dashboard-btn dashboard-btn--secondary" onClick={closeModal}>{t('hospitals.modalCancel')}</button>
                <button type="submit" className="dashboard-btn dashboard-btn--primary" disabled={saving}>
                  {saving ? t('hospitals.modalSaving') : t('hospitals.modalSave')}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {deleteConfirmHospital && (
        <div className="students-dialog-overlay" onClick={closeDeleteConfirm} role="alertdialog" aria-modal="true" aria-labelledby="hospitals-dialog-title">
          <div className="students-dialog" onClick={(e) => e.stopPropagation()}>
            <div className="students-dialog-icon-wrap">
              <span className="material-icons" aria-hidden>warning</span>
            </div>
            <h3 id="hospitals-dialog-title" className="students-dialog-title">{t('hospitals.deleteConfirmTitle')}</h3>
            <p className="students-dialog-message">
              {t('hospitals.deleteConfirmMessage', { name: deleteConfirmHospital.name })}
            </p>
            <div className="students-dialog-actions">
              <button type="button" className="dashboard-btn dashboard-btn--secondary" onClick={closeDeleteConfirm} disabled={deleting}>
                {t('hospitals.deleteConfirmCancel')}
              </button>
              <button type="button" className="dashboard-btn dashboard-btn--danger" onClick={handleConfirmDelete} disabled={deleting}>
                {deleting ? t('hospitals.deleteConfirmExcluding') : t('hospitals.deleteConfirmExclude')}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
