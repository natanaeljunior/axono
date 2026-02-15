import { NavLink, Outlet, useLocation } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import '../pages/Dashboard.css'

const NAV_ITEMS = [
  { key: 'dashboard', icon: 'dashboard', path: '/dashboard' },
  { key: 'students', icon: 'school', path: '/dashboard/alunos' },
  { key: 'groups', icon: 'groups', path: '/dashboard/grupos' },
  { key: 'preceptors', icon: 'medical_services', path: '/dashboard/preceptores' },
  { key: 'hospitals', icon: 'local_hospital', path: '/dashboard/hospitais' },
  { key: 'rotations', icon: 'calendar_month', path: '/dashboard/rotacoes' },
  { key: 'reports', icon: 'assessment', path: '/dashboard/relatorios' },
]

export default function DashboardLayout() {
  const { t } = useTranslation()
  const location = useLocation()
  const isStudents = location.pathname.includes('/alunos')
  const isGroups = location.pathname.includes('/grupos')
  const isRotations = location.pathname.includes('/rotacoes')
  const isPreceptors = location.pathname.includes('/preceptores')
  const isHospitals = location.pathname.includes('/hospitais')
  const isParams = location.pathname.includes('/parametros')
  const isReports = location.pathname.includes('/relatorios')
  const breadcrumb = isStudents
    ? t('students.breadcrumb')
    : isGroups
      ? t('groups.breadcrumb')
      : isRotations
        ? t('rotations.breadcrumb')
        : isPreceptors
          ? t('preceptors.breadcrumb')
          : isHospitals
            ? t('hospitals.breadcrumb')
            : isParams
              ? t('params.breadcrumb')
              : isReports
                ? t('reports.breadcrumb')
                : t('dashboard.breadcrumb')

  return (
    <div className="dashboard-layout">
      <aside className="dashboard-sidebar">
        <div className="dashboard-sidebar-brand">
          <img src="/logo.svg" alt="" className="dashboard-sidebar-logo" width="32" height="32" />
          <span className="dashboard-sidebar-brand-name">{t('common.brandName')}</span>
        </div>
        <nav className="dashboard-nav">
          {NAV_ITEMS.map((item) => (
            <NavLink
              key={item.key}
              to={item.path}
              end={item.path === '/dashboard'}
              className={({ isActive }) =>
                `dashboard-nav-item ${isActive ? 'dashboard-nav-item--active' : ''}`
              }
            >
              <span className="material-icons">{item.icon}</span>
              <span>{t(`dashboard.nav.${item.key}`)}</span>
            </NavLink>
          ))}
        </nav>
        <div className="dashboard-sidebar-divider">
          <span>{t('dashboard.nav.settingsSection')}</span>
        </div>
        <nav className="dashboard-nav">
          <NavLink
            to="/dashboard/parametros"
            className={({ isActive }) =>
              `dashboard-nav-item ${isActive ? 'dashboard-nav-item--active' : ''}`
            }
          >
            <span className="material-icons">settings</span>
            <span>{t('dashboard.nav.params')}</span>
          </NavLink>
        </nav>
        <div className="dashboard-user">
          <div className="dashboard-user-avatar">CM</div>
          <div className="dashboard-user-info">
            <span className="dashboard-user-name">{t('dashboard.userName')}</span>
            <span className="dashboard-user-role">{t('dashboard.userRole')}</span>
          </div>
        </div>
      </aside>

      <main className="dashboard-main">
        <header className={`dashboard-header ${isParams ? 'dashboard-header--params' : ''}`}>
          <div className="dashboard-header-left">
            <h1 className="dashboard-breadcrumb">{breadcrumb}</h1>
            {isParams && (
              <>
                <span className="dashboard-header-divider" aria-hidden />
                <span className="dashboard-header-context">
                  <span className="material-icons dashboard-header-context-icon">admin_panel_settings</span>
                  {t('params.adminAccess')}
                </span>
              </>
            )}
          </div>
          <div className="dashboard-header-actions">
            {isParams ? (
              <>
                <button type="button" className="dashboard-btn dashboard-btn--secondary dashboard-btn--header">
                  {t('params.cancel')}
                </button>
                <button type="button" className="dashboard-btn dashboard-btn--primary dashboard-btn--header">
                  {t('params.saveChanges')}
                </button>
              </>
            ) : (
              <>
                <div className="dashboard-search-wrap">
                  <span className="material-icons dashboard-search-icon">search</span>
                  <input
                    type="search"
                    className="dashboard-search"
                    placeholder={t('dashboard.searchPlaceholder')}
                    aria-label={t('dashboard.searchPlaceholder')}
                  />
                </div>
                <button type="button" className="dashboard-icon-btn dashboard-icon-btn--badge" aria-label={t('dashboard.notifications')}>
                  <span className="material-icons">notifications</span>
                </button>
                <div className="dashboard-cycle-select-wrap">
                  <select className="dashboard-cycle-select" aria-label={t('dashboard.cycle')}>
                    <option>{t('dashboard.cycleValue')}</option>
                  </select>
                  <span className="material-icons dashboard-cycle-arrow">expand_more</span>
                </div>
              </>
            )}
          </div>
        </header>
        <div className={isParams ? 'dashboard-main-outlet dashboard-main-outlet--params' : 'dashboard-main-outlet'}>
          <Outlet />
        </div>
      </main>
    </div>
  )
}
