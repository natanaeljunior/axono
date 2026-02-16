import { useEffect } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { useProfile, PROFILES } from '../contexts/ProfileContext'
import { useAuth } from '../contexts/AuthContext'
import { LOGO_AXONO } from '../constants/brand'
import PersonaSelect from './PersonaSelect'
import './AppHeader.css'

function allowedProfiles(roles) {
  const list = Array.isArray(roles) ? roles : []
  const out = []
  if (list.some((r) => r === 'COORDENACAO' || r === 'DIRETOR')) out.push(PROFILES.COORDENACAO)
  if (list.includes('ALUNO')) out.push(PROFILES.ALUNO)
  if (list.includes('PRECEPTOR')) out.push(PROFILES.PRECEPTOR)
  return out.length ? out : [PROFILES.COORDENACAO]
}

function userRoleLabel(profile, t) {
  if (profile === PROFILES.ALUNO) return t('profileSwitcher.roleAluno')
  if (profile === PROFILES.PRECEPTOR) return t('profileSwitcher.rolePreceptor')
  return t('dashboard.userRole')
}

/**
 * Header global do sistema (aluno, preceptor, coordenação).
 * variant: 'minimal' = logo + persona + logout | 'full' = + nav + user
 * navItems: [{ key, path, labelKey }] para links no centro
 */
export default function AppHeader({ variant = 'full', navItems = [], className = '' }) {
  const { t } = useTranslation()
  const navigate = useNavigate()
  const { profile, setProfile } = useProfile()
  const { user, logout } = useAuth()
  const allowed = allowedProfiles(user?.roles)

  useEffect(() => {
    if (allowed.length && !allowed.includes(profile)) {
      setProfile(allowed[0])
    }
  }, [allowed, profile, setProfile])

  const handleProfileChange = (value) => {
    setProfile(value)
    navigate('/dashboard')
  }

  const isMinimal = variant === 'minimal'

  return (
    <header className={`app-header ${isMinimal ? 'app-header--minimal' : ''} ${className}`.trim()}>
      <div className="app-header-inner">
        <div className="app-header-brand">
          <img src={LOGO_AXONO} alt="" className="app-header-logo" />
        </div>

        {!isMinimal && navItems.length > 0 && (
          <nav className="app-header-nav">
            {navItems.map((item) => (
              <NavLink
                key={item.key}
                to={item.path}
                end={item.path === '/dashboard'}
                className={({ isActive }) =>
                  `app-header-nav-link ${isActive ? 'app-header-nav-link--active' : ''}`
                }
              >
                {item.icon && <span className="material-icons">{item.icon}</span>}
                <span>{item.labelKey ? t(item.labelKey) : item.label}</span>
              </NavLink>
            ))}
          </nav>
        )}

        <div className="app-header-right">
          <PersonaSelect
            allowed={allowed}
            value={allowed.includes(profile) ? profile : allowed[0]}
            onChange={handleProfileChange}
            aria-label={t('profileSwitcher.label')}
            className="app-header-persona"
          />

          {!isMinimal && (
            <div className="app-header-user">
              <div className="app-header-user-info">
                <p className="app-header-user-name">{user?.name || t('profileSwitcher.userAluno')}</p>
                <p className="app-header-user-role">{userRoleLabel(profile, t)}</p>
              </div>
              <div className="app-header-avatar">
                {user?.name?.split(' ').map((n) => n[0]).slice(0, 2).join('').toUpperCase() || '—'}
              </div>
            </div>
          )}

          <button
            type="button"
            className="app-header-logout"
            onClick={() => { logout(); navigate('/login'); }}
            title="Sair"
            aria-label="Sair"
          >
            <span className="material-icons">logout</span>
          </button>
        </div>
      </div>
    </header>
  )
}
