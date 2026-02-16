import { useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import './StudentRotationReport.css'

const MOCK_ALL_ACTIVITIES = [
  { date: '01/10/2023', rotation: 'Pediatria', hospital: 'Hosp. Municipal Infantil', ch: '12h', activity: 'Acompanhamento em enfermaria e atendimento ambulatorial pediátrico.', signer: 'Dr. André Luiz' },
  { date: '02/10/2023', rotation: 'Pediatria', hospital: 'Hosp. Municipal Infantil', ch: '10h', activity: 'Plantão noturno em pronto-atendimento e triagem.', signer: 'Dra. Marta Souza' },
  { date: '04/10/2023', rotation: 'Ginecologia', hospital: 'Maternidade Central', ch: '12h', activity: 'Auxílio em partos vaginais e suturas de lacerações.', signer: 'Dr. Roberto Lima' },
  { date: '05/10/2023', rotation: 'Ginecologia', hospital: 'Maternidade Central', ch: '10h', activity: 'Consulta pré-natal de alto risco.', signer: 'Dra. Marta Souza' },
  { date: '08/10/2023', rotation: 'Cirurgia Geral', hospital: 'Hospital das Clínicas', ch: '12h', activity: 'Participação em cirurgias eletivas e discussão de casos.', signer: 'Dr. Roberto Mendonça' },
  { date: '09/10/2023', rotation: 'Clínica Médica', hospital: 'Hospital das Clínicas', ch: '12h', activity: 'Ronda em enfermaria e atendimento ambulatorial.', signer: 'Dra. Amanda Castro' },
]

export default function StudentFinalCertification() {
  const navigate = useNavigate()
  const { t } = useTranslation()

  const activities = MOCK_ALL_ACTIVITIES
  const totalHours = activities.reduce((sum, a) => sum + parseInt(a.ch, 10), 0)

  const handleBack = () => navigate('/dashboard/certificacao')
  const handlePrint = () => window.print()

  return (
    <div className="student-report-page">
      <header className="student-report-header">
        <nav className="student-report-breadcrumb">
          <button type="button" onClick={handleBack} className="student-report-back">
            <span className="material-icons">arrow_back</span>
            {t('studentReport.backToCertification', 'Voltar à Certificação')}
          </button>
        </nav>
        <div className="student-report-header-right">
          <span className="student-report-signed-badge">
            <span className="material-icons">verified</span>
            {t('studentReport.digitallySigned', 'Assinado Digitalmente')}
          </span>
        </div>
      </header>

      <main className="student-report-main">
        <div className="student-report-viewer-bar">
          <span className="student-report-page-info">{t('studentReport.pageInfo', 'Página 1 de 1')}</span>
          <div className="student-report-zoom">
            <button type="button" aria-label="Diminuir">−</button>
            <span>100%</span>
            <button type="button" aria-label="Aumentar">+</button>
          </div>
          <div className="student-report-actions-bar">
            <button type="button" onClick={handlePrint} className="student-report-btn student-report-btn--primary">
              <span className="material-icons">download</span>
              {t('studentReport.downloadPdf', 'Baixar PDF')}
            </button>
            <button type="button" onClick={handlePrint} className="student-report-btn student-report-btn--secondary">
              <span className="material-icons">print</span>
              {t('studentReport.print', 'Imprimir')}
            </button>
          </div>
        </div>

        <article className="student-report-document student-report-document--final">
          <div className="student-report-doc-header">
            <div className="student-report-doc-logo">
              <img src="/logo-axono-blue.png" alt="" className="student-report-doc-logo-img" />
            </div>
            <div className="student-report-doc-title-block">
              <h1 className="student-report-doc-title">{t('studentReport.institutionName', 'FACULDADE DE MEDICINA FEDERAL')}</h1>
              <h2 className="student-report-doc-subtitle">{t('studentReport.recordTitle', 'REGISTRO DE ATIVIDADES DE INTERNATO')}</h2>
              <p className="student-report-doc-final-badge">{t('studentReport.consolidatedReport', 'Relatório Consolidado Geral')}</p>
            </div>
            <div className="student-report-doc-codes">
              <span>COD: MED-CERT-2026-FINAL</span>
              <span>AUTENTICIDADE: 9823-XF21-LL09</span>
            </div>
          </div>

          <section className="student-report-doc-student">
            <div className="student-report-doc-row">
              <span className="student-report-doc-label">{t('studentReport.studentName', 'NOME DO ALUNO(A)')}:</span>
              <span className="student-report-doc-value">{t('profileSwitcher.userAluno')}</span>
            </div>
            <div className="student-report-doc-row">
              <span className="student-report-doc-label">{t('studentReport.academicPeriod', 'PERÍODO LETIVO')}:</span>
              <span className="student-report-doc-value">2023.2 (6º Ano)</span>
            </div>
            <div className="student-report-doc-row">
              <span className="student-report-doc-label">{t('studentReport.enrollment', 'MATRÍCULA / TURMA')}:</span>
              <span className="student-report-doc-value">2020.1.00249 / Turma 2026</span>
            </div>
            <div className="student-report-doc-row">
              <span className="student-report-doc-label">{t('studentReport.completionStatus', 'STATUS DE INTEGRALIZAÇÃO')}:</span>
              <span className="student-report-doc-status">
                <span className="student-report-doc-status-dot student-report-doc-status-dot--ok" />
                {t('studentReport.regularCompleted', 'Regular (Concluído)')}
              </span>
            </div>
          </section>

          <section className="student-report-doc-table-wrap">
            <table className="student-report-doc-table">
              <thead>
                <tr>
                  <th>{t('studentReport.colDate', 'DATA')}</th>
                  <th>{t('studentReport.colRotation', 'ROTAÇÃO')}</th>
                  <th>{t('studentReport.colHospital', 'HOSPITAL')}</th>
                  <th>{t('studentReport.colCh', 'CH')}</th>
                  <th>{t('studentReport.colActivity', 'ATIVIDADE REALIZADA')}</th>
                  <th>{t('studentReport.colSignature', 'ASSINATURA')}</th>
                </tr>
              </thead>
              <tbody>
                {activities.map((a, i) => (
                  <tr key={i}>
                    <td>{a.date}</td>
                    <td>{a.rotation}</td>
                    <td>{a.hospital}</td>
                    <td>{a.ch}</td>
                    <td>{a.activity}</td>
                    <td>
                      <div className="student-report-doc-sign-cell">
                        <span className="material-icons student-report-doc-check">check_circle</span>
                        <span>{a.signer}</span>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
              <tfoot>
                <tr>
                  <td colSpan={4} className="student-report-doc-total-label">
                    {t('studentReport.totalPage', 'Total da Página')}: {totalHours}h
                  </td>
                  <td colSpan={2} />
                </tr>
              </tfoot>
            </table>
          </section>

          <section className="student-report-doc-signatures">
            <div className="student-report-doc-sign-line">
              <span className="student-report-doc-sign-name">PROF. DR. RICARDO ARANTES</span>
              <span className="student-report-doc-sign-role">Diretor Acadêmico de Medicina</span>
              <span className="student-report-doc-signed-id">SIGNED_ID: 9812-782-COORD</span>
            </div>
            <div className="student-report-doc-sign-line">
              <span className="student-report-doc-sign-name">PROFA. DRA. HELENA MENDES</span>
              <span className="student-report-doc-sign-role">Coordenação de Internato</span>
            </div>
          </section>

          <footer className="student-report-doc-footer">
            <p>{t('studentReport.disclaimer', 'Documento gerado automaticamente pelo Sistema de Gestão de Internato. A autenticidade pode ser verificada via QR Code ou no portal do aluno.')}</p>
            <span className="student-report-doc-page-num">Página 01 / 01</span>
          </footer>
        </article>
      </main>
    </div>
  )
}
