import { useState, useEffect, useCallback } from 'react'
import { useTranslation } from 'react-i18next'
import { groupService } from '../services'

const VIEW_GRID = 'grid'
const VIEW_LIST = 'list'
const PAGE_SIZE = 20

/** Tipos de rotação do backend (enum). */
const ROTATION_TYPES = ['SURGERY', 'PEDIATRICS', 'CLINICAL', 'GYNECOLOGY', 'EMERGENCY', 'HEALTH']

/** Retorna a chave de tradução para o tipo de rotação (groups.rotationX). */
function rotationTypeLabelKey(rotationType) {
  if (!rotationType) return ''
  const key = 'rotation' + rotationType.charAt(0) + rotationType.slice(1).toLowerCase()
  return `groups.${key}`
}

/** Tag CSS para o card (ex: health, surgery). */
function rotationTypeTag(rotationType) {
  return rotationType ? rotationType.toLowerCase() : 'default'
}

export default function Groups() {
  const { t } = useTranslation()
  const [view, setView] = useState(VIEW_GRID)
  const [search, setSearch] = useState('')
  const [cycle, setCycle] = useState('2024.2')
  const [groups, setGroups] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [page, setPage] = useState(0)
  const [totalElements, setTotalElements] = useState(0)
  const [totalPages, setTotalPages] = useState(0)
  const [modalOpen, setModalOpen] = useState(false)
  const [editingGroup, setEditingGroup] = useState(null)
  const [saving, setSaving] = useState(false)
  const [formData, setFormData] = useState({
    code: '',
    cycle: '2024.2',
  })
  const [deleteConfirmGroup, setDeleteConfirmGroup] = useState(null)
  const [deleting, setDeleting] = useState(false)

  const fetchGroups = useCallback(async () => {
    setLoading(true)
    setError('')
    try {
      const data = await groupService.findAll(cycle || null, page, PAGE_SIZE)
      setGroups(data.content || [])
      setTotalElements(data.totalElements ?? 0)
      setTotalPages(data.totalPages ?? 0)
    } catch (err) {
      setError(err.response?.data?.message || 'Erro ao carregar grupos')
    } finally {
      setLoading(false)
    }
  }, [cycle, page])

  useEffect(() => {
    fetchGroups()
  }, [fetchGroups])

  const openCreate = () => {
    setEditingGroup(null)
    setFormData({
      code: '',
      cycle: cycle || '2024.2',
    })
    setModalOpen(true)
  }

  const openEdit = (group) => {
    setEditingGroup(group)
    setFormData({
      code: group.code || '',
      cycle: group.cycle || cycle || '2024.2',
    })
    setModalOpen(true)
  }

  const closeModal = () => {
    setModalOpen(false)
    setEditingGroup(null)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setSaving(true)
    setError('')
    try {
      const payload = {
        code: formData.code.trim(),
        cycle: formData.cycle?.trim() || null,
      }
      if (editingGroup) {
        await groupService.update(editingGroup.id, payload)
      } else {
        await groupService.create(payload)
      }
      closeModal()
      fetchGroups()
    } catch (err) {
      setError(err.response?.data?.message || 'Erro ao salvar')
    } finally {
      setSaving(false)
    }
  }

  const openDeleteConfirm = (group) => setDeleteConfirmGroup(group)
  const closeDeleteConfirm = () => {
    if (!deleting) setDeleteConfirmGroup(null)
  }

  const handleConfirmDelete = async () => {
    if (!deleteConfirmGroup) return
    setDeleting(true)
    setError('')
    try {
      await groupService.delete(deleteConfirmGroup.id)
      setDeleteConfirmGroup(null)
      fetchGroups()
    } catch (err) {
      setError(err.response?.data?.message || 'Erro ao excluir')
    } finally {
      setDeleting(false)
    }
  }

  const displayCode = (code) => (code && !/^G-?\d+/i.test(code) ? `G-${code}` : code) || '—'
  const totalStudents = groups.reduce((sum, g) => sum + (g.studentCount || 0), 0)

  return (
    <>
      <header className="groups-page-header groups-page-header--bar">
        <div className="groups-page-header-left groups-page-header-left--inline">
          <h1 className="groups-page-title">{t('groups.pageTitle')}</h1>
          <span className="groups-header-divider" aria-hidden />
          <nav className="groups-breadcrumb-nav" aria-label="Breadcrumb">
            <span className="groups-breadcrumb-item">{t('groups.classLabel')}</span>
            <span className="material-icons groups-breadcrumb-chevron">chevron_right</span>
            <span className="groups-breadcrumb-item groups-breadcrumb-item--current">{t('groups.cycleLabel')}</span>
          </nav>
        </div>
        <div className="groups-page-header-right">
          <div className="groups-view-toggle">
            <button
              type="button"
              className={`groups-view-btn ${view === VIEW_GRID ? 'groups-view-btn--active' : ''}`}
              onClick={() => setView(VIEW_GRID)}
            >
              <span className="material-icons">grid_view</span>
              {t('groups.viewGrid')}
            </button>
            <button
              type="button"
              className={`groups-view-btn ${view === VIEW_LIST ? 'groups-view-btn--active' : ''}`}
              onClick={() => setView(VIEW_LIST)}
            >
              <span className="material-icons">format_list_bulleted</span>
              {t('groups.viewList')}
            </button>
          </div>
          <button type="button" className="dashboard-btn dashboard-btn--primary" onClick={openCreate}>
            <span className="material-icons">add</span>
            {t('groups.newGroup')}
          </button>
        </div>
      </header>

      <div className="groups-toolbar-row">
        <div className="groups-stats">
          <span className="groups-stat groups-stat--blue">
            <span className="groups-stat-dot" />
            {t('groups.statsActive', { count: totalElements })}
          </span>
          <span className="groups-stat groups-stat--green">
            <span className="groups-stat-dot" />
            {t('groups.statsAllocated', { count: totalStudents })}
          </span>
        </div>
        <div className="groups-toolbar">
          <div className="groups-search-wrap">
            <span className="material-icons groups-search-icon">search</span>
            <input
              type="search"
              className="groups-search"
              placeholder={t('groups.searchPlaceholder')}
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              aria-label={t('groups.searchPlaceholder')}
            />
          </div>
          <button type="button" className="groups-filter-btn" aria-label={t('groups.filters')}>
            <span className="material-icons">filter_list</span>
          </button>
        </div>
      </div>

      {error && (
        <div className="students-error" role="alert">
          <span className="material-icons">error_outline</span>
          {error}
        </div>
      )}

      <div className={`groups-grid ${view === VIEW_LIST ? 'groups-grid--list' : ''}`}>
        {loading ? (
          <p className="students-loading">Carregando...</p>
        ) : (
          groups.map((card) => {
            const compact = !card.rotationType && !card.rotationCurrent
            const progressPercent = card.rotationTotal && card.rotationCurrent != null
              ? Math.round((card.rotationCurrent / card.rotationTotal) * 100)
              : 0
            const rotationLabel = card.rotationType ? t(rotationTypeLabelKey(card.rotationType)) : ''
            return (
              <article key={card.id} className="groups-card">
                <div className="groups-card-header">
                  <h2 className="groups-card-title">{t('groups.groupLabel', { id: displayCode(card.code) })}</h2>
                  <div className="groups-card-actions">
                    <button
                      type="button"
                      className="groups-card-icon-btn"
                      aria-label={t('students.edit')}
                      onClick={() => openEdit(card)}
                    >
                      <span className="material-icons">edit</span>
                    </button>
                    <button
                      type="button"
                      className="groups-card-icon-btn"
                      aria-label={t('students.delete')}
                      onClick={() => openDeleteConfirm(card)}
                    >
                      <span className="material-icons">delete_outline</span>
                    </button>
                  </div>
                </div>
                {compact ? (
                  <div className="groups-card-compact">
                    <p className="groups-card-preceptor-label">{t('groups.preceptor')}</p>
                    <p className="groups-card-preceptor-name">{card.preceptorName || '—'}</p>
                    <p className="groups-card-hospital-inline">
                      <span className="material-icons">business</span>
                      {card.hospitalName || '—'}
                    </p>
                    <div className="groups-card-compact-footer">
                      <button type="button" className="groups-card-edit-link" onClick={() => openEdit(card)}>
                        {t('groups.edit')}
                      </button>
                    </div>
                  </div>
                ) : (
                  <>
                    <div className="groups-card-title-row">
                      <span className={`groups-card-tag groups-card-tag--${rotationTypeTag(card.rotationType)}`}>
                        {rotationLabel || '—'}
                      </span>
                      <span className="groups-card-rotation-dot">•</span>
                      <span className="groups-card-rotation">
                        {t('groups.rotationStatus', {
                          current: card.rotationCurrent ?? 0,
                          total: card.rotationTotal ?? 6,
                        })}
                      </span>
                    </div>
                    <div className="groups-card-preceptor-block">
                      <div className="groups-card-preceptor-avatar" />
                      <div className="groups-card-preceptor-info">
                        <p className="groups-card-preceptor-label">{t('groups.responsiblePreceptor')}</p>
                        <div className="groups-card-preceptor-name-row">
                          <span className="groups-card-preceptor-name">{card.preceptorName || '—'}</span>
                          <button type="button" className="groups-card-swap-link">{t('groups.swap')}</button>
                        </div>
                      </div>
                    </div>
                    <div className="groups-card-hospital-box">
                      <div className="groups-card-hospital-box-header">
                        <span className="material-icons">business</span>
                        <span>{card.hospitalName || '—'}</span>
                      </div>
                      <div
                        className="groups-progress-bar groups-progress-bar--sm"
                        role="progressbar"
                        aria-valuenow={progressPercent}
                        aria-valuemin={0}
                        aria-valuemax={100}
                      >
                        <div className="groups-progress-fill" style={{ width: `${progressPercent}%` }} />
                      </div>
                    </div>
                    <div className="groups-card-students-row">
                      <span className="groups-card-students-label">{t('groups.studentsCount', { count: card.studentCount ?? 0 })}</span>
                      <button type="button" className="groups-card-view-list">{t('groups.viewStudentList')}</button>
                    </div>
                  </>
                )}
              </article>
            )
          })
        )}
        {!loading && (
          <>
            <button type="button" className="groups-card groups-card--new" aria-label={t('groups.newGroup')} onClick={openCreate}>
              <span className="groups-card-new-circle">
                <span className="material-icons">add</span>
              </span>
              <span className="groups-card-new-text">{t('groups.newGroup')}</span>
            </button>
          </>
        )}
      </div>

      {!loading && totalPages > 1 && (
        <div className="groups-pagination" style={{ marginTop: '1rem', display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          <button
            type="button"
            className="dashboard-btn dashboard-btn--secondary"
            disabled={page === 0}
            onClick={() => setPage((p) => p - 1)}
          >
            <span className="material-icons">chevron_left</span>
          </button>
          <span>{page + 1} / {totalPages}</span>
          <button
            type="button"
            className="dashboard-btn dashboard-btn--secondary"
            disabled={page >= totalPages - 1}
            onClick={() => setPage((p) => p + 1)}
          >
            <span className="material-icons">chevron_right</span>
          </button>
        </div>
      )}

      <section className="groups-bottom">
        <div className="groups-bottom-card groups-bottom-card--wide">
          <div className="groups-bottom-card-header">
            <h3 className="groups-bottom-card-title">
              <span className="material-icons">autorenew</span>
              {t('groups.rotationStatusTitle')}
            </h3>
            <button type="button" className="groups-bottom-link groups-bottom-link--top">{t('groups.generateSchedule')}</button>
          </div>
          <div className="groups-rotation-progress">
            <div className="groups-rotation-progress-head">
              <span className="groups-bottom-badge">{t('groups.currentCycle')}</span>
              <span className="groups-progress-pct">65% {t('groups.completed')}</span>
            </div>
            <div className="groups-progress-bar" role="progressbar" aria-valuenow={65} aria-valuemin={0} aria-valuemax={100}>
              <div className="groups-progress-fill" style={{ width: '65%' }} />
            </div>
            <div className="groups-dates">
              <span>{t('groups.startShort')} 01 Ago</span>
              <span>{t('groups.endShort')} 15 Out</span>
            </div>
          </div>
        </div>
        <div className="groups-bottom-card">
          <h3 className="groups-bottom-card-title">
            <span className="material-icons groups-bottom-card-title-icon">bolt</span>
            {t('groups.quickActions')}
          </h3>
          <ul className="groups-quick-actions">
            <li>
              <button type="button" className="groups-quick-action-btn">
                <span className="material-icons">swap_horiz</span>
                {t('groups.massSwap')}
                <span className="material-icons groups-quick-chevron">chevron_right</span>
              </button>
            </li>
            <li>
              <button type="button" className="groups-quick-action-btn">
                <span className="material-icons">file_download</span>
                {t('groups.exportSchedules')}
                <span className="material-icons groups-quick-chevron">chevron_right</span>
              </button>
            </li>
            <li>
              <button type="button" className="groups-quick-action-btn">
                <span className="material-icons">notification_add</span>
                {t('groups.notifyGroups')}
                <span className="material-icons groups-quick-chevron">chevron_right</span>
              </button>
            </li>
          </ul>
        </div>
      </section>

      {modalOpen && (
        <div className="groups-modal-overlay" onClick={closeModal} role="dialog" aria-modal="true" aria-labelledby="groups-modal-title">
          <div className="groups-modal" onClick={(e) => e.stopPropagation()}>
            <div className="groups-modal-header">
              <span className="groups-modal-icon" aria-hidden>
                <span className="material-icons">group_work</span>
              </span>
              <h3 id="groups-modal-title" className="groups-modal-title">
                {editingGroup ? t('groups.modalTitleEdit') : t('groups.modalTitleCreate')}
              </h3>
              <p className="groups-modal-subtitle">
                {editingGroup
                  ? t('groups.modalSubtitleEdit', { code: displayCode(editingGroup.code) })
                  : t('groups.modalSubtitleCreate')}
              </p>
            </div>
            <form onSubmit={handleSubmit} className="groups-modal-form">
              <div className="groups-modal-fields">
                <div className="groups-modal-field groups-modal-field--code">
                  <label htmlFor="group-code" className="groups-modal-label">
                    {t('groups.modalCode')}
                  </label>
                  <input
                    id="group-code"
                    type="text"
                    className="groups-modal-input"
                    value={formData.code}
                    onChange={(e) => setFormData((d) => ({ ...d, code: e.target.value }))}
                    required
                    maxLength={20}
                    placeholder={t('groups.modalCodePlaceholder')}
                    autoComplete="off"
                  />
                  <span className="groups-modal-hint">{t('groups.modalCodeHint')}</span>
                </div>
                <div className="groups-modal-field groups-modal-field--cycle">
                  <label htmlFor="group-cycle" className="groups-modal-label">
                    {t('groups.modalCycle')}
                  </label>
                  <input
                    id="group-cycle"
                    type="text"
                    className="groups-modal-input"
                    value={formData.cycle}
                    onChange={(e) => setFormData((d) => ({ ...d, cycle: e.target.value }))}
                    maxLength={20}
                    placeholder={t('groups.modalCyclePlaceholder')}
                    autoComplete="off"
                  />
                  <span className="groups-modal-hint">{t('groups.modalCycleHint')}</span>
                </div>
              </div>
              <div className="groups-modal-actions">
                <button type="button" className="dashboard-btn dashboard-btn--secondary" onClick={closeModal}>
                  {t('groups.modalCancel')}
                </button>
                <button type="submit" className="dashboard-btn dashboard-btn--primary" disabled={saving}>
                  {saving ? (
                    <>
                      <span className="groups-modal-spinner" aria-hidden />
                      {t('groups.modalSaving')}
                    </>
                  ) : (
                    t('groups.modalSave')
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {deleteConfirmGroup && (
        <div className="students-dialog-overlay" onClick={closeDeleteConfirm} role="alertdialog" aria-modal="true" aria-labelledby="groups-dialog-title">
          <div className="students-dialog" onClick={(e) => e.stopPropagation()}>
            <div className="students-dialog-icon-wrap">
              <span className="material-icons" aria-hidden>warning</span>
            </div>
            <h3 id="groups-dialog-title" className="students-dialog-title">
              {t('groups.deleteConfirmTitle')}
            </h3>
            <p className="students-dialog-message">
              {t('groups.deleteConfirmMessage', { code: displayCode(deleteConfirmGroup.code) })}
            </p>
            <div className="students-dialog-actions">
              <button
                type="button"
                className="dashboard-btn dashboard-btn--secondary"
                onClick={closeDeleteConfirm}
                disabled={deleting}
              >
                {t('groups.deleteConfirmCancel')}
              </button>
              <button
                type="button"
                className="dashboard-btn dashboard-btn--danger"
                onClick={handleConfirmDelete}
                disabled={deleting}
              >
                {deleting ? t('groups.deleteConfirmExcluding') : t('groups.deleteConfirmExclude')}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
