import { NavLink, Outlet, useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { useProfile, PROFILES } from '../contexts/ProfileContext'
import { LOGO_AXONO } from '../constants/brand'
import './PreceptorLayout.css'

export default function PreceptorLayout() {
  const { t } = useTranslation()
  const navigate = useNavigate()
  const { profile, setProfile } = useProfile()

  const handleProfileChange = (e) => {
    const value = e.target.value
    setProfile(value)
    navigate('/dashboard')
  }

  return (
    <div className="preceptor-layout">
      <header className="preceptor-layout-header">
        <div className="preceptor-layout-header-inner">
          <div className="preceptor-layout-brand">
            <img src={LOGO_AXONO} alt="" className="preceptor-layout-brand-logo" />
          </div>
          <nav className="preceptor-layout-nav">
            <NavLink
              to="/dashboard"
              end
              className={({ isActive }) =>
                `preceptor-layout-nav-link ${isActive ? 'preceptor-layout-nav-link--active' : ''}`
              }
            >
              {t('dashboard.nav.preceptorHome')}
            </NavLink>
            <NavLink
              to="/dashboard/validar-presencas"
              className={({ isActive }) =>
                `preceptor-layout-nav-link ${isActive ? 'preceptor-layout-nav-link--active' : ''}`
              }
            >
              {t('dashboard.nav.preceptorValidate')}
            </NavLink>
            <NavLink
              to="/dashboard/meu-grupo"
              className={({ isActive }) =>
                `preceptor-layout-nav-link ${isActive ? 'preceptor-layout-nav-link--active' : ''}`
              }
            >
              {t('preceptorHome.myGroup')}
            </NavLink>
          </nav>
          <div className="preceptor-layout-header-right">
            <div className="preceptor-layout-profile-switcher-wrap">
              <span className="material-icons preceptor-layout-profile-switcher-icon">person</span>
              <select
                className="preceptor-layout-profile-switcher"
                value={profile}
                onChange={handleProfileChange}
                aria-label={t('profileSwitcher.label')}
              >
                <option value={PROFILES.COORDENACAO}>{t('profileSwitcher.coordenacao')}</option>
                <option value={PROFILES.ALUNO}>{t('profileSwitcher.aluno')}</option>
                <option value={PROFILES.PRECEPTOR}>{t('profileSwitcher.preceptor')}</option>
              </select>
              <span className="material-icons preceptor-layout-profile-switcher-arrow">expand_more</span>
            </div>
            <div className="preceptor-layout-user">
              <div className="preceptor-layout-user-info">
                <p className="preceptor-layout-user-name">{t('profileSwitcher.userPreceptor')}</p>
                <p className="preceptor-layout-user-role">{t('profileSwitcher.rolePreceptor')}</p>
              </div>
              <div className="preceptor-layout-avatar">RM</div>
            </div>
          </div>
        </div>
      </header>

      <main className="preceptor-layout-main">
        <div className="preceptor-layout-main-inner">
          <Outlet />
        </div>
      </main>

      <div className="preceptor-layout-bottom-nav">
        <NavLink
          to="/dashboard"
          end
          className={({ isActive }) =>
            `preceptor-layout-bottom-nav-item ${isActive ? 'preceptor-layout-bottom-nav-item--active' : ''}`
          }
        >
          <span className="material-icons">home</span>
          <span>{t('dashboard.nav.preceptorHome')}</span>
        </NavLink>
        <NavLink
          to="/dashboard/validar-presencas"
          className={({ isActive }) =>
            `preceptor-layout-bottom-nav-item ${isActive ? 'preceptor-layout-bottom-nav-item--active' : ''}`
          }
        >
          <span className="material-icons">how_to_reg</span>
          <span>{t('preceptorLayout.validateShort', 'Validar')}</span>
        </NavLink>
        <NavLink
          to="/dashboard/meu-grupo"
          className={({ isActive }) =>
            `preceptor-layout-bottom-nav-item ${isActive ? 'preceptor-layout-bottom-nav-item--active' : ''}`
          }
        >
          <span className="material-icons">groups</span>
          <span>{t('preceptorHome.myGroup', 'Meu grupo')}</span>
        </NavLink>
        <button type="button" className="preceptor-layout-bottom-nav-item">
          <span className="material-icons">person</span>
          <span>{t('preceptorLayout.profile', 'Perfil')}</span>
        </button>
      </div>
    </div>
  )
}
