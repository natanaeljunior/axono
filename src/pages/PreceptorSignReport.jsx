import { useState } from 'react'
import { useParams, useNavigate, useLocation } from 'react-router-dom'
import { useTranslation } from 'react-i18next'

const COMPETENCY_KEYS = ['anamnese', 'raciocinio', 'prescricao', 'interpretacao', 'procedimentos', 'relacionamento']

function buildReportFromFormData(formData, t) {
  const competencyLabels = COMPETENCY_KEYS.filter(k => formData.competencies[k]).map(k =>
    t(`studentForm.competency${k.charAt(0).toUpperCase() + k.slice(1)}`, k)
  )
  const activitiesText = formData.activities?.trim()
  const activities = activitiesText ? activitiesText.split(/\n+/).filter(Boolean) : []

  return {
    id: formData.id || 'novo',
    activityDate: formatDateBr(formData.date),
    shift: `${formData.entry || '07:00'} - ${formData.exit || '19:00'}`,
    hospitalUnit: 'Hospital das Clínicas (HCFMUSP)',
    activities: activities.length > 0 ? activities : [t('preceptorSign.noActivities', 'Nenhuma atividade descrita')],
    competencies: competencyLabels.length > 0 ? competencyLabels : [t('preceptorSign.none', 'Nenhuma')],
    student: {
      name: t('profileSwitcher.userAluno'),
      role: t('studentLayout.internSemester'),
      avatar: null,
    },
    preceptor: {
      name: formData.preceptor || t('preceptorSign.toBeDefined', 'A definir'),
      role: t('preceptorSign.preceptorRole', 'Médico Preceptor'),
      avatar: null,
    },
  }
}

function formatDateBr(dateStr) {
  if (!dateStr) return ''
  const d = new Date(dateStr + 'T12:00:00')
  return d.toLocaleDateString('pt-BR', { day: 'numeric', month: 'long', year: 'numeric' })
}

// Dados mockados (em produção viriam da API)
const MOCK_REPORT = {
  id: 1,
  activityDate: '24 de Outubro, 2023',
  shift: 'Diurno (07:00 - 19:00)',
  hospitalUnit: 'Hospital das Clínicas - Unidade Emergência',
  activities: [
    'Acompanhamento de 4 pacientes na ala de trauma.',
    'Realização de sutura em ferimento corto-contuso superficial.',
    'Discussão de caso clínico sobre abdome agudo obstrutivo com a equipe de cirurgia.',
  ],
  competencies: ['Raciocínio Clínico', 'Procedimentos Invasivos', 'Ética Médica', 'Trabalho em Equipe'],
  student: {
    name: 'Lucas Gabriel Mendes',
    role: 'Estudante de Medicina • RA: 20230192',
    avatar: null,
  },
  preceptor: {
    name: 'Dra. Helena Cavalcanti',
    role: 'Médica Preceptora • CRM-SP: 123.456',
    avatar: null,
  },
}

export default function PreceptorSignReport() {
  const { id } = useParams()
  const navigate = useNavigate()
  const location = useLocation()
  const { t } = useTranslation()

  const isFromStudentForm = location.pathname.includes('formulario-diario')
  const formData = location.state?.formData
  const report = formData ? buildReportFromFormData(formData, t) : MOCK_REPORT

  const [declarationChecked, setDeclarationChecked] = useState(false)
  const [studentSigned, setStudentSigned] = useState(false)
  const [preceptorSigned, setPreceptorSigned] = useState(false)

  const handleBack = () => navigate(isFromStudentForm ? '/dashboard/formulario-diario' : `/dashboard/validar-presencas/atividade/${id}`)
  const handleClearStudent = () => setStudentSigned(false)
  const handleClearPreceptor = () => setPreceptorSigned(false)
  const handleConfirmFinalize = () => {
    if (!declarationChecked) {
      alert(t('preceptorSign.declarationRequired', 'Marque a declaração para continuar.'))
      return
    }
    alert(t('preceptorSign.successMessage', 'Relatório finalizado e enviado com sucesso!'))
    navigate(isFromStudentForm ? '/dashboard' : '/dashboard/validar-presencas')
  }

  return (
    <div className="preceptor-sign-report">
      <div className="preceptor-sign-report-header">
        <button
          type="button"
          className="preceptor-sign-report-back"
          onClick={handleBack}
        >
          <span className="material-icons">arrow_back</span>
          {isFromStudentForm ? t('preceptorSign.backToForm', 'Voltar ao Formulário') : t('preceptorSign.backToEditor', 'Voltar ao Editor')}
        </button>
        <h1 className="preceptor-sign-report-title">
          {t('preceptorSign.title', 'Finalizar Relatório Diário')}
        </h1>
        <span className="preceptor-sign-report-status">
          {t('preceptorSign.awaitingSignatures', 'AGUARDANDO ASSINATURAS')}
        </span>
      </div>

      <div className="preceptor-sign-report-layout">
        <aside className="preceptor-sign-report-summary">
          <h2 className="preceptor-sign-report-summary-title">
            <span className="material-icons">description</span>
            {t('preceptorSign.recordSummary', 'Resumo do Registro')}
          </h2>

          <div className="preceptor-sign-report-summary-item">
            <span className="preceptor-sign-report-label">{t('preceptorSign.internshipDate', 'DATA DO ESTÁGIO')}</span>
            <p>{report.activityDate}</p>
          </div>
          <div className="preceptor-sign-report-summary-item">
            <span className="preceptor-sign-report-label">{t('preceptorSign.shift', 'TURNO')}</span>
            <p>{report.shift}</p>
          </div>
          <div className="preceptor-sign-report-summary-item">
            <span className="preceptor-sign-report-label">{t('preceptorSign.hospitalUnit', 'UNIDADE HOSPITALAR')}</span>
            <p>
              <span className="material-icons">local_hospital</span>
              {report.hospitalUnit}
            </p>
          </div>

          <section className="preceptor-sign-report-summary-section">
            <h3>{t('preceptorSign.activitiesPerformed', 'ATIVIDADES REALIZADAS')}</h3>
            <ul>
              {report.activities.map((a, i) => (
                <li key={i}>{a}</li>
              ))}
            </ul>
          </section>

          <section className="preceptor-sign-report-summary-section">
            <h3>{t('preceptorSign.competenciesDeveloped', 'COMPETÊNCIAS DESENVOLVIDAS')}</h3>
            <div className="preceptor-sign-report-competencies">
              {report.competencies.map((c, i) => (
                <span key={i} className="preceptor-sign-report-competency-tag">{c}</span>
              ))}
            </div>
          </section>

          <div className="preceptor-sign-report-info-box">
            <span className="material-icons">info</span>
            <p>{t('preceptorSign.infoBox', 'Certifique-se de que todos os dados estão corretos. Após a assinatura e o envio, o registro será bloqueado para edição conforme normas do internato.')}</p>
          </div>
        </aside>

        <main className="preceptor-sign-report-main">
          <div className="preceptor-sign-report-sign-area">
            <div className="preceptor-sign-report-sign-header">
              <div className="preceptor-sign-report-sign-user">
                <div className="preceptor-sign-report-sign-avatar">
                  <span className="material-icons">person</span>
                </div>
                <div>
                  <p className="preceptor-sign-report-sign-name">{report.student.name}</p>
                  <p className="preceptor-sign-report-sign-role">{report.student.role}</p>
                </div>
              </div>
              <button type="button" className="preceptor-sign-report-clear" onClick={handleClearStudent}>
                {t('preceptorSign.clear', 'LIMPAR')}
              </button>
            </div>
            <div
              className="preceptor-sign-report-sign-pad"
              onClick={() => setStudentSigned(true)}
              onKeyDown={(e) => e.key === 'Enter' && setStudentSigned(true)}
              role="button"
              tabIndex={0}
              aria-label={t('preceptorSign.signHere', 'Assine aqui seu nome completo')}
            >
              <span className="preceptor-sign-report-sign-placeholder">
                {t('preceptorSign.signHere', 'Assine aqui seu nome completo')}
              </span>
            </div>
            <p className="preceptor-sign-report-sign-note">
              {t('preceptorSign.digitalValid', 'Assinatura digital válida para fins acadêmicos')}
            </p>
          </div>

          <div className="preceptor-sign-report-sign-area">
            <div className="preceptor-sign-report-sign-header">
              <div className="preceptor-sign-report-sign-user">
                <div className="preceptor-sign-report-sign-avatar">
                  <span className="material-icons">person</span>
                </div>
                <div>
                  <p className="preceptor-sign-report-sign-name">{report.preceptor.name}</p>
                  <p className="preceptor-sign-report-sign-role">{report.preceptor.role}</p>
                </div>
              </div>
              <button type="button" className="preceptor-sign-report-clear" onClick={handleClearPreceptor}>
                {t('preceptorSign.clear', 'LIMPAR')}
              </button>
            </div>
            <div
              className="preceptor-sign-report-sign-pad"
              onClick={() => setPreceptorSigned(true)}
              onKeyDown={(e) => e.key === 'Enter' && setPreceptorSigned(true)}
              role="button"
              tabIndex={0}
              aria-label={t('preceptorSign.preceptorSignSpace', 'Espaço para assinatura do Preceptor')}
            >
              <span className="preceptor-sign-report-sign-placeholder">
                {t('preceptorSign.preceptorSignSpace', 'Espaço para assinatura do Preceptor')}
              </span>
            </div>
            <p className="preceptor-sign-report-sign-note">
              {t('preceptorSign.preceptorSignNote', 'A assinatura do preceptor deve ser realizada presencialmente')}
            </p>
          </div>

          <label className="preceptor-sign-report-declaration">
            <input
              type="checkbox"
              checked={declarationChecked}
              onChange={(e) => setDeclarationChecked(e.target.checked)}
            />
            <span>{t('preceptorSign.declaration', 'Declaro que as informações acima são verdadeiras e representam a atividade realizada.')}</span>
          </label>

          <button
            type="button"
            className="preceptor-sign-report-submit"
            onClick={handleConfirmFinalize}
          >
            <span className="material-icons">lock</span>
            {t('preceptorSign.confirmFinalize', 'Confirmar Assinaturas e Finalizar')}
          </button>

          <p className="preceptor-sign-report-submit-note">
            {t('preceptorSign.finalizeNote', 'Ao clicar em finalizar, o documento será gerado em PDF e enviado automaticamente para a coordenação de estágio.')}
          </p>
        </main>
      </div>

      <footer className="preceptor-sign-report-footer">
        <span className="preceptor-sign-report-footer-secure">
          <span className="material-icons">verified_user</span>
          {t('preceptorSign.secureEnv', 'AMBIENTE SEGURO & CRIPTOGRAFADO')}
        </span>
        <span className="preceptor-sign-report-footer-version">v.2.4.0 • MedTrack Internship Management</span>
      </footer>
    </div>
  )
}
