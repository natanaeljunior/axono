import { NavLink, Outlet } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import './PreceptorLayout.css'

export default function PreceptorLayout() {
  const { t } = useTranslation()

  return (
    <div className="preceptor-layout">
      <header className="preceptor-layout-header">
        <div className="preceptor-layout-header-inner">
          <div className="preceptor-layout-brand">
            <span className="material-icons preceptor-layout-brand-icon">medical_services</span>
            <span className="preceptor-layout-brand-name">{t('common.brandName')}</span>
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
            <button
              type="button"
              className="preceptor-layout-icon-btn"
              aria-label={t('dashboard.notifications')}
            >
              <span className="material-icons">notifications</span>
            </button>
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
        <Outlet />
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
