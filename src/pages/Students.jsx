import { useState } from 'react'
import { useTranslation } from 'react-i18next'

const ROTATIONS = [
  { value: '', labelKey: 'all' },
  { value: 'clinica', labelKey: 'rotationClinical' },
  { value: 'pediatria', labelKey: 'rotationPediatrics' },
  { value: 'urgencia', labelKey: 'rotationEmergency' },
]

const STUDENT_ROWS = [
  { id: 1, name: 'Ana Alice Oliveira', ra: '20260452', initials: 'AA', group: 'G-04', rotation: 'clinica', rotationLabelKey: 'rotationClinical', status: 'active' },
  { id: 2, name: 'Bruno Pereira', ra: '20260812', initials: 'BP', group: 'G-04', rotation: 'clinica', rotationLabelKey: 'rotationClinical', status: 'active' },
  { id: 3, name: 'Carla Martins', ra: '20260129', initials: 'CM', group: 'G-02', rotation: 'pediatria', rotationLabelKey: 'rotationPediatrics', status: 'pending' },
  { id: 4, name: 'Daniel Souza', ra: '20260994', initials: 'DS', group: 'G-02', rotation: 'pediatria', rotationLabelKey: 'rotationPediatrics', status: 'active' },
  { id: 5, name: 'Fabiana Lima', ra: '20260112', initials: 'FL', group: 'G-01', rotation: 'urgencia', rotationLabelKey: 'rotationEmergency', status: 'absent' },
]

export default function Students() {
  const { t } = useTranslation()
  const [search, setSearch] = useState('')
  const [filterGroup, setFilterGroup] = useState('')
  const [filterRotation, setFilterRotation] = useState('')
  const totalStudents = 180
  const pageSize = 5
  const currentPage = 1
  const totalPages = 36

  return (
    <>
      <div className="students-page-actions">
        <button type="button" className="dashboard-btn dashboard-btn--secondary">
          <span className="material-icons">cloud_upload</span>
          {t('students.importSpreadsheet')}
        </button>
        <button type="button" className="dashboard-btn dashboard-btn--primary">
          <span className="material-icons">person_add</span>
          {t('students.registerStudent')}
        </button>
      </div>
      <section className="students-section">
        <div className="students-toolbar">
          <div className="students-search-wrap">
            <span className="material-icons students-search-icon">search</span>
            <input
              type="search"
              className="students-search"
              placeholder={t('students.searchPlaceholder')}
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              aria-label={t('students.searchPlaceholder')}
            />
          </div>
          <div className="students-filters">
            <div className="students-filter-wrap">
              <label htmlFor="filter-group" className="students-filter-label">{t('students.filterGroup')}</label>
              <select
                id="filter-group"
                className="students-filter-select"
                value={filterGroup}
                onChange={(e) => setFilterGroup(e.target.value)}
                aria-label={t('students.filterGroup')}
              >
                <option value="">{t('students.filterAll')}</option>
                {['G-01', 'G-02', 'G-03', 'G-04'].map((g) => (
                  <option key={g} value={g}>{g}</option>
                ))}
              </select>
            </div>
            <div className="students-filter-wrap">
              <label htmlFor="filter-rotation" className="students-filter-label">{t('students.filterRotation')}</label>
              <select
                id="filter-rotation"
                className="students-filter-select"
                value={filterRotation}
                onChange={(e) => setFilterRotation(e.target.value)}
                aria-label={t('students.filterRotation')}
              >
                {ROTATIONS.map((r) => (
                  <option key={r.value || 'all'} value={r.value}>{t(`students.${r.labelKey}`)}</option>
                ))}
              </select>
            </div>
          </div>
          <p className="students-count">{t('students.found', { count: totalStudents })}</p>
        </div>

        <div className="students-table-wrap">
          <table className="students-table">
            <thead>
              <tr>
                <th>{t('students.columnStudent')}</th>
                <th>{t('students.columnRA')}</th>
                <th>{t('students.columnGroup')}</th>
                <th>{t('students.columnRotation')}</th>
                <th>{t('students.columnStatus')}</th>
                <th>{t('students.columnActions')}</th>
              </tr>
            </thead>
            <tbody>
              {STUDENT_ROWS.map((row) => (
                <tr key={row.id}>
                  <td>
                    <div className="students-cell-student">
                      <div className={`dashboard-avatar dashboard-avatar--${row.status === 'active' ? 'blue' : row.status === 'pending' ? 'orange' : 'red'}`}>
                        {row.initials}
                      </div>
                      <span className="students-cell-name">{row.name}</span>
                    </div>
                  </td>
                  <td className="students-cell-ra">{row.ra}</td>
                  <td className="students-cell-group">{row.group}</td>
                  <td>{t(`students.${row.rotationLabelKey}`)}</td>
                  <td>
                    <span className={`students-status students-status--${row.status}`}>
                      {t(`students.status.${row.status}`)}
                    </span>
                  </td>
                  <td>
                    <div className="students-actions">
                      <button type="button" className="students-action-btn" aria-label={t('students.edit')}>
                        <span className="material-icons">edit</span>
                      </button>
                      <button type="button" className="students-action-btn" aria-label={t('students.delete')}>
                        <span className="material-icons">delete</span>
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="students-pagination">
          <p className="students-pagination-info">
            {t('students.paginationShowing', { from: 1, to: pageSize, total: totalStudents })}
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

        <div className="students-import-tip">
          <span className="material-icons students-import-tip-icon">info</span>
          <div>
            <p className="students-import-tip-title">{t('students.importTipTitle')}</p>
            <p className="students-import-tip-text">{t('students.importTipText')}</p>
            <a href="#" className="students-import-tip-link" onClick={(e) => e.preventDefault()}>
              {t('students.downloadTemplate')}
            </a>
          </div>
        </div>
      </section>
    </>
  )
}
