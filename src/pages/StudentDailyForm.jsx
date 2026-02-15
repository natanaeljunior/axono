import { useState } from 'react'
import { useTranslation } from 'react-i18next'

const COMPETENCIES = [
  { key: 'anamnese', labelKey: 'competencyAnamnese' },
  { key: 'raciocinio', labelKey: 'competencyRaciocinio' },
  { key: 'prescricao', labelKey: 'competencyPrescricao' },
  { key: 'interpretacao', labelKey: 'competencyInterpretacao' },
  { key: 'procedimentos', labelKey: 'competencyProcedimentos' },
  { key: 'relacionamento', labelKey: 'competencyRelacionamento' },
]

const LAST_RECORDS = [
  { date: 'Ontem, 15 Out', description: 'Plantão 12h', status: 'validated' },
  { date: '14 Out', description: 'Ambulatório 6h', status: 'pending' },
]

export default function StudentDailyForm() {
  const { t } = useTranslation()
  const [date, setDate] = useState('2023-10-16')
  const [entry, setEntry] = useState('07:00')
  const [exit, setExit] = useState('19:00')
  const [activities, setActivities] = useState('')
  const [competencies, setCompetencies] = useState({})
  const toggleCompetency = (key) => setCompetencies((prev) => ({ ...prev, [key]: !prev[key] }))

  return (
    <div className="student-form-layout">
      <aside className="student-form-sidebar">
        <div className="student-form-rotation-card">
          <h4 className="student-form-rotation-title">{t('studentForm.rotationName')}</h4>
          <p className="student-form-rotation-place">{t('studentForm.rotationPlace')}</p>
        </div>
        <div className="student-form-progress-card">
          <h4 className="student-form-progress-title">{t('studentForm.progressTitle')}</h4>
          <div className="student-form-progress-bar">
            <div className="student-form-progress-fill" style={{ width: '40%' }} />
          </div>
          <p className="student-form-progress-text">128h / 320h</p>
          <div className="student-form-progress-meta">
            <div className="student-form-progress-meta-item">
              <span className="student-form-progress-meta-label">{t('studentForm.week')}</span>
              <span className="student-form-progress-meta-value">4 de 8</span>
            </div>
            <div className="student-form-progress-meta-item">
              <span className="student-form-progress-meta-label">{t('studentForm.remaining')}</span>
              <span className="student-form-progress-meta-value">192h</span>
            </div>
          </div>
        </div>
        <div className="student-form-last-card">
          <h4 className="student-form-last-title">
            <span className="material-icons">event</span>
            {t('studentForm.lastRecords')}
          </h4>
          <ul className="student-form-last-list">
            {LAST_RECORDS.map((r, i) => (
              <li key={i} className="student-form-last-item">
                <div className="student-form-last-date">{r.date}</div>
                <div className="student-form-last-desc">{r.description}</div>
                <span className={`student-form-last-status student-form-last-status--${r.status}`}>
                  {r.status === 'validated' ? t('studentForm.validated') : t('studentForm.pending')}
                </span>
              </li>
            ))}
          </ul>
          <a href="#" className="student-form-last-link">{t('studentForm.viewFullHistory')}</a>
        </div>
      </aside>

      <main className="student-form-main">
        <header className="student-form-header">
          <div>
            <h1 className="student-form-page-title">{t('studentForm.pageTitle')}</h1>
            <p className="student-form-page-subtitle">{t('studentForm.pageSubtitle')}</p>
          </div>
          <span className="student-form-session-badge">
            <span className="student-form-session-dot" />
            {t('studentForm.activeSession')}
          </span>
        </header>

        <form className="student-form-form">
          <section className="student-form-section">
            <h3 className="student-form-section-title">{t('studentForm.generalInfo')}</h3>
            <div className="student-form-row">
              <label className="student-form-label">{t('studentForm.serviceDate')}</label>
              <div className="student-form-input-wrap">
                <input type="date" className="student-form-input" value={date} onChange={(e) => setDate(e.target.value)} />
                <span className="material-icons student-form-input-icon">calendar_today</span>
              </div>
            </div>
            <div className="student-form-row">
              <label className="student-form-label">{t('studentForm.preceptorOfDay')}</label>
              <div className="student-form-input-wrap student-form-input-wrap--search">
                <span className="material-icons student-form-search-icon">search</span>
                <input type="text" className="student-form-input" placeholder={t('studentForm.searchPreceptor')} />
              </div>
            </div>
          </section>

          <section className="student-form-section">
            <h3 className="student-form-section-title">{t('studentForm.shiftHours')}</h3>
            <div className="student-form-grid-2">
              <div className="student-form-row">
                <label className="student-form-label">{t('studentForm.entry')}</label>
                <div className="student-form-input-wrap">
                  <input type="time" className="student-form-input" value={entry} onChange={(e) => setEntry(e.target.value)} />
                  <span className="material-icons student-form-input-icon">schedule</span>
                </div>
              </div>
              <div className="student-form-row">
                <label className="student-form-label">{t('studentForm.exit')}</label>
                <div className="student-form-input-wrap">
                  <input type="time" className="student-form-input" value={exit} onChange={(e) => setExit(e.target.value)} />
                  <span className="material-icons student-form-input-icon">schedule</span>
                </div>
              </div>
            </div>
            <div className="student-form-row">
              <label className="student-form-label">{t('studentForm.workloadAuto')}</label>
              <div className="student-form-workload">12 {t('studentForm.hours')}</div>
            </div>
          </section>

          <section className="student-form-section">
            <h3 className="student-form-section-title">{t('studentForm.activitiesRegister')}</h3>
            <textarea
              className="student-form-textarea"
              placeholder={t('studentForm.activitiesPlaceholder')}
              value={activities}
              onChange={(e) => setActivities(e.target.value)}
              rows={5}
            />
          </section>

          <section className="student-form-section">
            <h3 className="student-form-section-title">{t('studentForm.competencies')}</h3>
            <div className="student-form-competencies">
              {COMPETENCIES.map((c) => (
                <label key={c.key} className="student-form-checkbox">
                  <input type="checkbox" checked={!!competencies[c.key]} onChange={() => toggleCompetency(c.key)} />
                  <span>{t(`studentForm.${c.labelKey}`)}</span>
                </label>
              ))}
            </div>
          </section>

          <div className="student-form-actions">
            <button type="button" className="student-form-btn student-form-btn--secondary">{t('studentForm.saveDraft')}</button>
            <button type="submit" className="student-form-btn student-form-btn--primary">
              <span className="material-icons">send</span>
              {t('studentForm.finalize')}
            </button>
          </div>

          <div className="student-form-reminder">
            <span className="material-icons student-form-reminder-icon">info</span>
            <div>
              <h4 className="student-form-reminder-title">{t('studentForm.reminderTitle')}</h4>
              <p className="student-form-reminder-text">{t('studentForm.reminderText')}</p>
            </div>
          </div>
        </form>
      </main>
    </div>
  )
}
