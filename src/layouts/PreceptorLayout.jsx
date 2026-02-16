import { Outlet, NavLink } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import AppHeader from '../components/AppHeader'
import './PreceptorLayout.css'

const NAV_PRECEPTOR = [
  { key: 'preceptorHome', path: '/dashboard', labelKey: 'dashboard.nav.preceptorHome' },
  { key: 'preceptorValidate', path: '/dashboard/validar-presencas', labelKey: 'dashboard.nav.preceptorValidate' },
  { key: 'meuGrupo', path: '/dashboard/meu-grupo', labelKey: 'preceptorHome.myGroup' },
]

export default function PreceptorLayout() {
  const { t } = useTranslation()

  return (
    <div className="preceptor-layout">
      <AppHeader
        variant="full"
        navItems={NAV_PRECEPTOR}
        className="preceptor-layout-header preceptor-layout-header--global"
      />

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
