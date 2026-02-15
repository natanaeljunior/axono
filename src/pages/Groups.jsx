import { useState } from 'react'
import { useTranslation } from 'react-i18next'

const VIEW_GRID = 'grid'
const VIEW_LIST = 'list'

const INITIAL_COLORS = ['blue', 'purple', 'orange', 'indigo', 'green']

const GROUP_CARDS = [
  {
    id: 'G-01',
    tag: 'health',
    tagLabelKey: 'rotationHealth',
    rotation: '3/6',
    progressPercent: 50,
    preceptor: 'Dr. Roberto Silva',
    hospital: 'Hospital das Clínicas',
    studentCount: 10,
    initials: ['AA', 'BP', 'CM', 'DS', 'ET'],
    extraCount: 5,
  },
  {
    id: 'G-02',
    tag: 'gynecology',
    tagLabelKey: 'rotationGynecology',
    rotation: '1/6',
    progressPercent: 15,
    preceptor: 'Dra. Heloísa Ramos',
    hospital: 'Santa Casa de Misericórdia',
    studentCount: 10,
    initials: ['MR', 'JC', 'LG'],
    extraCount: 7,
  },
  {
    id: 'G-03',
    tag: 'pediatrics',
    tagLabelKey: 'rotationPediatrics',
    rotation: '5/6',
    progressPercent: 80,
    preceptor: 'Dr. Marcos Vinícius',
    hospital: 'Hosp. Infantil Sabará',
    studentCount: 10,
    initials: ['FF', 'KL'],
    extraCount: 8,
  },
  {
    id: 'G-04',
    preceptor: 'Dr. Amanda Costa',
    hospital: 'Hospital Municipal',
    compact: true,
  },
  {
    id: 'G-05',
    preceptor: 'Dr. Juliano Lima',
    hospital: 'UPA Central',
    compact: true,
  },
]

export default function Groups() {
  const { t } = useTranslation()
  const [view, setView] = useState(VIEW_GRID)
  const [search, setSearch] = useState('')

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
          <button type="button" className="dashboard-btn dashboard-btn--primary">
            <span className="material-icons">add</span>
            {t('groups.newGroup')}
          </button>
        </div>
      </header>

      <div className="groups-toolbar-row">
        <div className="groups-stats">
          <span className="groups-stat groups-stat--blue">
            <span className="groups-stat-dot" />
            {t('groups.statsActive', { count: 18 })}
          </span>
          <span className="groups-stat groups-stat--green">
            <span className="groups-stat-dot" />
            {t('groups.statsAllocated', { count: 180 })}
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

      <div className={`groups-grid ${view === VIEW_LIST ? 'groups-grid--list' : ''}`}>
        {GROUP_CARDS.map((card) => (
          <article key={card.id} className="groups-card">
            <div className="groups-card-header">
              <h2 className="groups-card-title">{t('groups.groupLabel', { id: card.id })}</h2>
              <div className="groups-card-actions">
                {!card.compact && (
                  <>
                    <button type="button" className="groups-card-icon-btn" aria-label={t('students.edit')}>
                      <span className="material-icons">edit</span>
                    </button>
                    <button type="button" className="groups-card-icon-btn" aria-label={t('dashboard.actions')}>
                      <span className="material-icons">more_vert</span>
                    </button>
                  </>
                )}
                {card.compact && (
                  <button type="button" className="groups-card-icon-btn" aria-label={t('dashboard.actions')}>
                    <span className="material-icons">more_vert</span>
                  </button>
                )}
              </div>
            </div>
            {card.compact ? (
              <div className="groups-card-compact">
                <p className="groups-card-preceptor-label">{t('groups.preceptor')}</p>
                <p className="groups-card-preceptor-name">{card.preceptor}</p>
                <p className="groups-card-hospital-inline">
                  <span className="material-icons">business</span>
                  {card.hospital}
                </p>
                <div className="groups-card-compact-footer">
                  <div className="groups-card-color-dots" aria-hidden>
                    <span className="groups-dot groups-dot--blue" /><span className="groups-dot groups-dot--red" /><span className="groups-dot groups-dot--slate" />
                  </div>
                  <button type="button" className="groups-card-edit-link">{t('groups.edit')}</button>
                </div>
              </div>
            ) : (
              <>
                <div className="groups-card-title-row">
                  <span className={`groups-card-tag groups-card-tag--${card.tag || 'default'}`}>
                    {t(`groups.${card.tagLabelKey}`)}
                  </span>
                  <span className="groups-card-rotation-dot">•</span>
                  <span className="groups-card-rotation">{t('groups.rotationStatus', { current: card.rotation.split('/')[0], total: 6 })}</span>
                </div>
                <div className="groups-card-preceptor-block">
                  <div className="groups-card-preceptor-avatar" />
                  <div className="groups-card-preceptor-info">
                    <p className="groups-card-preceptor-label">{t('groups.responsiblePreceptor')}</p>
                    <div className="groups-card-preceptor-name-row">
                      <span className="groups-card-preceptor-name">{card.preceptor}</span>
                      <button type="button" className="groups-card-swap-link">{t('groups.swap')}</button>
                    </div>
                  </div>
                </div>
                <div className="groups-card-hospital-box">
                  <div className="groups-card-hospital-box-header">
                    <span className="material-icons">business</span>
                    <span>{card.hospital}</span>
                  </div>
                  <div className="groups-progress-bar groups-progress-bar--sm" role="progressbar" aria-valuenow={card.progressPercent || 0} aria-valuemin={0} aria-valuemax={100}>
                    <div className="groups-progress-fill" style={{ width: `${card.progressPercent || 0}%` }} />
                  </div>
                </div>
                <div className="groups-card-students-row">
                  <span className="groups-card-students-label">{t('groups.studentsCount', { count: card.studentCount })}</span>
                  <button type="button" className="groups-card-view-list">{t('groups.viewStudentList')}</button>
                </div>
                <div className="groups-card-initials groups-card-initials--stack">
                  {card.initials.map((init, i) => (
                    <div
                      key={i}
                      className={`groups-initial groups-initial--${INITIAL_COLORS[i % INITIAL_COLORS.length]}`}
                      title={init}
                    >
                      {init}
                    </div>
                  ))}
                  <span className="groups-initial-extra">+{card.extraCount}</span>
                </div>
              </>
            )}
          </article>
        ))}
        <div className="groups-card groups-card--placeholder" aria-hidden>
          <span className="material-icons groups-card-placeholder-icon">groups</span>
          <p className="groups-card-placeholder-title">{t('groups.placeholderTitle')}</p>
          <p className="groups-card-placeholder-sub">{t('groups.placeholderSub')}</p>
        </div>
        <button type="button" className="groups-card groups-card--new" aria-label={t('groups.newGroup')}>
          <span className="groups-card-new-circle">
            <span className="material-icons">add</span>
          </span>
          <span className="groups-card-new-text">{t('groups.newGroup')}</span>
        </button>
      </div>

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
    </>
  )
}
