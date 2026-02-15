import { useState } from 'react'
import { useTranslation } from 'react-i18next'

const VIEW_GRID = 'grid'
const VIEW_LIST = 'list'

const HOSPITAL_CARDS = [
  {
    id: 1,
    name: 'Hospital Central Municipal',
    address: 'Rua das Flores, 123 - Centro, São Paulo',
    status: 'active',
    tag: 'REFERÊNCIA TRAUMATOLOGIA',
    directorName: 'Dr. André Martins',
    directorEmail: 'andre.m@hcm.com.br',
    directorInitials: 'AM',
    allocationCurrent: 24,
    allocationTotal: 30,
    allocationNoteKey: 'allocationGroups',
    allocationNoteParams: { count: 4 },
    allocationVariant: 'primary',
    rotations: ['Clínica Médica', 'Cirurgia Geral', 'Pediatria', 'Emergência'],
    documentName: 'Convenio_HCM_2024_V2.pdf',
    hasWarning: false,
  },
  {
    id: 2,
    name: 'Instituto Santa Cecília',
    address: 'Av. Paulista, 1000 - Bela Vista, São Paulo',
    status: 'expiring',
    tag: 'MATERNO INFANTIL',
    directorName: 'Dra. Carla Pires',
    directorEmail: 'carla.pires@stacecilia.org',
    directorInitials: 'CP',
    allocationCurrent: 14,
    allocationTotal: 15,
    allocationNoteKey: 'allocationCapacity',
    allocationVariant: 'amber',
    rotations: ['Ginecologia e Obstetrícia', 'Neonatologia'],
    documentName: null,
    hasWarning: true,
    warningKey: 'renewalPending',
    warningParams: { days: 15 },
  },
  {
    id: 3,
    name: 'Clínica de Saúde da Família Norte',
    address: 'Praça da Paz, 45 - Santana, São Paulo',
    status: 'active',
    tag: 'ATENÇÃO PRIMÁRIA',
    directorName: 'Dr. Jorge Mendes',
    directorEmail: 'jorge.m@csfnorte.gov.br',
    directorInitials: 'JM',
    allocationCurrent: 8,
    allocationTotal: 20,
    allocationNoteKey: 'allocationAvailable',
    allocationVariant: 'primary',
    rotations: ['Medicina de Família', 'Saúde Comunitária'],
    documentName: 'Parceria_SUS_2024.pdf',
    hasWarning: false,
  },
]

export default function Hospitals() {
  const { t } = useTranslation()
  const [search, setSearch] = useState('')
  const [view, setView] = useState(VIEW_GRID)

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
          <button type="button" className="dashboard-btn dashboard-btn--primary hospitals-btn-primary">
            <span className="material-icons">add</span>
            {t('hospitals.newHospital')}
          </button>
        </div>
      </header>

      <div className="hospitals-stats">
        <div className="hospitals-stat-card">
          <p className="hospitals-stat-label">{t('hospitals.statActive')}</p>
          <div className="hospitals-stat-row">
            <h3 className="hospitals-stat-value">12</h3>
            <span className="hospitals-stat-badge hospitals-stat-badge--success">+2 este mês</span>
          </div>
        </div>
        <div className="hospitals-stat-card">
          <p className="hospitals-stat-label">{t('hospitals.statStudents')}</p>
          <div className="hospitals-stat-row">
            <h3 className="hospitals-stat-value">342</h3>
            <span className="hospitals-stat-muted">85% ocupação</span>
          </div>
        </div>
        <div className="hospitals-stat-card">
          <p className="hospitals-stat-label">{t('hospitals.statExpiring')}</p>
          <div className="hospitals-stat-row">
            <h3 className="hospitals-stat-value hospitals-stat-value--amber">3</h3>
            <span className="hospitals-stat-badge hospitals-stat-badge--amber">{t('hospitals.statExpiringNext')}</span>
          </div>
        </div>
        <div className="hospitals-stat-card">
          <p className="hospitals-stat-label">{t('hospitals.statRotations')}</p>
          <div className="hospitals-stat-row">
            <h3 className="hospitals-stat-value">08</h3>
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
        {HOSPITAL_CARDS.map((card) => (
          <article key={card.id} className="hospitals-card">
            <div className="hospitals-card-body">
              <div className="hospitals-card-head">
                <div className="hospitals-card-info">
                  <div className="hospitals-card-logo">
                    <span className="material-icons">local_hospital</span>
                  </div>
                  <div>
                    <h3 className="hospitals-card-name">{card.name}</h3>
                    <p className="hospitals-card-address">
                      <span className="material-icons hospitals-card-pin">location_on</span>
                      {card.address}
                    </p>
                    <div className="hospitals-card-badges">
                      <span className={`hospitals-badge hospitals-badge--${card.status}`}>
                        {card.status === 'active' ? t('hospitals.badgeActive') : t('hospitals.badgeExpiring')}
                      </span>
                      <span className="hospitals-badge hospitals-badge--tag">{card.tag}</span>
                    </div>
                  </div>
                </div>
                <button type="button" className="hospitals-card-menu" aria-label={t('dashboard.actions')}>
                  <span className="material-icons">more_vert</span>
                </button>
              </div>

              <div className="hospitals-card-details">
                <div>
                  <p className="hospitals-detail-label">{t('hospitals.director')}</p>
                  <div className="hospitals-director">
                    <span className="hospitals-director-avatar">{card.directorInitials}</span>
                    <div>
                      <p className="hospitals-director-name">{card.directorName}</p>
                      <p className="hospitals-director-email">{card.directorEmail}</p>
                    </div>
                  </div>
                </div>
                <div>
                  <p className="hospitals-detail-label">{t('hospitals.allocation')}</p>
                  <div className="hospitals-allocation-row">
                    <div className="hospitals-allocation-bar">
                      <div
                        className={`hospitals-allocation-fill hospitals-allocation-fill--${card.allocationVariant}`}
                        style={{ width: `${(card.allocationCurrent / card.allocationTotal) * 100}%` }}
                      />
                    </div>
                    <span className="hospitals-allocation-text">
                      {card.allocationCurrent}/{card.allocationTotal}
                    </span>
                  </div>
                  <p className={`hospitals-allocation-note hospitals-allocation-note--${card.allocationVariant}`}>
                    {card.allocationNoteParams
                      ? t(`hospitals.${card.allocationNoteKey}`, card.allocationNoteParams)
                      : t(`hospitals.${card.allocationNoteKey}`)}
                  </p>
                </div>
              </div>

              <div className="hospitals-rotations">
                <p className="hospitals-detail-label">{t('hospitals.rotationsAvailable')}</p>
                <div className="hospitals-rotations-tags">
                  {card.rotations.map((r) => (
                    <span key={r} className="hospitals-rotation-tag">
                      {r}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            <div className="hospitals-card-footer">
              <div className="hospitals-footer-left">
                {card.hasWarning ? (
                  <>
                    <span className="material-icons hospitals-footer-warning">warning</span>
                    <span className="hospitals-footer-text">
                      {t(`hospitals.${card.warningKey}`, card.warningParams)}
                    </span>
                  </>
                ) : (
                  <>
                    <span className="material-icons hospitals-footer-doc">description</span>
                    <span className="hospitals-footer-text">{card.documentName}</span>
                  </>
                )}
              </div>
              <div className="hospitals-footer-actions">
                <button type="button" className="hospitals-footer-link">
                  {t('hospitals.viewDocuments')}
                </button>
                <span className="hospitals-footer-sep">|</span>
                <button type="button" className="hospitals-footer-link">
                  {t('hospitals.attachNew')}
                </button>
              </div>
            </div>
          </article>
        ))}

        <button type="button" className="hospitals-card hospitals-card--add">
          <div className="hospitals-add-icon">
            <span className="material-icons">add_business</span>
          </div>
          <h3 className="hospitals-add-title">{t('hospitals.addNewHospital')}</h3>
          <p className="hospitals-add-desc">{t('hospitals.addNewHospitalDesc')}</p>
        </button>
      </div>

      <div className="hospitals-pagination">
        <p className="hospitals-pagination-text">
          {t('hospitals.paginationShowing', { showing: 3, total: 12 })}
        </p>
        <div className="hospitals-pagination-controls">
          <button type="button" className="hospitals-pagination-btn" disabled>
            {t('hospitals.prev')}
          </button>
          <button type="button" className="hospitals-pagination-btn hospitals-pagination-btn--active">
            1
          </button>
          <button type="button" className="hospitals-pagination-btn">
            2
          </button>
          <button type="button" className="hospitals-pagination-btn">
            3
          </button>
          <button type="button" className="hospitals-pagination-btn">
            {t('hospitals.next')}
          </button>
        </div>
      </div>

      <aside className="hospitals-map-float" aria-label={t('hospitals.mapTitle')}>
        <div className="hospitals-map-card">
          <div className="hospitals-map-head">
            <span className="hospitals-map-title">{t('hospitals.mapTitle')}</span>
            <span className="material-icons hospitals-map-open">open_in_new</span>
          </div>
          <div className="hospitals-map-preview">
            <div className="hospitals-map-pin">
              <span className="material-icons">location_on</span>
            </div>
          </div>
          <p className="hospitals-map-hint">{t('hospitals.mapHint')}</p>
        </div>
      </aside>
    </>
  )
}
