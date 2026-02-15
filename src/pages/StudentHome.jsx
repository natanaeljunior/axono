import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'

export default function StudentHome() {
  const { t } = useTranslation()

  return (
    <div className="student-home">
      <header className="student-home-header">
        <h1 className="student-home-title">{t('studentHome.title')}</h1>
        <p className="student-home-subtitle">{t('studentHome.subtitle')}</p>
      </header>

      <section className="student-home-cards">
        <div className="student-home-card student-home-card--highlight">
          <span className="material-icons student-home-card-icon">group</span>
          <div>
            <h2 className="student-home-card-label">{t('studentHome.myGroup')}</h2>
            <p className="student-home-card-value">G-04</p>
          </div>
        </div>
        <div className="student-home-card">
          <span className="material-icons student-home-card-icon">local_hospital</span>
          <div>
            <h2 className="student-home-card-label">{t('studentHome.currentRotation')}</h2>
            <p className="student-home-card-value">{t('studentForm.rotationName')}</p>
            <p className="student-home-card-meta">{t('studentForm.rotationPlace')}</p>
          </div>
        </div>
        <div className="student-home-card">
          <span className="material-icons student-home-card-icon">calendar_today</span>
          <div>
            <h2 className="student-home-card-label">{t('studentHome.presenceThisMonth')}</h2>
            <div className="student-home-presence-bar-wrap">
              <div className="student-home-presence-bar" role="progressbar" aria-valuenow={92} aria-valuemin={0} aria-valuemax={100}>
                <div className="student-home-presence-fill" style={{ width: '92%' }} />
              </div>
              <span className="student-home-presence-pct">92%</span>
            </div>
          </div>
        </div>
      </section>

      <section className="student-home-actions">
        <Link to="/dashboard/formulario-diario" className="student-home-btn student-home-btn--primary">
          <span className="material-icons">edit_note</span>
          {t('studentHome.newDailyRecord')}
        </Link>
        <Link to="/dashboard/certificacao" className="student-home-btn student-home-btn--secondary">
          <span className="material-icons">description</span>
          {t('studentHome.reportsCertification')}
        </Link>
      </section>
    </div>
  )
}
