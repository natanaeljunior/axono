import { useState, useEffect, useCallback } from 'react'
import { useTranslation } from 'react-i18next'
import { groupService, rotationAssignmentService, hospitalService, preceptorService } from '../services'

const VIEW_BIMESTRAL = 'bimestral'
const VIEW_MENSAL = 'mensal'
const ROTATION_TYPES = ['SURGERY', 'PEDIATRICS', 'CLINICAL', 'GYNECOLOGY', 'EMERGENCY', 'HEALTH']

const LEGEND_ITEMS = [
  { key: 'surgery', color: 'red' },
  { key: 'pediatrics', color: 'green' },
  { key: 'clinical', color: 'blue' },
  { key: 'go', color: 'yellow' },
  { key: 'emergency', color: 'purple' },
  { key: 'health', color: 'teal' },
]

const BIMESTRES = [
  { id: 1, labelKey: 'bimester1', range: 'Jan - Fev' },
  { id: 2, labelKey: 'bimester2', range: 'Mar - Abr' },
  { id: 3, labelKey: 'bimester3', range: 'Mai - Jun' },
  { id: 4, labelKey: 'bimester4', range: 'Jul - Ago' },
  { id: 5, labelKey: 'bimester5', range: 'Set - Out' },
  { id: 6, labelKey: 'bimester6', range: 'Nov - Dez' },
]

/** Backend enum (SURGERY, PEDIATRICS, ...) -> legend key (surgery, pediatrics, ...). */
function rotationTypeToKey(rotationType) {
  if (!rotationType) return null
  const s = rotationType.toUpperCase()
  if (s === 'GYNECOLOGY') return 'go'
  return s.toLowerCase()
}

const CONFLICT_ALERTS = [
  { key: 'alertHospital' },
  { key: 'alertPreceptor' },
]

export default function Rotations() {
  const { t } = useTranslation()
  const [view, setView] = useState(VIEW_BIMESTRAL)
  const [cycle, setCycle] = useState('2024.2')
  const [groups, setGroups] = useState([])
  const [assignmentsByGroupId, setAssignmentsByGroupId] = useState({})
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [hospitals, setHospitals] = useState([])
  const [preceptors, setPreceptors] = useState([])
  const [editingCell, setEditingCell] = useState(null)
  const [cellForm, setCellForm] = useState({ rotationType: '', hospitalId: '', preceptorId: '' })
  const [saving, setSaving] = useState(false)

  const fetchData = useCallback(async () => {
    setLoading(true)
    setError('')
    try {
      const page = await groupService.findAll(cycle || null, 0, 100)
      const list = page.content || []
      setGroups(list)
      const byGroup = {}
      await Promise.all(
        list.map(async (g) => {
          const assignments = await rotationAssignmentService.getByGroupId(g.id)
          const slots = [null, null, null, null, null, null]
          ;(assignments || []).forEach((a) => {
            const idx = a.periodIndex - 1
            if (idx >= 0 && idx < 6) {
              slots[idx] = {
                rotationKey: rotationTypeToKey(a.rotationType),
                hospital: a.hospitalName || '—',
                preceptor: a.preceptorName || '—',
                rotationType: a.rotationType,
                hospitalId: a.hospitalId,
                preceptorId: a.preceptorId,
              }
            }
          })
          byGroup[g.id] = slots
        })
      )
      setAssignmentsByGroupId(byGroup)
    } catch (err) {
      setError(err.response?.data?.message || 'Erro ao carregar rotações')
    } finally {
      setLoading(false)
    }
  }, [cycle])

  useEffect(() => {
    fetchData()
  }, [fetchData])

  useEffect(() => {
    hospitalService.findAll(null, 0, 500).then((d) => setHospitals(d.content || [])).catch(() => {})
    preceptorService.findAll(0, 500).then((d) => setPreceptors(d.content || [])).catch(() => {})
  }, [])

  const openCellEdit = (group, periodIndex) => {
    const slots = assignmentsByGroupId[group.id] || [null, null, null, null, null, null]
    const slot = slots[periodIndex - 1]
    setEditingCell({ group, periodIndex })
    setCellForm({
      rotationType: slot?.rotationType || '',
      hospitalId: slot?.hospitalId || '',
      preceptorId: slot?.preceptorId || '',
    })
  }

  const closeCellEdit = () => {
    setEditingCell(null)
  }

  const handleSaveCell = async (e) => {
    e.preventDefault()
    if (!editingCell) return
    setSaving(true)
    setError('')
    try {
      const { group, periodIndex } = editingCell
      const slots = assignmentsByGroupId[group.id] || [null, null, null, null, null, null]
      const payload = [1, 2, 3, 4, 5, 6].map((p) => {
        const s = slots[p - 1]
        if (p === periodIndex) {
          return {
            periodIndex: p,
            rotationType: cellForm.rotationType || null,
            hospitalId: cellForm.hospitalId || null,
            preceptorId: cellForm.preceptorId || null,
          }
        }
        return {
          periodIndex: p,
          rotationType: s?.rotationType || null,
          hospitalId: s?.hospitalId || null,
          preceptorId: s?.preceptorId || null,
        }
      })
      await rotationAssignmentService.saveAssignments(group.id, payload)
      const updated = await rotationAssignmentService.getByGroupId(group.id)
      const newSlots = [null, null, null, null, null, null]
      ;(updated || []).forEach((a) => {
        const idx = a.periodIndex - 1
        if (idx >= 0 && idx < 6) {
          newSlots[idx] = {
            rotationKey: rotationTypeToKey(a.rotationType),
            hospital: a.hospitalName || '—',
            preceptor: a.preceptorName || '—',
            rotationType: a.rotationType,
            hospitalId: a.hospitalId,
            preceptorId: a.preceptorId,
          }
        }
      })
      setAssignmentsByGroupId((prev) => ({ ...prev, [group.id]: newSlots }))
      closeCellEdit()
    } catch (err) {
      setError(err.response?.data?.message || 'Erro ao salvar')
    } finally {
      setSaving(false)
    }
  }

  const displayCode = (code) => (code && !/^G-?\d+/i.test(code) ? `G-${code}` : code) || '—'
  const totalCells = groups.length * 6
  const filledCells = groups.reduce((sum, g) => {
    const slots = assignmentsByGroupId[g.id] || []
    return sum + slots.filter((s) => s && s.rotationType).length
  }, 0)

  return (
    <>
      <header className="rotations-page-header rotations-page-header--bar">
        <div className="rotations-page-header-left rotations-page-header-left--inline">
          <h1 className="rotations-page-title">{t('rotations.pageTitle')}</h1>
          <span className="rotations-header-divider" aria-hidden />
          <nav className="rotations-breadcrumb-nav" aria-label="Breadcrumb">
            <span className="rotations-breadcrumb-item">{t('rotations.classLabel')}</span>
            <span className="material-icons rotations-breadcrumb-chevron">chevron_right</span>
            <span className="rotations-breadcrumb-item rotations-breadcrumb-item--current">{t('rotations.matrixLabel')}</span>
          </nav>
        </div>
        <div className="rotations-page-header-right">
          <div className="rotations-view-toggle">
            <button
              type="button"
              className={`rotations-view-btn ${view === VIEW_BIMESTRAL ? 'rotations-view-btn--active' : ''}`}
              onClick={() => setView(VIEW_BIMESTRAL)}
            >
              {t('rotations.bimestral')}
            </button>
            <button
              type="button"
              className={`rotations-view-btn ${view === VIEW_MENSAL ? 'rotations-view-btn--active' : ''}`}
              onClick={() => setView(VIEW_MENSAL)}
            >
              {t('rotations.monthly')}
            </button>
          </div>
          <button type="button" className="dashboard-btn dashboard-btn--primary">
            <span className="material-icons">save</span>
            {t('rotations.saveAdjustments')}
          </button>
        </div>
      </header>

      {error && (
        <div className="students-error" role="alert">
          <span className="material-icons">error_outline</span>
          {error}
        </div>
      )}

      <div className="rotations-legend-box">
        <span className="rotations-legend-label">{t('rotations.legend')}</span>
        {LEGEND_ITEMS.map((item) => (
          <span key={item.key} className="rotations-legend-item">
            <span className={`rotations-legend-dot rotations-legend-dot--${item.color}`} />
            <span className="rotations-legend-text">{t(`rotations.rotation.${item.key}`)}</span>
          </span>
        ))}
      </div>

      <div className="rotations-grid-wrap custom-scrollbar">
        {loading ? (
          <p className="students-loading">Carregando...</p>
        ) : (
          <table className="rotations-grid" role="grid">
            <thead>
              <tr className="rotations-grid-thead-row">
                <th className="rotations-grid-th rotations-grid-th--group rotations-sticky-col rotations-sticky-col--head">
                  {t('rotations.columnGroup')}
                </th>
                {BIMESTRES.map((b) => (
                  <th key={b.id} className="rotations-grid-th rotations-grid-th--bimester">
                    <span className="rotations-grid-th-title">{t(`rotations.${b.labelKey}`)}</span>
                    <span className="rotations-grid-th-range">{b.range}</span>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {groups.map((group) => {
                const cells = assignmentsByGroupId[group.id] || [null, null, null, null, null, null]
                return (
                  <tr key={group.id} className="rotations-grid-tbody-tr">
                    <td className="rotations-grid-td rotations-grid-td--group rotations-sticky-col">
                      <div className="rotations-group-cell">
                        <span className="rotations-group-badge">{displayCode(group.code)}</span>
                        <span className="rotations-group-name">{t('rotations.groupLabel', { id: displayCode(group.code) })}</span>
                      </div>
                    </td>
                    {cells.map((cell, i) => (
                      <td key={i} className="rotations-grid-td rotations-grid-td--cell">
                        {cell && cell.rotationKey ? (
                          <div
                            className={`rotations-cell rotations-cell--soft rotations-cell--${cell.rotationKey}`}
                            role="button"
                            tabIndex={0}
                            onClick={() => openCellEdit(group, i + 1)}
                            onKeyDown={(e) => e.key === 'Enter' && openCellEdit(group, i + 1)}
                          >
                            <div className="rotations-cell-head">
                              <span className="rotations-cell-label">{t(`rotations.rotation.${cell.rotationKey}`)}</span>
                              <span className="material-icons rotations-cell-drag" aria-hidden>drag_indicator</span>
                            </div>
                            <p className="rotations-cell-hospital">{cell.hospital}</p>
                            <p className="rotations-cell-preceptor">
                              <span className="material-icons rotations-cell-person">person</span>
                              {cell.preceptor}
                            </p>
                          </div>
                        ) : (
                          <div
                            className="rotations-cell rotations-cell--empty"
                            role="button"
                            tabIndex={0}
                            onClick={() => openCellEdit(group, i + 1)}
                            onKeyDown={(e) => e.key === 'Enter' && openCellEdit(group, i + 1)}
                          >
                            <span className="material-icons rotations-cell-add">add</span>
                          </div>
                        )}
                      </td>
                    ))}
                  </tr>
                )
              })}
              {groups.length === 0 && !loading && (
                <tr>
                  <td colSpan={7} className="rotations-grid-td" style={{ textAlign: 'center', padding: '2rem' }}>
                    Nenhum grupo no ciclo. Cadastre grupos em Gestão de Grupos.
                  </td>
                </tr>
              )}
              <tr className="rotations-scroll-row">
                <td className="rotations-scroll-td" colSpan={BIMESTRES.length + 1}>
                  {t('rotations.scrollNote')}
                </td>
              </tr>
            </tbody>
          </table>
        )}
      </div>

      <section className="rotations-bottom">
        <div className="rotations-bottom-card">
          <h3 className="rotations-bottom-card-title">
            <span className="material-icons rotations-bottom-card-icon rotations-bottom-card-icon--primary">check_circle</span>
            {t('rotations.matrixStatus')}
          </h3>
          <p className="rotations-bottom-label">{t('rotations.cellsFilled')}</p>
          <div className="rotations-progress-row">
            <div className="rotations-progress-bar" role="progressbar" aria-valuenow={filledCells} aria-valuemin={0} aria-valuemax={totalCells || 1}>
              <div className="rotations-progress-fill" style={{ width: `${totalCells ? (filledCells / totalCells) * 100 : 0}%` }} />
            </div>
            <span className="rotations-progress-text">{filledCells} / {totalCells}</span>
          </div>
          <p className="rotations-bottom-note">{t('rotations.noteRotations')}</p>
        </div>
        <div className="rotations-bottom-card">
          <h3 className="rotations-bottom-card-title">
            <span className="material-icons rotations-bottom-card-icon rotations-bottom-card-icon--warning">warning</span>
            {t('rotations.conflictAlerts')}
          </h3>
          <ul className="rotations-alerts-list">
            {CONFLICT_ALERTS.map((a) => (
              <li key={a.key} className="rotations-alert-item rotations-alert-item--box">
                <span className="material-icons rotations-alert-icon">error_outline</span>
                <span className="rotations-alert-text">{t(`rotations.${a.key}`)}</span>
              </li>
            ))}
          </ul>
        </div>
        <div className="rotations-bottom-card">
          <h3 className="rotations-bottom-card-title">
            <span className="material-icons rotations-bottom-card-icon rotations-bottom-card-icon--info">info</span>
            {t('rotations.quickActions')}
          </h3>
          <div className="rotations-quick-grid">
            <button type="button" className="rotations-quick-btn">
              <span className="material-icons">file_download</span>
              {t('rotations.exportPdf')}
            </button>
            <button type="button" className="rotations-quick-btn">
              <span className="material-icons">autorenew</span>
              {t('rotations.autoFill')}
            </button>
            <button type="button" className="rotations-quick-btn">
              <span className="material-icons">history</span>
              {t('rotations.history')}
            </button>
            <button type="button" className="rotations-quick-btn rotations-quick-btn--danger">
              <span className="material-icons">delete_outline</span>
              {t('rotations.clearGrid')}
            </button>
          </div>
        </div>
      </section>

      {editingCell && (
        <div className="students-modal-overlay" onClick={closeCellEdit} role="dialog" aria-modal="true" aria-labelledby="rotations-cell-modal-title">
          <div className="students-modal" onClick={(e) => e.stopPropagation()}>
            <h3 id="rotations-cell-modal-title" className="students-modal-title">
              {t('rotations.cellModalTitle', { group: displayCode(editingCell.group.code), period: editingCell.periodIndex })}
            </h3>
            <form onSubmit={handleSaveCell}>
              <div className="students-modal-field">
                <label htmlFor="cell-rotation-type">{t('rotations.cellModalRotationType')}</label>
                <select
                  id="cell-rotation-type"
                  value={cellForm.rotationType}
                  onChange={(e) => setCellForm((f) => ({ ...f, rotationType: e.target.value }))}
                >
                  <option value="">—</option>
                  {ROTATION_TYPES.map((rt) => (
                    <option key={rt} value={rt}>{t(`rotations.rotation.${rotationTypeToKey(rt) || rt.toLowerCase()}`)}</option>
                  ))}
                </select>
              </div>
              <div className="students-modal-field">
                <label htmlFor="cell-hospital">{t('rotations.cellModalHospital')}</label>
                <select
                  id="cell-hospital"
                  value={cellForm.hospitalId}
                  onChange={(e) => setCellForm((f) => ({ ...f, hospitalId: e.target.value }))}
                >
                  <option value="">—</option>
                  {hospitals.map((h) => (
                    <option key={h.id} value={h.id}>{h.name}</option>
                  ))}
                </select>
              </div>
              <div className="students-modal-field">
                <label htmlFor="cell-preceptor">{t('rotations.cellModalPreceptor')}</label>
                <select
                  id="cell-preceptor"
                  value={cellForm.preceptorId}
                  onChange={(e) => setCellForm((f) => ({ ...f, preceptorId: e.target.value }))}
                >
                  <option value="">—</option>
                  {preceptors.map((p) => (
                    <option key={p.id} value={p.id}>{p.name}</option>
                  ))}
                </select>
              </div>
              <div className="students-modal-actions">
                <button type="button" className="dashboard-btn dashboard-btn--secondary" onClick={closeCellEdit}>
                  {t('groups.modalCancel')}
                </button>
                <button type="submit" className="dashboard-btn dashboard-btn--primary" disabled={saving}>
                  {saving ? t('groups.modalSaving') : t('groups.modalSave')}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  )
}
