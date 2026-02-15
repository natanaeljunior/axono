import { useParams, useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'

// Dados mockados para demonstração (em produção viriam da API)
const MOCK_ACTIVITY = {
  id: 1,
  studentName: 'Gabriel Santos',
  studentRole: 'Interno de Medicina',
  activityDate: '24 de Maio, 2024',
  place: 'Santa Casa de Misericórdia',
  activitiesText: 'Realizada evolução clínica de 8 pacientes na enfermaria de cardiologia sob supervisão direta. Auxílio em 2 procedimentos de drenagem torácica e discussão de caso clínico sobre insuficiência cardíaca descompensada. Participação no round matutino e preenchimento de prontuários eletrônicos.',
  competencies: [
    { name: 'Raciocínio Clínico', desc: 'Demonstrou boa capacidade de síntese e diagnóstico diferencial.' },
    { name: 'Habilidade Técnica', desc: 'Execução correta de manobras de ausculta cardíaca.' },
  ],
  observations: null,
}

export default function PreceptorValidateDetail() {
  const { id } = useParams()
  const navigate = useNavigate()
  const { t } = useTranslation()
  const activity = MOCK_ACTIVITY

  const handleBack = () => navigate('/dashboard/validar-presencas')
  const handleReject = () => {
    // TODO: abrir modal/flow de solicitar ajuste
    alert(t('preceptorValidateDetail.rejectComingSoon', 'Em breve: fluxo de solicitar ajuste.'))
  }
  const handleConfirmSign = () => navigate(`/dashboard/validar-presencas/assinar/${id}`)

  return (
    <div className="preceptor-validate-detail">
      <div className="preceptor-validate-detail-header">
        <button
          type="button"
          className="preceptor-validate-detail-back"
          onClick={handleBack}
          aria-label={t('common.back', 'Voltar')}
        >
          <span className="material-icons">arrow_back</span>
        </button>
        <div>
          <h1 className="preceptor-validate-detail-title">
            {t('preceptorValidateDetail.title', 'Validar Atividade')}
          </h1>
          <p className="preceptor-validate-detail-subtitle">
            {t('preceptorValidateDetail.subtitle', 'Revise os detalhes enviados pelo aluno abaixo.')}
          </p>
        </div>
      </div>

      <div className="preceptor-validate-detail-card">
        <div className="preceptor-validate-detail-student">
          <div className="preceptor-validate-detail-avatar">
            <span className="material-icons">person</span>
          </div>
          <div className="preceptor-validate-detail-student-info">
            <h3 className="preceptor-validate-detail-student-name">{activity.studentName}</h3>
            <p className="preceptor-validate-detail-student-role">{activity.studentRole}</p>
            <div className="preceptor-validate-detail-meta">
              <span>
                <span className="material-icons">event</span>
                {activity.activityDate}
              </span>
              <span>
                <span className="material-icons">local_hospital</span>
                {activity.place}
              </span>
            </div>
          </div>
        </div>

        <section className="preceptor-validate-detail-section">
          <h4 className="preceptor-validate-detail-section-title">
            {t('preceptorValidateDetail.activitiesTitle', 'ATIVIDADES REALIZADAS')}
          </h4>
          <p className="preceptor-validate-detail-section-text">{activity.activitiesText}</p>
        </section>

        <section className="preceptor-validate-detail-section">
          <h4 className="preceptor-validate-detail-section-title">
            {t('preceptorValidateDetail.competenciesTitle', 'COMPETÊNCIAS & CAPACIDADES')}
          </h4>
          <div className="preceptor-validate-detail-competencies">
            {activity.competencies.map((c, i) => (
              <div key={i} className="preceptor-validate-detail-competency-card">
                <span className="material-icons preceptor-validate-detail-check">check_circle</span>
                <div>
                  <strong>{c.name}</strong>
                  <p>{c.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="preceptor-validate-detail-section">
          <h4 className="preceptor-validate-detail-section-title">
            {t('preceptorValidateDetail.observationsTitle', 'OBSERVAÇÕES ADICIONAIS')}
          </h4>
          <p className="preceptor-validate-detail-observations">
            {activity.observations || t('preceptorValidateDetail.noObservations', 'Nenhuma observação extra enviada pelo aluno.')}
          </p>
        </section>

        <div className="preceptor-validate-detail-actions">
          <button
            type="button"
            className="preceptor-validate-detail-btn preceptor-validate-detail-btn--secondary"
            onClick={handleReject}
          >
            <span className="material-icons">edit</span>
            {t('preceptorValidateDetail.rejectAdjust', 'Rejeitar / Solicitar Ajuste')}
          </button>
          <button
            type="button"
            className="preceptor-validate-detail-btn preceptor-validate-detail-btn--primary"
            onClick={handleConfirmSign}
          >
            <span className="material-icons">draw</span>
            {t('preceptorValidateDetail.confirmSign', 'Confirmar e Assinar')}
          </button>
        </div>
      </div>

      <p className="preceptor-validate-detail-disclaimer">
        {t('preceptorValidateDetail.disclaimer', 'Ao confirmar, você atesta a veracidade das informações e a presença do aluno.')}
      </p>
    </div>
  )
}
