import { useParams, useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'

// Dados mockados para demonstração (em produção viriam da API)
const MOCK_REPORT = {
  id: 44921,
  rotationName: 'Clínica Médica',
  title: 'Evolução Clínica e Conduta',
  studentName: 'Gabriel Santos',
  status: 'validated',
  validatedAt: '12 Out, 09:45',
  activityDate: '12 de Outubro de 2023',
  startTime: '08:45',
  endTime: '11:30',
  reportText: 'Paciente J.M.S, 64 anos, admitido com quadro de insuficiência cardíaca descompensada. Durante a ronda matutina, apresentava melhora do padrão respiratório após ajuste da dose de diuréticos. Murmúrios vesiculares presentes com estertores crepitantes em bases. Ritmo cardíaco regular em 2 tempos, sem sopros. Edema de membros inferiores (2+/4+). Conduta: Manter furosemida EV e iniciar desmame gradual de oxigênio suplementar. Monitorar balanço hídrico rigoroso nas próximas 12 horas.',
  signer: {
    name: 'Dr. Ricardo Martins',
    crm: 'CRM-SP 123456',
    authNote: 'Autenticado via sistema',
  },
  history: [
    { label: 'Registro enviado para revisão', author: 'Gabriel Santos', date: '12 Out, 08:50', variant: 'blue' },
    { label: 'Aprovado e Assinado', author: 'Dr. Ricardo Martins', date: '12 Out, 09:45', variant: 'green' },
  ],
}

export default function PreceptorReportDetail() {
  const { id } = useParams()
  const navigate = useNavigate()
  const { t } = useTranslation()
  const report = MOCK_REPORT

  const handleBack = () => navigate('/dashboard/validar-presencas')
  const handlePrint = () => window.print()

  return (
    <div className="preceptor-report-detail">
      <div className="preceptor-report-detail-header">
        <button
          type="button"
          className="preceptor-report-detail-back"
          onClick={handleBack}
        >
          <span className="material-icons">arrow_back</span>
          {t('preceptorReportDetail.backToHome', 'Voltar para o Início')}
        </button>

        <div className="preceptor-report-detail-meta-row">
          <span className="preceptor-report-detail-badge">{report.rotationName}</span>
          <span className="preceptor-report-detail-id">ID: #{report.id}</span>
        </div>

        <div className="preceptor-report-detail-title-row">
          <div>
            <h1 className="preceptor-report-detail-title">{report.title}</h1>
            <p className="preceptor-report-detail-author">
              {t('preceptorReportDetail.sentBy', 'Registro enviado por')} {report.studentName}
            </p>
          </div>
          <div className="preceptor-report-detail-status-badge">
            <div className="preceptor-report-detail-status-row">
              <span className="material-icons">check_circle</span>
              <span className="preceptor-report-detail-status-text">{t('preceptorReportDetail.validated', 'Validado')}</span>
            </div>
            <span className="preceptor-report-detail-status-date">{report.validatedAt}</span>
          </div>
        </div>
      </div>

      <div className="preceptor-report-detail-card">
        <div className="preceptor-report-detail-datetime-row">
          <div>
            <span className="preceptor-report-detail-label">{t('preceptorReportDetail.activityDate', 'DATA DA ATIVIDADE')}</span>
            <p className="preceptor-report-detail-value">
              <span className="material-icons">event</span>
              {report.activityDate}
            </p>
          </div>
          <div>
            <span className="preceptor-report-detail-label">{t('preceptorReportDetail.time', 'HORÁRIO')}</span>
            <p className="preceptor-report-detail-value">
              <span className="material-icons">schedule</span>
              {report.startTime} às {report.endTime}
            </p>
          </div>
        </div>

        <section className="preceptor-report-detail-section">
          <h4 className="preceptor-report-detail-section-title">
            {t('preceptorReportDetail.reportTitle', 'RELATÓRIO DO ALUNO')}
          </h4>
          <p className="preceptor-report-detail-report-text">{report.reportText}</p>
        </section>
      </div>

      <section className="preceptor-report-detail-signature">
        <h4 className="preceptor-report-detail-section-title">
          {t('preceptorReportDetail.digitalSignature', 'ASSINATURA DIGITAL')}
        </h4>
        <div className="preceptor-report-detail-signature-content">
          <span className="material-icons preceptor-report-detail-sign-icon">draw</span>
          <div>
            <p className="preceptor-report-detail-signer-name">{report.signer.name}</p>
            <p className="preceptor-report-detail-signer-meta">
              {report.signer.crm} · {report.signer.authNote.toUpperCase()}
            </p>
          </div>
        </div>
      </section>

      <section className="preceptor-report-detail-history">
        <h4 className="preceptor-report-detail-section-title">
          {t('preceptorReportDetail.historyTitle', 'HISTÓRICO DO REGISTRO')}
        </h4>
        <ul className="preceptor-report-detail-timeline">
          {report.history.map((item, i) => (
            <li key={i} className={`preceptor-report-detail-timeline-item preceptor-report-detail-timeline-item--${item.variant}`}>
              <span className="preceptor-report-detail-timeline-dot" />
              <div>
                <p className="preceptor-report-detail-timeline-label">{item.label}</p>
                <p className="preceptor-report-detail-timeline-meta">{item.author} · {item.date}</p>
              </div>
            </li>
          ))}
        </ul>
      </section>

      <div className="preceptor-report-detail-footer">
        <button
          type="button"
          className="preceptor-report-detail-print-btn"
          onClick={handlePrint}
        >
          <span className="material-icons">print</span>
          {t('preceptorReportDetail.printReceipt', 'Imprimir Comprovante')}
        </button>
      </div>
    </div>
  )
}
