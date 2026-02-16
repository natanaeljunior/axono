import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'

const MOCK_GROUP = {
  id: 4,
  name: 'Grupo 04',
  rotation: 'Cirurgia Geral',
  preceptor: {
    name: 'Dr. Helena Cavalcanti',
    role: 'PRECEPTORA RESPONSÁVEL',
    avatar: null,
  },
  pendingCount: 3,
  toValidateCount: 4,
  totalStudents: 10,
}

const MOCK_STUDENTS = [
  { id: 1, name: 'Lucas Gabriel Mendes', ra: '20230192', progress: 75, hoursCompleted: 120, hoursTotal: 160, status: 'report_sent', badge: 'document' },
  { id: 2, name: 'Ana Beatryz Rocha', ra: '20230245', progress: 40, hoursCompleted: 64, hoursTotal: 160, status: 'pending', badge: 'warning', waitingText: 'Aguardando aluno...' },
  { id: 3, name: 'Guilherme Fonseca', ra: '20230112', progress: 100, hoursCompleted: 160, hoursTotal: 160, status: 'validated', badge: 'check', workloadLabel: 'Finalizado' },
  { id: 4, name: 'Mariana Costa', ra: '20230301', progress: 90, hoursCompleted: 144, hoursTotal: 160, status: 'report_sent', badge: 'document' },
  { id: 5, name: 'Carlos Eduardo Silva', ra: '20230188', progress: 60, hoursCompleted: 96, hoursTotal: 160, status: 'report_sent', badge: 'document' },
  { id: 6, name: 'Fernanda Oliveira', ra: '20230267', progress: 25, hoursCompleted: 40, hoursTotal: 160, status: 'pending', badge: 'warning', waitingText: 'Aguardando aluno...' },
  { id: 7, name: 'Rafael Souza', ra: '20230155', progress: 100, hoursCompleted: 160, hoursTotal: 160, status: 'validated', badge: 'check', workloadLabel: 'Finalizado' },
  { id: 8, name: 'Juliana Martins', ra: '20230291', progress: 85, hoursCompleted: 136, hoursTotal: 160, status: 'report_sent', badge: 'document' },
  { id: 9, name: 'Pedro Henrique Lima', ra: '20230134', progress: 50, hoursCompleted: 80, hoursTotal: 160, status: 'pending', badge: 'warning', waitingText: 'Aguardando aluno...' },
  { id: 10, name: 'Amanda Ferreira', ra: '20230318', progress: 95, hoursCompleted: 152, hoursTotal: 160, status: 'report_sent', badge: 'document' },
]

export default function PreceptorMyGroup() {
  const { t } = useTranslation()
  const navigate = useNavigate()
  const [showAll, setShowAll] = useState(false)
  const group = MOCK_GROUP
  const INITIAL_COUNT = 4
  const students = showAll ? MOCK_STUDENTS : MOCK_STUDENTS.slice(0, INITIAL_COUNT)
  const remainingCount = MOCK_STUDENTS.length - INITIAL_COUNT

  const handleValidateNow = (id) => navigate(`/dashboard/validar-presencas/atividade/${id}`)
  const handleViewRecord = (id) => navigate(`/dashboard/validar-presencas/relatorio/${id}`)

  return (
    <div className="preceptor-my-group">
      <div className="preceptor-my-group-header">
        <div className="preceptor-my-group-info">
          <span className="material-icons preceptor-my-group-icon">groups</span>
          <div>
            <h1 className="preceptor-my-group-title">{group.name}</h1>
            <p className="preceptor-my-group-rotation">
              {t('preceptorMyGroup.rotation', 'Rotação')}: {group.rotation}
            </p>
          </div>
        </div>
        <div className="preceptor-my-group-preceptor">
          <div className="preceptor-my-group-preceptor-info">
            <p className="preceptor-my-group-preceptor-name">{group.preceptor.name}</p>
            <p className="preceptor-my-group-preceptor-role">{group.preceptor.role}</p>
          </div>
          <div className="preceptor-my-group-preceptor-avatar">
            <span className="material-icons">person</span>
          </div>
          <div className="preceptor-my-group-badges">
            <span className="preceptor-my-group-badge preceptor-my-group-badge--pending">
              {group.pendingCount} {t('preceptorMyGroup.pending', 'Pendentes')}
            </span>
            <span className="preceptor-my-group-badge preceptor-my-group-badge--validate">
              {group.toValidateCount} {t('preceptorMyGroup.toValidate', 'Para Validar')}
            </span>
          </div>
        </div>
      </div>

      <h2 className="preceptor-my-group-section-title">
        {t('preceptorMyGroup.studentsInGroup', 'ALUNOS NO GRUPO')} ({group.totalStudents})
      </h2>

      <div className="preceptor-my-group-cards">
        {students.map((student) => (
          <article key={student.id} className="preceptor-my-group-card">
            <div className="preceptor-my-group-card-header">
              <div className="preceptor-my-group-card-avatar-wrap">
                <div className="preceptor-my-group-card-avatar">
                  <span className="material-icons">person</span>
                </div>
                <span className={`preceptor-my-group-card-badge preceptor-my-group-card-badge--${student.badge}`}>
                  {student.badge === 'document' && <span className="material-icons">description</span>}
                  {student.badge === 'warning' && <span className="material-icons">error</span>}
                  {student.badge === 'check' && <span className="material-icons">check</span>}
                </span>
              </div>
              <div className="preceptor-my-group-card-info">
                <h4 className="preceptor-my-group-card-name">{student.name}</h4>
                <p className="preceptor-my-group-card-ra">RA: {student.ra}</p>
              </div>
            </div>

            <div className="preceptor-my-group-card-progress">
              <div className="preceptor-my-group-card-progress-header">
                <span>{t('preceptorMyGroup.progress', 'PROGRESSO')}</span>
                <span>{student.progress}%</span>
              </div>
              <div className="preceptor-my-group-card-progress-bar">
                <div
                  className="preceptor-my-group-card-progress-fill"
                  style={{ width: `${student.progress}%` }}
                />
              </div>
            </div>

            <div className="preceptor-my-group-card-workload">
              {student.workloadLabel ? (
                <span className="preceptor-my-group-card-workload-final">
                  {student.hoursCompleted}h / {student.hoursTotal}h · {t('preceptorMyGroup.finished', 'Finalizado')}
                </span>
              ) : (
                <>
                  <span className="preceptor-my-group-card-workload-label">
                    {t('preceptorMyGroup.workload', 'Carga Horária')}
                  </span>
                  <span>{student.hoursCompleted}h / {student.hoursTotal}h</span>
                </>
              )}
            </div>

            <div className="preceptor-my-group-card-footer">
              {student.status === 'report_sent' && (
                <>
                  <span className="preceptor-my-group-card-status preceptor-my-group-card-status--sent">
                    {t('preceptorMyGroup.reportSent', 'RELATÓRIO ENVIADO')}
                  </span>
                  <button
                    type="button"
                    className="preceptor-my-group-card-btn preceptor-my-group-card-btn--primary"
                    onClick={() => handleValidateNow(student.id)}
                  >
                    <span className="material-icons">check</span>
                    {t('preceptorMyGroup.validateNow', 'Validar Agora')}
                  </button>
                </>
              )}
              {student.status === 'pending' && (
                <>
                  <span className="preceptor-my-group-card-status preceptor-my-group-card-status--pending">
                    {t('students.status.pending')}
                  </span>
                  <p className="preceptor-my-group-card-waiting">{student.waitingText}</p>
                </>
              )}
              {student.status === 'validated' && (
                <>
                  <span className="preceptor-my-group-card-status preceptor-my-group-card-status--validated">
                    {t('studentForm.validated')}
                  </span>
                  <button
                    type="button"
                    className="preceptor-my-group-card-link"
                    onClick={() => handleViewRecord(student.id)}
                  >
                    <span className="material-icons">visibility</span>
                    {t('preceptorMyGroup.viewRecord', 'Ver Registro')}
                  </button>
                </>
              )}
            </div>
          </article>
        ))}
      </div>

      {remainingCount > 0 && !showAll && (
        <div className="preceptor-my-group-load-more">
          <button
            type="button"
            className="preceptor-my-group-load-more-btn"
            onClick={() => setShowAll(true)}
          >
            <span className="material-icons">expand_more</span>
            {t('preceptorMyGroup.loadMore', 'Carregar mais alunos')} ({remainingCount})
          </button>
        </div>
      )}

      <footer className="preceptor-my-group-footer">
        <span className="preceptor-my-group-footer-secure">
          <span className="material-icons">check_circle</span>
          {t('preceptorMyGroup.platformName', 'PLATAFORMA DE GESTÃO DE INTERNATO')}
        </span>
        <span className="preceptor-my-group-footer-version">
          {t('common.brandName')} • Painel do Preceptor v.2.5.0
        </span>
      </footer>
    </div>
  )
}
