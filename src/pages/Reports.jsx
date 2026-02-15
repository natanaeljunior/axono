import { useState } from 'react'
import { useTranslation } from 'react-i18next'

const GROUPS_ROWS = [
  { id: 'G01', students: 8, rotation: 'Cirurgia Geral', rotationColor: 'blue', presence: 98.5, presenceVariant: 'green', progress: 85, progressVariant: 'primary' },
  { id: 'G02', students: 10, rotation: 'Pediatria', rotationColor: 'purple', presence: 82.1, presenceVariant: 'orange', progress: 42, progressVariant: 'primary' },
  { id: 'G03', students: 8, rotation: 'Ginecologia', rotationColor: 'green', presence: 68.4, presenceVariant: 'red', progress: 15, progressVariant: 'amber' },
]

const DONUT_LEGEND = [
  { key: 'onTrack', pct: 65, color: 'primary' },
  { key: 'delayed', pct: 20, color: 'amber' },
  { key: 'paused', pct: 15, color: 'gray' },
]

export default function Reports() {
  const { t } = useTranslation()
  const [semester, setSemester] = useState('2024.1')
  const [filterGroup, setFilterGroup] = useState('all')
  const [filterStatus, setFilterStatus] = useState('all')

  return (
    <>
      <header className="reports-page-header">
        <h1 className="reports-title">{t('reports.pageTitle')}</h1>
        <div className="reports-header-right">
          <div className="reports-semester-wrap">
            <span className="material-icons reports-semester-icon">calendar_today</span>
            <select
              className="reports-semester-select"
              value={semester}
              onChange={(e) => setSemester(e.target.value)}
              aria-label={t('reports.semester')}
            >
              <option value="2024.1">Semestre 2024.1</option>
              <option value="2023.2">Semestre 2023.2</option>
            </select>
            <span className="material-icons reports-semester-arrow">expand_more</span>
          </div>
          <button type="button" className="dashboard-btn dashboard-btn--primary">
            <span className="material-icons">download</span>
            {t('reports.exportConsolidated')}
          </button>
        </div>
      </header>

      <div className="reports-kpis">
        <div className="reports-kpi-card">
          <div className="reports-kpi-head">
            <span className="reports-kpi-badge reports-kpi-badge--success">+2.4% vs mês ant.</span>
            <span className="reports-kpi-icon reports-kpi-icon--green">
              <span className="material-icons">person</span>
            </span>
          </div>
          <p className="reports-kpi-label">{t('reports.kpiPresence')}</p>
          <p className="reports-kpi-value">94.2%</p>
          <div className="reports-kpi-bar">
            <div className="reports-kpi-bar-fill reports-kpi-bar-fill--green" style={{ width: '94.2%' }} />
          </div>
        </div>
        <div className="reports-kpi-card">
          <div className="reports-kpi-head">
            <span className="reports-kpi-meta">{t('reports.kpiHoursGoal')}</span>
            <span className="reports-kpi-icon reports-kpi-icon--blue">
              <span className="material-icons">schedule</span>
            </span>
          </div>
          <p className="reports-kpi-label">{t('reports.kpiHours')}</p>
          <p className="reports-kpi-value">324h / 400h</p>
          <div className="reports-kpi-bar">
            <div className="reports-kpi-bar-fill reports-kpi-bar-fill--blue" style={{ width: '81%' }} />
          </div>
        </div>
        <div className="reports-kpi-card">
          <div className="reports-kpi-head">
            <span className="reports-kpi-badge reports-kpi-badge--urgent">{t('reports.urgent')}</span>
            <span className="reports-kpi-icon reports-kpi-icon--amber">
              <span className="material-icons">assignment_turned_in</span>
            </span>
          </div>
          <p className="reports-kpi-label">{t('reports.kpiValidation')}</p>
          <p className="reports-kpi-value">48</p>
          <p className="reports-kpi-desc">{t('reports.kpiValidationDesc')}</p>
        </div>
      </div>

      <div className="reports-charts">
        <div className="reports-chart-card">
          <div className="reports-chart-head">
            <h3 className="reports-chart-title">
              <span className="material-icons reports-chart-title-icon">bar_chart</span>
              {t('reports.chartHoursByRotation')}
            </h3>
            <select
              className="reports-chart-filter"
              value={filterGroup}
              onChange={(e) => setFilterGroup(e.target.value)}
              aria-label={t('reports.filterGroups')}
            >
              <option value="all">{t('reports.allGroups')}</option>
            </select>
          </div>
          <div className="reports-chart-placeholder reports-chart-placeholder--bars">
            <div className="reports-chart-axes">
              <span className="reports-chart-cat">CIRURGIA</span>
              <span className="reports-chart-cat">PEDIATRIA</span>
              <span className="reports-chart-cat">GINECO</span>
              <span className="reports-chart-cat">CLÍNICA</span>
              <span className="reports-chart-cat">EMERGÊNCIA</span>
            </div>
            <p className="reports-chart-hint">{t('reports.chartPlaceholder')}</p>
          </div>
        </div>
        <div className="reports-chart-card">
          <h3 className="reports-chart-title">
            <span className="material-icons reports-chart-title-icon reports-chart-title-icon--green">add_circle</span>
            {t('reports.chartCompletionStatus')}
          </h3>
          <div className="reports-donut-wrap">
            <div className="reports-donut">
              <div className="reports-donut-center">
                <span className="reports-donut-total">148</span>
                <span className="reports-donut-label">{t('reports.students')}</span>
              </div>
            </div>
            <div className="reports-donut-legend">
              {DONUT_LEGEND.map((item) => (
                <div key={item.key} className="reports-donut-legend-item">
                  <span className={`reports-donut-dot reports-donut-dot--${item.color}`} />
                  {t(`reports.${item.key}`)} {item.pct}%
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <section className="reports-table-section">
        <div className="reports-table-head">
          <h3 className="reports-table-title">
            <span className="material-icons reports-table-title-icon">groups</span>
            {t('reports.tableTitle')}
          </h3>
          <div className="reports-table-filter-wrap">
            <span className="reports-table-filter-label">{t('reports.filterByStatus')}</span>
            <select
              className="reports-table-filter"
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              aria-label={t('reports.filterByStatus')}
            >
              <option value="all">{t('reports.all')}</option>
            </select>
          </div>
        </div>
        <div className="reports-table-wrap">
          <table className="reports-table">
            <thead>
              <tr>
                <th className="reports-th">{t('reports.columnGroup')}</th>
                <th className="reports-th">{t('reports.columnRotation')}</th>
                <th className="reports-th">{t('reports.columnPresence')}</th>
                <th className="reports-th">{t('reports.columnProgress')}</th>
                <th className="reports-th reports-th--actions">{t('reports.columnActions')}</th>
              </tr>
            </thead>
            <tbody>
              {GROUPS_ROWS.map((row) => (
                <tr key={row.id} className="reports-tr">
                  <td className="reports-td">
                    <span className="reports-group-name">{t('reports.groupLabel', { id: row.id })}</span>
                    <span className="reports-group-count">({row.students} {t('reports.studentsCount')})</span>
                  </td>
                  <td className="reports-td">
                    <span className={`reports-rotation-tag reports-rotation-tag--${row.rotationColor}`}>
                      {row.rotation}
                    </span>
                  </td>
                  <td className="reports-td">
                    <span className={`reports-presence-dot reports-presence-dot--${row.presenceVariant}`} />
                    {row.presence}%
                  </td>
                  <td className="reports-td">
                    <div className="reports-progress-cell">
                      <div className="reports-progress-bar">
                        <div
                          className={`reports-progress-fill reports-progress-fill--${row.progressVariant}`}
                          style={{ width: `${row.progress}%` }}
                        />
                      </div>
                      <span className="reports-progress-pct">{row.progress}%</span>
                    </div>
                  </td>
                  <td className="reports-td reports-td--actions">
                    <button type="button" className="reports-action-btn" aria-label={t('reports.viewDetails')}>
                      <span className="material-icons">visibility</span>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </>
  )
}
