import { useState } from 'react'
import { useTranslation } from 'react-i18next'

const PARAMS_NAV = [
  { key: 'users', icon: 'manage_accounts', labelKey: 'navUsers' },
  { key: 'calendar', icon: 'calendar_month', labelKey: 'navCalendar' },
  { key: 'specialties', icon: 'medical_information', labelKey: 'navSpecialties' },
  { key: 'audit', icon: 'security_update_good', labelKey: 'navAudit' },
  { key: 'notifications', icon: 'mail', labelKey: 'navNotifications' },
  { key: 'integrations', icon: 'api', labelKey: 'navIntegrations' },
]

const MANAGERS = [
  { id: 1, name: 'Ricardo Moreira', email: 'ricardo.moreira@faculdade.edu.br', initials: 'RM', roleKey: 'roleCoordination' },
  { id: 2, name: 'Fabiana Barros', email: 'fabiana.ti@faculdade.edu.br', initials: 'FB', roleKey: 'roleAdminIT' },
]

const AUDIT_ROWS = [
  { dateTime: 'Hoje, 14:22', user: 'Fabiana Barros', action: 'Alterou permissões do grupo "Coordenação"', moduleKey: 'moduleSecurity' },
  { dateTime: 'Ontem, 09:15', user: 'Ricardo Moreira', action: 'Importou calendário 2025.1', moduleKey: 'moduleCalendar' },
]

export default function Parameters() {
  const { t } = useTranslation()
  const [activeSection, setActiveSection] = useState('users')
  const [mfaEnabled, setMfaEnabled] = useState(true)
  const [sessionExpiry, setSessionExpiry] = useState('30')
  const [ipValue, setIpValue] = useState('192.168.1.0/24')

  return (
    <div className="params-layout">
      <aside className="params-sub-nav">
        <nav className="params-sub-nav-inner">
          {PARAMS_NAV.map((item) => (
            <button
              key={item.key}
              type="button"
              className={`params-sub-nav-btn ${activeSection === item.key ? 'params-sub-nav-btn--active' : ''}`}
              onClick={() => setActiveSection(item.key)}
            >
              <span className="material-icons params-sub-nav-icon">{item.icon}</span>
              <span>{t(`params.${item.labelKey}`)}</span>
            </button>
          ))}
        </nav>
      </aside>

      <div className="params-content">
        <div className="params-content-inner">
          {activeSection === 'users' && (
            <>
              <div className="params-section-head">
                <h2 className="params-section-title">{t('params.usersTitle')}</h2>
                <p className="params-section-desc">{t('params.usersDesc')}</p>
              </div>

              <div className="params-cards">
                <div className="params-card">
                  <div className="params-card-header">
                    <h3 className="params-card-title">
                      <span className="material-icons params-card-title-icon">admin_panel_settings</span>
                      {t('params.teamTitle')}
                    </h3>
                    <button type="button" className="params-card-action">
                      + {t('params.addManager')}
                    </button>
                  </div>
                  <div className="params-card-body params-card-body--divided">
                    {MANAGERS.map((m) => (
                      <div key={m.id} className="params-manager-row">
                        <div className="params-manager-info">
                          <span className="params-manager-avatar">{m.initials}</span>
                          <div>
                            <p className="params-manager-name">{m.name}</p>
                            <p className="params-manager-email">{m.email}</p>
                          </div>
                        </div>
                        <div className="params-manager-meta">
                          <span className={`params-role-pill params-role-pill--${m.roleKey === 'roleAdminIT' ? 'purple' : 'blue'}`}>
                            {t(`params.${m.roleKey}`)}
                          </span>
                          <button type="button" className="params-manager-menu" aria-label={t('dashboard.actions')}>
                            <span className="material-icons">more_vert</span>
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="params-card">
                  <h3 className="params-card-title params-card-title--standalone">{t('params.securityTitle')}</h3>
                  <div className="params-security">
                    <div className="params-security-row">
                      <div>
                        <p className="params-security-label">{t('params.mfaLabel')}</p>
                        <p className="params-security-hint">{t('params.mfaHint')}</p>
                      </div>
                      <label className="params-toggle">
                        <input
                          type="checkbox"
                          className="params-toggle-input"
                          checked={mfaEnabled}
                          onChange={(e) => setMfaEnabled(e.target.checked)}
                        />
                        <span className="params-toggle-slider" />
                      </label>
                    </div>
                    <div className="params-security-row">
                      <div>
                        <p className="params-security-label">{t('params.sessionLabel')}</p>
                        <p className="params-security-hint">{t('params.sessionHint')}</p>
                      </div>
                      <select
                        className="params-select"
                        value={sessionExpiry}
                        onChange={(e) => setSessionExpiry(e.target.value)}
                        aria-label={t('params.sessionLabel')}
                      >
                        <option value="30">30 minutos</option>
                        <option value="60">1 hora</option>
                        <option value="240">4 horas</option>
                      </select>
                    </div>
                    <div className="params-security-ip">
                      <p className="params-security-label">{t('params.ipLabel')}</p>
                      <div className="params-ip-row">
                        <input
                          type="text"
                          className="params-ip-input"
                          value={ipValue}
                          onChange={(e) => setIpValue(e.target.value)}
                          placeholder="192.168.1.0/24"
                          aria-label={t('params.ipLabel')}
                        />
                        <button type="button" className="params-ip-btn">
                          {t('params.addIp')}
                        </button>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="params-card">
                  <div className="params-card-header">
                    <h3 className="params-card-title">
                      <span className="material-icons params-card-title-icon params-card-title-icon--amber">history</span>
                      {t('params.auditTitle')}
                    </h3>
                    <a href="#" className="params-card-action">
                      {t('params.viewFullLog')}
                    </a>
                  </div>
                  <div className="params-audit-wrap">
                    <table className="params-audit-table">
                      <thead>
                        <tr>
                          <th className="params-audit-th">{t('params.auditDateTime')}</th>
                          <th className="params-audit-th">{t('params.auditUser')}</th>
                          <th className="params-audit-th">{t('params.auditAction')}</th>
                          <th className="params-audit-th">{t('params.auditModule')}</th>
                        </tr>
                      </thead>
                      <tbody>
                        {AUDIT_ROWS.map((row, i) => (
                          <tr key={i} className="params-audit-tr">
                            <td className="params-audit-td params-audit-td--muted">{row.dateTime}</td>
                            <td className="params-audit-td params-audit-td--name">{row.user}</td>
                            <td className="params-audit-td">{row.action}</td>
                            <td className="params-audit-td">
                              <span className="params-module-badge">{t(`params.${row.moduleKey}`)}</span>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </>
          )}

          {activeSection !== 'users' && (
            <div className="params-section-head">
              <h2 className="params-section-title">{t(`params.${PARAMS_NAV.find((n) => n.key === activeSection)?.labelKey || 'navUsers'}`)}</h2>
              <p className="params-section-desc">{t('params.comingSoon')}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
