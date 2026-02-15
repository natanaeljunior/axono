import { useTranslation } from 'react-i18next'

const ROTATION_STATUS = [
  { key: 'surgery', nameKey: 'rotationSurgery', status: 'completed', preceptor: 'Dr. Roberto Mendonça', hours: '480/480h', freq: '100%', grade: '9.5' },
  { key: 'clinical', nameKey: 'rotationClinical', status: 'completed', preceptor: 'Dra. Amanda Castro', hours: '480/480h', freq: '98%', grade: '8.8' },
  { key: 'gyneco', nameKey: 'rotationGyneco', status: 'current', preceptor: 'Dr. Fernando Costa', hours: '220/480h', extra: 'Plantões: 08/12' },
  { key: 'pediatrics', nameKey: 'rotationPediatrics', status: 'pending', hours: '0/480h', allocation: true },
  { key: 'aps', nameKey: 'rotationAps', status: 'pending', hours: '0/480h', allocation: true },
  { key: 'emergency', nameKey: 'rotationEmergency', status: 'pending', hours: '0/400h', allocation: true },
]

const SIGNATURES = [
  { module: 'Cirurgia Geral', preceptor: 'Dr. Roberto Mendonça', status: 'digitalized', crm: 'CRM-SP 123456', date: '12/03/2024' },
  { module: 'Clínica Médica', preceptor: 'Dra. Amanda Castro', status: 'digitalized', crm: 'CRM-SP 654321', date: '05/06/2024' },
  { module: 'Gineco e Obstetrícia', preceptor: 'Dr. Fernando Costa', status: 'pending', crm: 'Aguardando...', date: '---' },
]

export default function StudentReportsCertification() {
  const { t } = useTranslation()

  return (
    <div className="student-cert-layout">
      <header className="student-cert-header">
        <div>
          <h1 className="student-cert-title">{t('studentCert.pageTitle')}</h1>
          <p className="student-cert-subtitle">{t('studentCert.sectionTitle')}</p>
        </div>
        <div className="student-cert-user">
          <span className="student-cert-user-name">Dr. Lucas Silva Ferreira</span>
          <span className="student-cert-user-ra">RA: 2021004589 • 12º Semestre</span>
        </div>
      </header>

      <div className="student-cert-top">
        <div className="student-cert-progress-card">
          <h3 className="student-cert-progress-title">{t('studentCert.generalProgress')}</h3>
          <p className="student-cert-progress-desc">{t('studentCert.generalProgressDesc')}</p>
          <div className="student-cert-progress-bar-wrap">
            <div className="student-cert-progress-bar">
              <div className="student-cert-progress-fill" style={{ width: '83.5%' }} />
            </div>
            <p className="student-cert-progress-value">2.340 / 2.800h</p>
          </div>
          <div className="student-cert-progress-timeline">
            <span>{t('studentCert.start')}: JAN 2023</span>
            <span>{t('studentCert.forecast')}: DEZ 2024</span>
          </div>
        </div>
        <div className="student-cert-cert-card">
          <span className="material-icons student-cert-cert-icon">check_circle</span>
          <p className="student-cert-cert-text">{t('studentCert.certificateText')}</p>
          <button type="button" className="dashboard-btn dashboard-btn--primary">
            <span className="material-icons">picture_as_pdf</span>
            {t('studentCert.generatePdf')}
          </button>
        </div>
      </div>

      <section className="student-cert-rotations">
        <div className="student-cert-rotations-head">
          <h3 className="student-cert-rotations-title">{t('studentCert.rotationStatus')}</h3>
          <div className="student-cert-rotations-actions">
            <button type="button" className="student-cert-rotations-btn">{t('studentCert.exportLogs')}</button>
            <button type="button" className="student-cert-rotations-btn">{t('studentCert.viewCalendar')}</button>
          </div>
        </div>
        <div className="student-cert-rotations-grid">
          {ROTATION_STATUS.map((r) => (
            <div key={r.key} className={`student-cert-rotation-card student-cert-rotation-card--${r.status}`}>
              <div className="student-cert-rotation-icon">
                <span className="material-icons">medical_services</span>
              </div>
              <h4 className="student-cert-rotation-name">{t(`studentCert.${r.nameKey}`)}</h4>
              <div className="student-cert-rotation-badges">
                <span className={`student-cert-rotation-badge student-cert-rotation-badge--${r.status}`}>
                  {r.status === 'completed' ? t('studentCert.completed') : r.status === 'current' ? t('studentCert.current') : t('studentCert.pending')}
                </span>
                {r.status === 'current' && <span className="student-cert-rotation-badge student-cert-rotation-badge--inprogress">{t('studentCert.inProgress')}</span>}
              </div>
              {r.preceptor && <p className="student-cert-rotation-preceptor">{r.preceptor}</p>}
              {r.allocation && <p className="student-cert-rotation-allocation">{t('studentCert.allocationPending')}</p>}
              <p className="student-cert-rotation-hours">{r.hours}</p>
              {r.freq && <p className="student-cert-rotation-freq">{t('studentCert.frequency')}: {r.freq}</p>}
              {r.grade && <p className="student-cert-rotation-grade">{t('studentCert.finalGrade')}: {r.grade}</p>}
              {r.extra && <p className="student-cert-rotation-extra">{r.extra}</p>}
              {r.status === 'completed' && <a href="#" className="student-cert-rotation-link">{t('studentCert.viewDetailedReport')}</a>}
              {r.status === 'current' && <button type="button" className="student-cert-rotation-btn">{t('studentCert.launchActivities')}</button>}
              {r.status === 'pending' && r.allocation && <button type="button" className="student-cert-rotation-btn student-cert-rotation-btn--disabled" disabled>{t('studentCert.unavailable')}</button>}
            </div>
          ))}
        </div>
      </section>

      <section className="student-cert-signatures">
        <h3 className="student-cert-signatures-title">{t('studentCert.legalVerification')}</h3>
        <p className="student-cert-signatures-desc">{t('studentCert.legalVerificationDesc')}</p>
        <button type="button" className="student-cert-secure-btn">
          <span className="material-icons">lock</span>
          {t('studentCert.secureDoc')}
        </button>
        <div className="student-cert-table-wrap">
          <table className="student-cert-table">
            <thead>
              <tr>
                <th>{t('studentCert.tableModule')}</th>
                <th>{t('studentCert.tablePreceptor')}</th>
                <th>{t('studentCert.tableSignature')}</th>
                <th>{t('studentCert.tableStamp')}</th>
                <th>{t('studentCert.tableDate')}</th>
              </tr>
            </thead>
            <tbody>
              {SIGNATURES.map((s, i) => (
                <tr key={i}>
                  <td>{s.module}</td>
                  <td>{s.preceptor}</td>
                  <td><span className={s.status === 'digitalized' ? 'student-cert-status-ok' : 'student-cert-status-pending'}>{s.status === 'digitalized' ? t('studentCert.digitalized') : t('studentCert.pending')}</span></td>
                  <td>{s.crm}</td>
                  <td>{s.date}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="student-cert-footer-note">{t('studentCert.icpNote')}</p>
      </section>
    </div>
  )
}
