import { useState } from 'react'
import { useTranslation } from 'react-i18next'

const SPECIALTIES = [
  { value: '', labelKey: 'specialtyAll' },
  { value: 'clinica', labelKey: 'specialtyClinical' },
  { value: 'pediatria', labelKey: 'specialtyPediatrics' },
  { value: 'ginecologia', labelKey: 'specialtyGynecology' },
  { value: 'cirurgia', labelKey: 'specialtySurgery' },
]

const PRECEPTOR_ROWS = [
  { id: 1, name: 'Dr. André Martins', email: 'andre.martins@faculdade.edu', initials: 'AM', crm: '12345-SP', specialty: 'clinica', specialtyLabelKey: 'specialtyClinical', hospital: 'Hospital Sta. Maria', group: '04' },
  { id: 2, name: 'Dra. Camila Oliveira', email: 'camila.o@faculdade.edu', initials: 'CO', crm: '54321-SP', specialty: 'pediatria', specialtyLabelKey: 'specialtyPediatrics', hospital: 'Hosp. Geral Norte', group: '12' },
  { id: 3, name: 'Dr. Ricardo Ferreira', email: 'ricardo.f@faculdade.edu', initials: 'RF', crm: '98765-SP', specialty: 'cirurgia', specialtyLabelKey: 'specialtySurgery', hospital: 'Inst. Cardiovascular', group: '02' },
  { id: 4, name: 'Dra. Luísa Pereira', email: 'luisa.p@faculdade.edu', initials: 'LP', crm: '24680-SP', specialty: 'ginecologia', specialtyLabelKey: 'specialtyGynecology', hospital: 'Hospital Sta. Maria', group: '07' },
]

export default function Preceptors() {
  const { t } = useTranslation()
  const [search, setSearch] = useState('')
  const [filterSpecialty, setFilterSpecialty] = useState('')
  const [filterHospital, setFilterHospital] = useState('')
  return (
    <>
      <header className="preceptors-page-header">
        <div className="preceptors-header-text">
          <h1 className="preceptors-title">{t('preceptors.pageTitle')}</h1>
          <p className="preceptors-subtitle">{t('preceptors.subtitle')}</p>
        </div>
        <div className="preceptors-header-actions">
          <button type="button" className="dashboard-btn dashboard-btn--secondary">
            <span className="material-icons">download</span>
            {t('preceptors.export')}
          </button>
          <button type="button" className="dashboard-btn dashboard-btn--primary preceptors-btn-primary">
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
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            aria-label={t('preceptors.searchPlaceholder')}
          />
        </div>
        <div className="preceptors-filters">
          <select
            className="preceptors-select"
            value={filterSpecialty}
            onChange={(e) => setFilterSpecialty(e.target.value)}
            aria-label={t('preceptors.filterSpecialty')}
          >
            <option value="">{t('preceptors.filterSpecialty')}</option>
            {SPECIALTIES.filter((s) => s.value).map((s) => (
              <option key={s.value} value={s.value}>{t(`preceptors.${s.labelKey}`)}</option>
            ))}
          </select>
          <select
            className="preceptors-select"
            value={filterHospital}
            onChange={(e) => setFilterHospital(e.target.value)}
            aria-label={t('preceptors.filterHospital')}
          >
            <option value="">{t('preceptors.filterHospital')}</option>
            <option value="sta-maria">Hospital Sta. Maria</option>
            <option value="geral-norte">Hosp. Geral Norte</option>
          </select>
        </div>
      </section>

      <div className="preceptors-table-card">
        <div className="preceptors-table-wrap">
          <table className="preceptors-table">
            <thead>
              <tr>
                <th className="preceptors-th">{t('preceptors.columnName')}</th>
                <th className="preceptors-th">{t('preceptors.columnCrm')}</th>
                <th className="preceptors-th">{t('preceptors.columnSpecialty')}</th>
                <th className="preceptors-th">{t('preceptors.columnHospital')}</th>
                <th className="preceptors-th">{t('preceptors.columnGroup')}</th>
                <th className="preceptors-th preceptors-th--actions">{t('preceptors.columnActions')}</th>
              </tr>
            </thead>
            <tbody>
              {PRECEPTOR_ROWS.map((row) => (
                <tr key={row.id} className="preceptors-tr">
                  <td className="preceptors-td">
                    <div className="preceptors-name-cell">
                      <div className="preceptors-avatar">{row.initials}</div>
                      <div>
                        <div className="preceptors-name">{row.name}</div>
                        <div className="preceptors-email">{row.email}</div>
                      </div>
                    </div>
                  </td>
                  <td className="preceptors-td preceptors-td--crm">{row.crm}</td>
                  <td className="preceptors-td">
                    <span className={`preceptors-pill preceptors-pill--${row.specialty}`}>
                      {t(`preceptors.${row.specialtyLabelKey}`)}
                    </span>
                  </td>
                  <td className="preceptors-td preceptors-td--hospital">{row.hospital}</td>
                  <td className="preceptors-td">
                    <span className="preceptors-group-badge">{row.group}</span>
                  </td>
                  <td className="preceptors-td preceptors-td--actions">
                    <div className="preceptors-actions">
                      <button type="button" className="preceptors-action-btn" aria-label={t('students.edit')}>
                        <span className="material-icons">edit</span>
                      </button>
                      <button type="button" className="preceptors-action-btn preceptors-action-btn--danger" aria-label={t('students.delete')}>
                        <span className="material-icons">delete_outline</span>
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="preceptors-pagination">
          <p className="preceptors-pagination-text">
            {t('preceptors.paginationShowing', { from: 1, to: 4, total: 42 })}
          </p>
          <div className="preceptors-pagination-controls">
            <button type="button" className="preceptors-page-btn preceptors-page-btn--arrow" aria-label={t('dashboard.prevPage')}>
              <span className="material-icons">chevron_left</span>
            </button>
            <button type="button" className="preceptors-page-btn preceptors-page-btn--active">1</button>
            <button type="button" className="preceptors-page-btn">2</button>
            <button type="button" className="preceptors-page-btn">3</button>
            <span className="preceptors-page-ellipsis">...</span>
            <button type="button" className="preceptors-page-btn">11</button>
            <button type="button" className="preceptors-page-btn preceptors-page-btn--arrow" aria-label={t('dashboard.nextPage')}>
              <span className="material-icons">chevron_right</span>
            </button>
          </div>
        </div>
      </div>

      <div className="preceptors-stats">
        <div className="preceptors-stat-card">
          <div className="preceptors-stat-icon preceptors-stat-icon--blue">
            <span className="material-icons">person</span>
          </div>
          <div>
            <p className="preceptors-stat-label">{t('preceptors.statTotal')}</p>
            <p className="preceptors-stat-value">42</p>
          </div>
        </div>
        <div className="preceptors-stat-card">
          <div className="preceptors-stat-icon preceptors-stat-icon--green">
            <span className="material-icons">domain</span>
          </div>
          <div>
            <p className="preceptors-stat-label">{t('preceptors.statHospitals')}</p>
            <p className="preceptors-stat-value">08</p>
          </div>
        </div>
        <div className="preceptors-stat-card">
          <div className="preceptors-stat-icon preceptors-stat-icon--purple">
            <span className="material-icons">group_work</span>
          </div>
          <div>
            <p className="preceptors-stat-label">{t('preceptors.statGroups')}</p>
            <p className="preceptors-stat-value">18/18</p>
          </div>
        </div>
      </div>
    </>
  )
}
