import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import './StudentHome.css'

const RECENT_ACTIVITIES = [
  {
    id: 1,
    icon: 'check_circle',
    iconBg: 'green',
    title: 'Registro de Presença validado',
    detail: 'Ontem às 18:30 • Clínica Médica',
    timeAgo: 'Há 1d',
  },
  {
    id: 2,
    icon: 'edit_note',
    iconBg: 'yellow',
    title: 'Aguardando assinatura do tutor',
    detail: '14 Out • Ambulatório de Especialidades',
    timeAgo: 'Há 2d',
  },
]

export default function StudentHome() {
  const { t } = useTranslation()

  return (
    <div className="student-home-new">
      <header className="student-home-new-header">
        <h1 className="student-home-new-title">{t('studentHome.title', 'Início')}</h1>
        <p className="student-home-new-subtitle">
          {t('studentHome.subtitle', 'Resumo do seu grupo, rotação atual e presença do mês.')}
        </p>
      </header>

      <section className="student-home-new-cards">
        <div className="student-home-new-card">
          <div className="student-home-new-card-header">
            <span className="material-icons student-home-new-card-icon student-home-new-card-icon--blue">groups</span>
            <span className="student-home-new-card-label">{t('studentHome.myGroup', 'MEU GRUPO')}</span>
          </div>
          <p className="student-home-new-card-value">G-04</p>
          <p className="student-home-new-card-meta">{t('studentHome.activeMembers', '6 Integrantes ativos')}</p>
        </div>

        <div className="student-home-new-card">
          <div className="student-home-new-card-header">
            <span className="material-icons student-home-new-card-icon student-home-new-card-icon--blue">medical_services</span>
            <span className="student-home-new-card-label">{t('studentHome.currentRotation', 'ROTAÇÃO ATUAL')}</span>
          </div>
          <p className="student-home-new-card-value">{t('studentForm.rotationName', 'Clínica Médica')}</p>
          <p className="student-home-new-card-meta">{t('studentForm.rotationPlace', 'Hospital das Clínicas (HCFMUSP)')}</p>
        </div>

        <div className="student-home-new-card">
          <div className="student-home-new-card-header">
            <span className="material-icons student-home-new-card-icon student-home-new-card-icon--green">calendar_today</span>
            <span className="student-home-new-card-label">{t('studentHome.presenceThisMonth', 'PRESENÇA DO MÊS')}</span>
          </div>
          <p className="student-home-new-card-value student-home-new-card-value--big">92%</p>
          <div className="student-home-new-presence-bar">
            <div className="student-home-new-presence-fill" style={{ width: '92%' }} />
          </div>
        </div>
      </section>

      <section className="student-home-new-actions">
        <Link to="/dashboard/formulario-diario" className="student-home-new-btn student-home-new-btn--primary">
          <span className="material-icons">edit_note</span>
          {t('studentHome.newDailyRecord', 'Novo registro diário')}
        </Link>
        <Link to="/dashboard/certificacao" className="student-home-new-btn student-home-new-btn--secondary">
          <span className="material-icons">description</span>
          {t('studentHome.reportsCertification', 'Relatórios e Certificação')}
        </Link>
      </section>

      <div className="student-home-new-content-grid">
        <section className="student-home-new-activity">
          <h2 className="student-home-new-activity-title">
            <span className="material-icons">schedule</span>
            {t('studentHome.recentActivity', 'Atividade Recente')}
          </h2>
          <ul className="student-home-new-activity-list">
            {RECENT_ACTIVITIES.map((item) => (
              <li key={item.id} className="student-home-new-activity-item">
                <div className={`student-home-new-activity-icon student-home-new-activity-icon--${item.iconBg}`}>
                  <span className="material-icons">{item.icon}</span>
                </div>
                <div className="student-home-new-activity-content">
                  <p className="student-home-new-activity-title-text">{item.title}</p>
                  <p className="student-home-new-activity-detail">{item.detail}</p>
                </div>
                <span className="student-home-new-activity-time">{item.timeAgo}</span>
              </li>
            ))}
          </ul>
        </section>

        <aside className="student-home-new-orientations">
        <div className="student-home-new-orientations-icon">
          <span className="material-icons">info</span>
        </div>
        <h3 className="student-home-new-orientations-title">
          {t('studentHome.orientationsTitle', 'Orientações de Internato')}
        </h3>
        <p className="student-home-new-orientations-text">
          {t('studentHome.orientationsText', 'Mantenha seus registros atualizados para evitar atrasos na emissão de certificados. O preceptor tem até 7 dias úteis para validar cada registro.')}
        </p>
        <a href="#" className="student-home-new-orientations-link">
          {t('studentHome.viewManual', 'Ver manual do aluno')}
          <span className="material-icons">arrow_forward</span>
        </a>
        </aside>
      </div>
    </div>
  )
}
