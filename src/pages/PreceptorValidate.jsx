import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'

const HISTORY_ITEMS = [
  { date: 'Ontem', place: 'Enfermaria Ala B', status: '10/10 Validados', variant: 'green' },
  { date: '22 de Out', place: 'Ambulatório Geral', status: '10/10 Validados', variant: 'green' },
  { date: '21 de Out', place: 'Pronto Socorro', status: 'Grupo de Folga', variant: 'gray' },
]

const STUDENT_CARDS = [
  { id: 1, name: 'Gabriel Santos', time: 'Enviado hoje às 08:45', summary: 'Acompanhamento de paciente com ICC, ajuste de...', status: 'pending' },
  { id: 2, name: 'Mariana Lima', time: 'Enviado hoje às 09:12', summary: 'Realizada anamnese completa em novo paciente na ala...', status: 'pending' },
  { id: 3, name: 'Bruno Oliveira', time: 'VALIDADO ÀS 09:45', summary: '', status: 'validated' },
  { id: 4, name: 'Juliana Costa', time: 'Relatório não enviado', summary: '', status: 'not_sent' },
]

export default function PreceptorValidate() {
  const { t } = useTranslation()
  const navigate = useNavigate()
  const [search, setSearch] = useState('')
  const [filter, setFilter] = useState('pending')

  return (
    <div className="preceptor-validate-layout">
      <aside className="preceptor-validate-sidebar">
        <div className="preceptor-validate-rotation-card">
          <div className="preceptor-validate-rotation-head">
            <span className="preceptor-validate-rotation-badge">{t('preceptorValidate.currentRotation')}</span>
            <span className="preceptor-validate-rotation-date">Out 24, 2023</span>
          </div>
          <h3 className="preceptor-validate-rotation-title">{t('preceptorValidate.rotationName')}</h3>
          <p className="preceptor-validate-rotation-place">{t('preceptorValidate.rotationPlace')}</p>
          <div className="preceptor-validate-validation">
            <p className="preceptor-validate-validation-title">{t('preceptorValidate.validationProgress')}</p>
            <div className="preceptor-validate-validation-bar">
              <div className="preceptor-validate-validation-fill" style={{ width: '60%' }} />
            </div>
            <p className="preceptor-validate-validation-text">6/10</p>
            <p className="preceptor-validate-validation-desc">{t('preceptorValidate.validationDesc')}</p>
          </div>
        </div>

        <div className="preceptor-validate-history-card">
          <h4 className="preceptor-validate-history-title">
            <span className="material-icons">history</span>
            {t('preceptorValidate.groupHistory')}
          </h4>
          <ul className="preceptor-validate-history-list">
            {HISTORY_ITEMS.map((h, i) => (
              <li key={i} className={`preceptor-validate-history-item preceptor-validate-history-item--${h.variant}`}>
                <span className="preceptor-validate-history-dot" />
                <div>
                  <span className="preceptor-validate-history-date">{h.date}</span>
                  <span className="preceptor-validate-history-place">{h.place}</span>
                  <span className="preceptor-validate-history-status">{h.status}</span>
                </div>
              </li>
            ))}
          </ul>
          <button type="button" className="preceptor-validate-export-btn">
            <span className="material-icons">download</span>
            {t('preceptorValidate.exportMonthly')}
          </button>
        </div>
      </aside>

      <main className="preceptor-validate-main">
        <div className="preceptor-validate-toolbar">
          <div className="preceptor-validate-search-wrap">
            <span className="material-icons">search</span>
            <input
              type="search"
              className="preceptor-validate-search"
              placeholder={t('preceptorValidate.searchStudent')}
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
          <button type="button" className="preceptor-validate-filter-btn">
            <span className="material-icons">filter_list</span>
            {t('preceptorValidate.pending')}
          </button>
          <button type="button" className="dashboard-btn dashboard-btn--primary">
            {t('preceptorValidate.validateAll')}
          </button>
        </div>

        <div className="preceptor-validate-cards">
          {STUDENT_CARDS.map((card) => (
            <article key={card.id} className={`preceptor-validate-card preceptor-validate-card--${card.status}`}>
              <div className="preceptor-validate-card-body">
                <div className="preceptor-validate-card-avatar">
                  <span className="material-icons">person</span>
                </div>
                <div className="preceptor-validate-card-info">
                  <h4 className="preceptor-validate-card-name">{card.name}</h4>
                  <p className="preceptor-validate-card-time">{card.time}</p>
                  {card.summary ? <p className="preceptor-validate-card-summary">{card.summary}</p> : null}
                </div>
                <div className="preceptor-validate-card-actions">
                  {card.status === 'pending' && (
                    <>
                      <button type="button" className="preceptor-validate-card-btn preceptor-validate-card-btn--adjust">{t('preceptorValidate.adjust')}</button>
                      <button
                        type="button"
                        className="preceptor-validate-card-btn preceptor-validate-card-btn--confirm"
                        onClick={() => navigate(`/dashboard/validar-presencas/atividade/${card.id}`)}
                      >
                        {t('preceptorValidate.confirm')}
                      </button>
                    </>
                  )}
                  {card.status === 'validated' && (
                    <button
                      type="button"
                      className="preceptor-validate-card-btn preceptor-validate-card-btn--view"
                      onClick={() => navigate(`/dashboard/validar-presencas/relatorio/${card.id}`)}
                    >
                      <span className="material-icons">check_circle</span>
                      {t('preceptorValidate.viewReport')}
                    </button>
                  )}
                  {card.status === 'not_sent' && (
                    <button type="button" className="preceptor-validate-card-btn preceptor-validate-card-btn--waiting" disabled>
                      {t('preceptorValidate.awaitingSubmission')}
                    </button>
                  )}
                </div>
              </div>
            </article>
          ))}
        </div>

        <p className="preceptor-validate-summary">{t('preceptorValidate.showingCount', { showing: 4, total: 10 })}</p>
      </main>
    </div>
  )
}
