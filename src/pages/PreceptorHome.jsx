import { Link, useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import './PreceptorHome.css'

const ACTIVITIES = [
  {
    id: 1,
    name: 'Gabriel Santos',
    description: 'Enviou relatório de evolução clínica • 08:45',
    status: 'pending',
    avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBEY7q_DbuhF1YidodzYS3d_PDOsG0WWHiNEtQRf6xg7k0eAwNwnsgJowzsmstACx9E11aF3uTT7DgXpV5EswvQxDONNTvZ-p7lGUX3Fv09kSV-CX-HyupeUxbqLixVHvCIdpjvzUIFx2RGpR0XcNhwqO6vbrvprEdu9V5yyFnYwV3FTr_KkkWQZVLs3D4q2zWt7IATgGNrkshd6iNpOGiZazoK8ZAncvPpd6q140j3HhdYipkiWUDIBqeaevgwFuzMuldn5JACLIk',
  },
  {
    id: 2,
    name: 'Mariana Lima',
    description: 'Enviou registro de plantão • 09:12',
    status: 'pending',
    avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuA0ggyei85TvVv6ZdCbFXdjls_Bi70ibL-gtYBuuKqbqa3KKHJWCHdhI_xYjgsr-pX7KE_VCjzw8LbrWY_xpyQDbcyx6Hd1yLtKFB5VVd-dhVrfj5y05mKtVeBcPGFhnLzjRCDndOZ_FUDbzonf8RE3YXveGPokbM32I4UobtnYOcewT_hh-P6-BFmCbDSdsxq0-VUxq735VxTSSHhfSX3TYWjoEWgw1B1bS5p2It8xYd8QPaaIw1sCqTp77AIGBQgLLG0klBPbTQ4',
  },
  {
    id: 3,
    name: 'Bruno Oliveira',
    description: 'Validado hoje às 09:45',
    status: 'validated',
    avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDIqJcKLnTC5LzImxZqRbE0Jg6bXelg3uLhljPrsM2-rZ5WDBVgKAZeIb7nuTjU8-Q8BhqWQ5IfLCaAQ8nF9AKQCQJxnR2xfigGVG0krOS9lh3cg5HrHN3OyC6Mz_FN18n2ZKwDvd9NBdNSyfnz8JL5nd9bD0jyUBZeFbs28nc4vfmsS53uC54vJkq_Ino2NyB49ISSCYI-vEcpn9Y6UUzI-17mNvkY5SEZn4FlgkEV7HMR7e-Bk_FmqULQvPdFiGo3vxK1Uqsi7wA',
  },
]

export default function PreceptorHome() {
  const { t } = useTranslation()
  const navigate = useNavigate()

  const handleValidateNow = (id) => navigate(`/dashboard/validar-presencas/atividade/${id}`)
  const handleSeeDetails = (id, status) => {
    if (status === 'validated') {
      navigate(`/dashboard/validar-presencas/relatorio/${id}`)
    } else {
      navigate(`/dashboard/validar-presencas/atividade/${id}`)
    }
  }

  return (
    <div className="preceptor-home-new">
      <div className="preceptor-home-welcome">
        <h1 className="preceptor-home-welcome-title">
          {t('preceptorHome.greeting', 'Olá, Dr. Ricardo')}
        </h1>
        <p className="preceptor-home-welcome-subtitle">
          {t('preceptorHome.welcomeQuestion', 'Como está o internato hoje na')}{' '}
          <span className="preceptor-home-welcome-strong">
            {t('preceptorValidate.rotationPlace', 'Santa Casa de Misericórdia')}
          </span>
          ?
        </p>
      </div>

      <section className="preceptor-home-cards-grid">
        <Link
          to="/dashboard/validar-presencas"
          className="preceptor-home-action-card preceptor-home-action-card--validate"
        >
          <div className="preceptor-home-action-card-icon preceptor-home-action-card-icon--blue">
            <span className="material-icons">how_to_reg</span>
          </div>
          <h3 className="preceptor-home-action-card-title">
            {t('preceptorHome.validatePresences')}
          </h3>
          <p className="preceptor-home-action-card-desc">
            {t('preceptorHome.pendingCount', 'Você tem')}{' '}
            <span className="preceptor-home-action-card-highlight">4 {t('preceptorHome.pendingLabel', 'pendências')}</span>{' '}
            {t('preceptorHome.pendingSuffix', 'para revisar hoje.')}
          </p>
          <span className="preceptor-home-action-card-btn preceptor-home-action-card-btn--primary">
            {t('preceptorHome.startNow', 'Iniciar agora')}
          </span>
        </Link>

        <button
          type="button"
          className="preceptor-home-action-card preceptor-home-action-card--group"
          onClick={() => navigate('/dashboard/meu-grupo')}
        >
          <div className="preceptor-home-action-card-icon preceptor-home-action-card-icon--green">
            <span className="material-icons">groups</span>
          </div>
          <h3 className="preceptor-home-action-card-title">
            {t('preceptorHome.myGroup')}
          </h3>
          <p className="preceptor-home-action-card-desc">
            {t('preceptorHome.groupDesc', 'Gerencie os')}{' '}
            <span className="preceptor-home-action-card-bold">10 {t('preceptorHome.studentsLabel', 'alunos')}</span>{' '}
            {t('preceptorHome.groupDescSuffix', 'sob sua supervisão na Clínica Médica.')}
          </p>
          <span className="preceptor-home-action-card-btn preceptor-home-action-card-btn--secondary">
            {t('preceptorHome.viewList', 'Ver lista')}
          </span>
        </button>
      </section>

      <section className="preceptor-home-activity">
        <div className="preceptor-home-activity-header">
          <h2 className="preceptor-home-activity-title">
            {t('preceptorHome.activityTitle', 'Atividade dos Alunos')}
          </h2>
          <a href="#" className="preceptor-home-activity-link">
            {t('preceptorHome.seeAll', 'Ver tudo')}
          </a>
        </div>

        <div className="preceptor-home-activity-list">
          {ACTIVITIES.map((item) => (
            <div
              key={item.id}
              className={`preceptor-home-feed-item ${item.status === 'validated' ? 'preceptor-home-feed-item--validated' : ''}`}
            >
              <div className="preceptor-home-feed-item-header">
                <div className="preceptor-home-feed-item-user">
                  <img
                    src={item.avatar}
                    alt={item.name}
                    className={`preceptor-home-feed-item-avatar ${item.status === 'validated' ? 'preceptor-home-feed-item-avatar--grayscale' : ''}`}
                  />
                  <div>
                    <h4 className="preceptor-home-feed-item-name">{item.name}</h4>
                    <p className="preceptor-home-feed-item-desc">{item.description}</p>
                  </div>
                </div>
                {item.status === 'pending' ? (
                  <span className="preceptor-home-feed-item-badge preceptor-home-feed-item-badge--pending">
                    {t('students.status.pending')}
                  </span>
                ) : (
                  <span className="preceptor-home-feed-item-badge preceptor-home-feed-item-badge--validated">
                    <span className="material-icons">check_circle</span>
                    {t('studentForm.validated')}
                  </span>
                )}
              </div>
              {item.status === 'pending' && (
                <div className="preceptor-home-feed-item-actions">
                  <button
                    type="button"
                    className="preceptor-home-feed-item-btn preceptor-home-feed-item-btn--primary"
                    onClick={() => handleValidateNow(item.id)}
                  >
                    {t('preceptorHome.validateNow', 'Validar agora')}
                  </button>
                  <button
                    type="button"
                    className="preceptor-home-feed-item-btn preceptor-home-feed-item-btn--secondary"
                    onClick={() => handleSeeDetails(item.id, item.status)}
                  >
                    {t('preceptorHome.seeDetails', 'Ver detalhes')}
                  </button>
                </div>
              )}
              {item.status === 'validated' && (
                <div className="preceptor-home-feed-item-actions">
                  <button
                    type="button"
                    className="preceptor-home-feed-item-btn preceptor-home-feed-item-btn--secondary"
                    onClick={() => handleSeeDetails(item.id, item.status)}
                  >
                    {t('preceptorHome.seeDetails', 'Ver detalhes')}
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>

        <div className="preceptor-home-activity-more">
          <button type="button" className="preceptor-home-activity-more-btn">
            <span className="material-icons">expand_more</span>
            {t('preceptorHome.previousActivities', 'Ver atividades anteriores')}
          </button>
        </div>
      </section>
    </div>
  )
}
