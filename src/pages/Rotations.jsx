import { useState } from 'react'
import { useTranslation } from 'react-i18next'

const VIEW_BIMESTRAL = 'bimestral'
const VIEW_MENSAL = 'mensal'

const LEGEND_ITEMS = [
  { key: 'surgery', color: 'red' },
  { key: 'pediatrics', color: 'green' },
  { key: 'clinical', color: 'blue' },
  { key: 'go', color: 'yellow' },
  { key: 'emergency', color: 'purple' },
]

const BIMESTRES = [
  { id: 1, labelKey: 'bimester1', range: 'Jan - Fev' },
  { id: 2, labelKey: 'bimester2', range: 'Mar - Abr' },
  { id: 3, labelKey: 'bimester3', range: 'Mai - Jun' },
  { id: 4, labelKey: 'bimester4', range: 'Jul - Ago' },
  { id: 5, labelKey: 'bimester5', range: 'Set - Out' },
  { id: 6, labelKey: 'bimester6', range: 'Nov - Dez' },
]

const GRID_DATA = [
  {
    groupId: 'G1',
    groupNameKey: 'group01',
    cells: [
      { rotationKey: 'surgery', hospital: 'Hospital das Clínicas', preceptor: 'Dr. Roberto Silva' },
      { rotationKey: 'pediatrics', hospital: 'Hosp. Materno Infantil', preceptor: 'Dra. Maria Lima' },
      { rotationKey: 'clinical', hospital: 'Santa Casa de Misericórdia', preceptor: 'Dr. André Santos' },
      null,
      null,
      null,
    ],
  },
  {
    groupId: 'G2',
    groupNameKey: 'group02',
    cells: [
      { rotationKey: 'clinical', hospital: 'Hospital São José', preceptor: 'Dr. Sergio Moro' },
      { rotationKey: 'surgery', hospital: 'Hospital das Clínicas', preceptor: 'Dra. Paula Costa' },
      { rotationKey: 'go', hospital: 'Hospital da Mulher', preceptor: 'Dra. Helena Ramos' },
      null,
      null,
      null,
    ],
  },
  {
    groupId: 'G3',
    groupNameKey: 'group03',
    cells: [
      { rotationKey: 'emergency', hospital: 'Pronto Socorro Central', preceptor: 'Dr. Fabio Junior' },
      { rotationKey: 'clinical', hospital: 'Hospital Metropolitano', preceptor: 'Dra. Carla Dias' },
      { rotationKey: 'pediatrics', hospital: 'Hosp. da Criança', preceptor: 'Dr. João Pereira' },
      null,
      null,
      null,
    ],
  },
]

const CONFLICT_ALERTS = [
  { key: 'alertHospital' },
  { key: 'alertPreceptor' },
]

export default function Rotations() {
  const { t } = useTranslation()
  const [view, setView] = useState(VIEW_BIMESTRAL)
  const filledCells = 54
  const totalCells = 108

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
            {GRID_DATA.map((row) => (
              <tr key={row.groupId} className="rotations-grid-tbody-tr">
                <td className="rotations-grid-td rotations-grid-td--group rotations-sticky-col">
                  <div className="rotations-group-cell">
                    <span className="rotations-group-badge">{row.groupId}</span>
                    <span className="rotations-group-name">{t(`rotations.${row.groupNameKey}`)}</span>
                  </div>
                </td>
                {row.cells.map((cell, i) => (
                  <td key={i} className="rotations-grid-td rotations-grid-td--cell">
                    {cell ? (
                      <div className={`rotations-cell rotations-cell--soft rotations-cell--${cell.rotationKey}`} role="button" tabIndex={0}>
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
                      <div className="rotations-cell rotations-cell--empty">
                        <span className="material-icons rotations-cell-add">add</span>
                      </div>
                    )}
                  </td>
                ))}
              </tr>
            ))}
            <tr className="rotations-scroll-row">
              <td className="rotations-scroll-td" colSpan={BIMESTRES.length + 1}>
                {t('rotations.scrollNote')}
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <section className="rotations-bottom">
        <div className="rotations-bottom-card">
          <h3 className="rotations-bottom-card-title">
            <span className="material-icons rotations-bottom-card-icon rotations-bottom-card-icon--primary">check_circle</span>
            {t('rotations.matrixStatus')}
          </h3>
          <p className="rotations-bottom-label">{t('rotations.cellsFilled')}</p>
          <div className="rotations-progress-row">
            <div className="rotations-progress-bar" role="progressbar" aria-valuenow={filledCells} aria-valuemin={0} aria-valuemax={totalCells}>
              <div className="rotations-progress-fill" style={{ width: `${(filledCells / totalCells) * 100}%` }} />
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
    </>
  )
}
