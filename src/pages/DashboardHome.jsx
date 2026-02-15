import { useState } from 'react'
import { useTranslation } from 'react-i18next'

const KPI_CARDS = [
  { key: 'studentsTotal', icon: 'school', value: 180, badgeType: 'success' },
  { key: 'groupsActive', icon: 'groups', value: 18, badgeType: 'neutral' },
  { key: 'preceptors', icon: 'work', value: 42, badgeType: 'success' },
  { key: 'hospitals', icon: 'local_hospital', value: 12, badgeType: 'info' },
]

const TABLE_ROWS = [
  { id: 1, name: 'Ana Alice Oliveira', ra: '20260452', initials: 'AA', group: 'G-04', hospital: 'Hospital das Clínicas', presence: 98, status: 'present', color: 'blue' },
  { id: 2, name: 'Bruno Pereira', ra: '20260812', initials: 'BP', group: 'G-04', hospital: 'Hospital das Clínicas', presence: 85, status: 'transit', color: 'purple' },
  { id: 3, name: 'Carla Martins', ra: '20260129', initials: 'CM', group: 'G-02', hospital: 'Santa Casa de Misericórdia', presence: 62, status: 'below', color: 'orange' },
  { id: 4, name: 'Daniel Souza', ra: '20260994', initials: 'DS', group: 'G-02', hospital: 'Santa Casa de Misericórdia', presence: 92, status: 'present', color: 'blue' },
]

const ACTIVITIES = [
  { id: 1, textKey: 'activity1', detailKey: 'activity1Detail', icon: 'check_circle', iconColor: 'blue' },
  { id: 2, textKey: 'activity2', detailKey: 'activity2Detail', icon: 'warning', iconColor: 'yellow' },
]

export default function DashboardHome() {
  const { t } = useTranslation()
  const [activeTab, setActiveTab] = useState('students')
  const [currentPage, setCurrentPage] = useState(1)
  const totalPages = 45
  const totalStudents = 180

  return (
    <>
      <section className="dashboard-kpis">
        {KPI_CARDS.map((card) => (
          <div key={card.key} className="dashboard-kpi-card">
            <div className="dashboard-kpi-header">
              <span className="material-icons dashboard-kpi-icon">{card.icon}</span>
              <span className={`dashboard-kpi-badge dashboard-kpi-badge--${card.badgeType}`}>{t(`dashboard.kpi.${card.key}.badge`)}</span>
            </div>
            <p className="dashboard-kpi-value">{card.value}</p>
            <p className="dashboard-kpi-label">{t(`dashboard.kpi.${card.key}.label`)}</p>
          </div>
        ))}
      </section>

      <section className="dashboard-table-section">
        <div className="dashboard-tabs-row">
          <div className="dashboard-tabs">
            {['students', 'preceptors', 'hospitals'].map((tab) => (
              <button
                key={tab}
                type="button"
                className={`dashboard-tab ${activeTab === tab ? 'dashboard-tab--active' : ''}`}
                onClick={() => setActiveTab(tab)}
              >
                {t(`dashboard.tabs.${tab}`)}
              </button>
            ))}
          </div>
          <div className="dashboard-table-actions">
            <button type="button" className="dashboard-btn dashboard-btn--secondary">
              <span className="material-icons">filter_list</span>
              {t('dashboard.filters')}
            </button>
            <button type="button" className="dashboard-btn dashboard-btn--primary">
              <span className="material-icons">person_add</span>
              {t('dashboard.newRecord')}
            </button>
          </div>
        </div>

        <div className="dashboard-table-wrap">
          <table className="dashboard-table">
            <thead>
              <tr>
                <th>{t('dashboard.table.name')}</th>
                <th>{t('dashboard.table.group')}</th>
                <th>{t('dashboard.table.hospital')}</th>
                <th>{t('dashboard.table.presence')}</th>
                <th>{t('dashboard.table.status')}</th>
                <th>{t('dashboard.table.actions')}</th>
              </tr>
            </thead>
            <tbody>
              {TABLE_ROWS.map((row) => (
                <tr key={row.id}>
                  <td>
                    <div className="dashboard-table-cell-user">
                      <div className={`dashboard-avatar dashboard-avatar--${row.color}`}>{row.initials}</div>
                      <div>
                        <span className="dashboard-table-name">{row.name}</span>
                        <span className="dashboard-table-ra">RA: {row.ra}</span>
                      </div>
                    </div>
                  </td>
                  <td><span className="dashboard-table-group">{row.group}</span></td>
                  <td>{row.hospital}</td>
                  <td>
                    <div className="dashboard-presence-wrap">
                      <div className="dashboard-presence-bar" role="progressbar" aria-valuenow={row.presence} aria-valuemin={0} aria-valuemax={100}>
                        <div className={`dashboard-presence-fill dashboard-presence-fill--${row.status}`} style={{ width: `${row.presence}%` }} />
                      </div>
                      <span className="dashboard-presence-pct">{row.presence}%</span>
                    </div>
                  </td>
                  <td>
                    <span className={`dashboard-status dashboard-status--${row.status}`}>
                      {t(`dashboard.status.${row.status}`)}
                    </span>
                  </td>
                  <td>
                    <button type="button" className="dashboard-table-actions-btn" aria-label={t('dashboard.actions')}>
                      <span className="material-icons">more_vert</span>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="dashboard-pagination">
          <p className="dashboard-pagination-info">
            {t('dashboard.paginationShowing', { from: 1, to: 4, total: totalStudents, entity: t('dashboard.tabs.students').toLowerCase() })}
          </p>
          <div className="dashboard-pagination-controls">
            <button type="button" className="dashboard-pagination-btn" disabled={currentPage === 1} aria-label={t('dashboard.prevPage')}>
              <span className="material-icons">chevron_left</span>
            </button>
            <button type="button" className="dashboard-pagination-btn dashboard-pagination-btn--active">1</button>
            <button type="button" className="dashboard-pagination-btn">2</button>
            <button type="button" className="dashboard-pagination-btn">3</button>
            <span className="dashboard-pagination-ellipsis">…</span>
            <button type="button" className="dashboard-pagination-btn">{totalPages}</button>
            <button type="button" className="dashboard-pagination-btn" disabled={currentPage === totalPages} aria-label={t('dashboard.nextPage')}>
              <span className="material-icons">chevron_right</span>
            </button>
          </div>
        </div>
      </section>

      <section className="dashboard-bottom">
        <div className="dashboard-activity-card">
          <h2 className="dashboard-activity-title">
            <span className="material-icons">schedule</span>
            {t('dashboard.recentActivities')}
          </h2>
          <ul className="dashboard-activity-list">
            {ACTIVITIES.map((a) => (
              <li key={a.id} className="dashboard-activity-item">
                <span className={`material-icons dashboard-activity-icon dashboard-activity-icon--${a.iconColor}`}>{a.icon}</span>
                <div>
                  <p className="dashboard-activity-text">{t(`dashboard.${a.textKey}`)}</p>
                  <p className="dashboard-activity-detail">{t(`dashboard.${a.detailKey}`)}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
        <div className="dashboard-map-card">
          <h2 className="dashboard-map-title">
            <span className="material-icons">map</span>
            {t('dashboard.geoDistribution')}
          </h2>
          <div className="dashboard-map-placeholder">
            <span className="material-icons">map</span>
            <span>{t('dashboard.mapPlaceholder')}</span>
          </div>
        </div>
      </section>
    </>
  )
}
