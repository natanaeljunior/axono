import { useTranslation } from 'react-i18next'
import { Link, useLocation } from 'react-router-dom'
import './StudentReportsCertification.css'

const ROTATIONS = [
  { key: 'surgery', name: 'Cirurgia Geral', icon: 'content_cut', status: 'completed', preceptor: 'Dr. Roberto Mendonça', hours: '480/480', grade: '9.5' },
  { key: 'clinical', name: 'Clínica Médica', icon: 'stethoscope', status: 'completed', preceptor: 'Dra. Amanda Castro', hours: '480/480', grade: '8.8' },
  { key: 'gyneco', name: 'Ginecologia', icon: 'pregnant_woman', status: 'current', preceptor: 'Dr. Fernando Costa', progress: 45 },
  { key: 'pediatrics', name: 'Pediatria', icon: 'child_care', status: 'pending', hours: '0/480' },
  { key: 'aps', name: 'APS', icon: 'home', status: 'pending', hours: '0/480' },
  { key: 'emergency', name: 'Urgência', icon: 'emergency', status: 'pending', hours: '0/400' },
]

const SIGNATURES = [
  { module: 'Cirurgia Geral', preceptor: 'Dr. Roberto Mendonça', status: 'authenticated', crm: 'CRM-SP 123456', date: '12 Mar 2024' },
  { module: 'Clínica Médica', preceptor: 'Dra. Amanda Castro', status: 'authenticated', crm: 'CRM-SP 654321', date: '05 Jun 2024' },
  { module: 'Ginecologia e Obstetrícia', preceptor: 'Dr. Fernando Costa', status: 'pending', crm: 'Processando...', date: '—' },
]

export default function StudentReportsCertification() {
  const { t } = useTranslation()
  const location = useLocation()
  const isCertPage = location.pathname.includes('/certificacao') || location.pathname === '/dashboard' || location.pathname === '/dashboard/'

  return (
    <div className="student-cert-unified">
      {isCertPage && (
        <nav className="student-cert-nav">
          <div className="student-cert-nav-inner">
            <div className="student-cert-nav-brand">
              <img src="/logo-axono-blue.png" alt="" className="student-cert-nav-logo" />
              <div>
                <h1 className="student-cert-nav-title">{t('studentCert.portalTitle', 'Portal do Interno')}</h1>
                <p className="student-cert-nav-subtitle">{t('studentCert.unifiedReport', 'RELATÓRIO UNIFICADO (VISÃO ÚNICA)')}</p>
              </div>
            </div>
            <div className="student-cert-nav-user">
              <div className="student-cert-nav-user-info">
                <p className="student-cert-nav-user-name">{t('studentCert.studentName', 'Dr. Lucas Silva Ferreira')}</p>
                <p className="student-cert-nav-user-ra">{t('studentCert.studentRa', 'RA: 2021004589 • 12º Semestre')}</p>
              </div>
              <div className="student-cert-nav-avatar">
                <img src="https://lh3.googleusercontent.com/aida-public/AB6AXuAqAu_n-o3GT-xNJL7DVt9vzxsTNQgvrHG3v9JZ26Lqs6CIOByMVuY2QSH9Qpst0IYRq0jZyt7_fUnsk1lmJSW7QSQlRUcJ9PdSFIWkkC3gCk6pyhOIIB9JP0oMZ6MWycYWtHIA8KiaRyuOGwujR96YfV9w7tXK8FcE15v_Z42mCoBHYmzVjzDRAjQKjCu8epTJCV8sIojLIUIHVXK4JNU_K16YpH4rt7N5IMeyo7vF7HJRxaTkZn0bWmK3twpjgh-90omTyXgsJOk" alt="" />
              </div>
            </div>
          </div>
        </nav>
      )}

      <main className="student-cert-main">
        <header className="student-cert-hero">
          <div className="student-cert-progress-card">
            <div>
              <div className="student-cert-section-head">
                <span className="student-cert-accent-bar" />
                <h2 className="student-cert-section-title">{t('studentCert.generalProgress', 'Progresso Geral do Internato')}</h2>
              </div>
              <p className="student-cert-progress-desc">{t('studentCert.generalProgressDesc', 'Consolidado de horas e competências obrigatórias para graduação.')}</p>
            </div>
            <div className="student-cert-progress-content">
              <div className="student-cert-progress-row">
                <div>
                  <span className="student-cert-label">{t('studentCert.accumulated', 'Acumulado')}</span>
                  <span className="student-cert-hours">2.340<span className="student-cert-hours-sep">/</span>2.800h</span>
                </div>
                <div className="student-cert-status-right">
                  <span className="student-cert-label">{t('studentCert.finalStatus', 'Status Final')}</span>
                  <span className="student-cert-status-value">83.5% {t('studentCert.completed', 'Concluído')}</span>
                </div>
              </div>
              <div className="student-cert-progress-bar">
                <div className="student-cert-progress-fill" style={{ width: '83.5%' }} />
              </div>
              <div className="student-cert-progress-dates">
                <span><span className="material-icons">calendar_today</span> {t('studentCert.start', 'Início')}: Jan 2023</span>
                <span><span className="material-icons">event_available</span> {t('studentCert.forecast', 'Previsão')}: Dez 2024</span>
              </div>
            </div>
          </div>

          <div className="student-cert-cert-card">
            <div className="student-cert-cert-icon-wrap">
              <span className="material-icons">verified_user</span>
            </div>
            <h3 className="student-cert-cert-title">{t('studentCert.certificateTitle', 'Certificado Final')}</h3>
            <p className="student-cert-cert-desc">{t('studentCert.certificateDesc', 'Documento oficial com assinaturas digitais e carimbos de todos os ciclos cursados.')}</p>
            <Link to="/dashboard/certificacao/certificado-final" className="student-cert-generate-btn">
              <span className="material-icons">picture_as_pdf</span>
              {t('studentCert.generateReport', 'Gerar Relatório Consolidado')}
            </Link>
          </div>
        </header>

        <section className="student-cert-rotations">
          <div className="student-cert-rotations-head">
            <div className="student-cert-section-head">
              <span className="student-cert-accent-bar" />
              <h2 className="student-cert-section-title">{t('studentCert.rotationStatus', 'Status das Rotações')}</h2>
            </div>
          </div>

          <div className="student-cert-rotations-grid">
            {ROTATIONS.map((r) => (
              <div key={r.key} className={`student-cert-rotation-card student-cert-rotation-card--${r.status}`}>
                {r.status === 'current' && <span className="student-cert-rotation-badge">Atual</span>}
                <div className="student-cert-rotation-header">
                  <div className={`student-cert-rotation-icon-wrap ${r.status === 'pending' ? 'student-cert-rotation-icon-wrap--muted' : ''}`}>
                    <span className="material-icons">{r.icon}</span>
                  </div>
                  {r.status === 'completed' && <span className="student-cert-rotation-ok">OK</span>}
                  {r.status === 'current' && (
                    <div className="student-cert-rotation-pulse">
                      <span className="student-cert-rotation-pulse-outer" />
                      <span className="student-cert-rotation-pulse-inner" />
                    </div>
                  )}
                </div>
                <h4 className="student-cert-rotation-name">{r.name}</h4>
                {r.preceptor && <p className="student-cert-rotation-preceptor">{r.preceptor}</p>}
                {r.status === 'pending' && <p className="student-cert-rotation-preceptor">{t('students.status.pending')}</p>}
                <div className="student-cert-rotation-info">
                  {r.status === 'completed' && (
                    <>
                      <div className="student-cert-rotation-row"><span>{t('studentCert.hoursLabel', 'Horas')}:</span><span className="student-cert-rotation-bold">{r.hours}</span></div>
                      <div className="student-cert-rotation-row"><span>{t('studentCert.gradeLabel', 'Nota')}:</span><span className="student-cert-rotation-bold student-cert-rotation-grade">{r.grade}</span></div>
                    </>
                  )}
                  {r.status === 'current' && (
                    <>
                      <div className="student-cert-rotation-row"><span>{t('studentCert.progressLabel', 'Progresso')}:</span><span className="student-cert-rotation-bold">{r.progress}%</span></div>
                      <div className="student-cert-rotation-mini-bar">
                        <div className="student-cert-rotation-mini-fill" style={{ width: `${r.progress}%` }} />
                      </div>
                    </>
                  )}
                  {r.status === 'pending' && (
                    <div className="student-cert-rotation-row"><span>{t('studentCert.hoursLabel')}:</span><span>{r.hours}</span></div>
                  )}
                </div>
                {r.status === 'completed' && (
                  <Link to={`/dashboard/certificacao/relatorio/${r.key}`} className="student-cert-rotation-btn student-cert-rotation-btn--report">
                    <span className="material-icons">description</span>
                    {t('studentCert.report', 'Ver Relatório')}
                  </Link>
                )}
                {r.status === 'current' && <Link to="/dashboard/formulario-diario" className="student-cert-rotation-btn student-cert-rotation-btn--primary">{t('studentCert.launchActivities', 'Lançar')}</Link>}
                {r.status === 'pending' && <div className="student-cert-rotation-waiting">{t('studentCert.awaiting', 'Aguardando')}</div>}
              </div>
            ))}
          </div>
        </section>

        <section className="student-cert-legal">
          <div className="student-cert-section-head">
            <span className="student-cert-accent-bar" />
            <h2 className="student-cert-section-title">{t('studentCert.legalVerification', 'Verificação de Validade Jurídica')}</h2>
          </div>

          <div className="student-cert-legal-card">
            <div className="student-cert-legal-header">
              <div className="student-cert-legal-header-left">
                <div className="student-cert-legal-icon">
                  <span className="material-icons">gpp_good</span>
                </div>
                <div>
                  <p className="student-cert-legal-title">{t('studentCert.digitalSignatures', 'Assinaturas e Carimbos Digitais')}</p>
                  <p className="student-cert-legal-desc">{t('studentCert.legalVerificationDesc', 'Conformidade com os padrões ICP-Brasil para documentos acadêmicos.')}</p>
                </div>
              </div>
              <span className="student-cert-audit-badge">{t('studentCert.auditDoc', 'DOCUMENTAÇÃO AUDITÁVEL')}</span>
            </div>

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
                      <td><span className="student-cert-table-module">{s.module}</span></td>
                      <td><span className="student-cert-table-preceptor">{s.preceptor}</span></td>
                      <td>
                        {s.status === 'authenticated' ? (
                          <div className="student-cert-table-status student-cert-table-status--ok">
                            <span className="material-icons">check_circle</span>
                            <span>{t('studentCert.authenticated', 'Autenticada')}</span>
                          </div>
                        ) : (
                          <div className="student-cert-table-status student-cert-table-status--pending">
                            <span className="material-icons">pending</span>
                            <span>{t('students.status.pending')}</span>
                          </div>
                        )}
                      </td>
                      <td><code className="student-cert-table-crm">{s.crm}</code></td>
                      <td><span className="student-cert-table-date">{s.date}</span></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="student-cert-legal-footer">
              <p>{t('studentCert.icpNote', 'As assinaturas seguem os padrões de segurança e criptografia ICP-Brasil. Verifique o QR Code no PDF final para validação externa.')}</p>
            </div>
          </div>
        </section>
      </main>

      <footer className="student-cert-footer">
        <div className="student-cert-footer-inner">
          <div className="student-cert-footer-brand">
            <img src="/logo-axono-blue.png" alt="" className="student-cert-footer-logo" />
          </div>
          <p className="student-cert-footer-copy">© 2024 • Sistema de Gestão Acadêmica Integrada • Todos os direitos reservados</p>
          <div className="student-cert-footer-links">
            <a href="#">{t('studentCert.terms', 'Termos')}</a>
            <a href="#">{t('studentLayout.support', 'Suporte')}</a>
          </div>
        </div>
      </footer>
    </div>
  )
}
