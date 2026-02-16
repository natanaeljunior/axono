import { Outlet, useLocation } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { useProfile, PROFILES } from '../contexts/ProfileContext'
import AppHeader from '../components/AppHeader'
import PreceptorLayout from './PreceptorLayout'
import StudentLayout from './StudentLayout'
import '../pages/Dashboard.css'

const NAV_COORDENACAO_ITEMS = [
  { key: 'dashboard', icon: 'dashboard', path: '/dashboard', labelKey: 'dashboard.nav.dashboard' },
  { key: 'students', icon: 'school', path: '/dashboard/alunos', labelKey: 'dashboard.nav.students' },
  { key: 'groups', icon: 'groups', path: '/dashboard/grupos', labelKey: 'dashboard.nav.groups' },
  { key: 'preceptors', icon: 'medical_services', path: '/dashboard/preceptores', labelKey: 'dashboard.nav.preceptors' },
  { key: 'hospitals', icon: 'local_hospital', path: '/dashboard/hospitais', labelKey: 'dashboard.nav.hospitals' },
  { key: 'rotations', icon: 'calendar_month', path: '/dashboard/rotacoes', labelKey: 'dashboard.nav.rotations' },
  { key: 'reports', icon: 'assessment', path: '/dashboard/relatorios', labelKey: 'dashboard.nav.reports' },
  { key: 'params', icon: 'settings', path: '/dashboard/parametros', labelKey: 'dashboard.nav.params' },
]

export default function DashboardLayout() {
  const { t } = useTranslation()
  const location = useLocation()
  const { profile } = useProfile()

  const isStudents = location.pathname.includes('/alunos')
  const isGroups = location.pathname.includes('/grupos')
  const isRotations = location.pathname.includes('/rotacoes')
  const isPreceptors = location.pathname.includes('/preceptores')
  const isHospitals = location.pathname.includes('/hospitais')
  const isParams = location.pathname.includes('/parametros')
  const isReports = location.pathname.includes('/relatorios')
  const isFormularioDiario = location.pathname.includes('/formulario-diario')
  const isValidarPresencas = location.pathname.includes('/validar-presencas')
  const isCertificacao = location.pathname.includes('/certificacao')
  const isDashboardIndex = location.pathname === '/dashboard' || location.pathname === '/dashboard/'

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
                : isFormularioDiario
                  ? t('studentForm.breadcrumb')
                  : isValidarPresencas
                    ? t('preceptorValidate.breadcrumb')
                    : isCertificacao
                      ? t('studentCert.breadcrumb')
                      : profile === PROFILES.ALUNO
                        ? t('studentHome.breadcrumb')
                        : profile === PROFILES.PRECEPTOR
                          ? t('preceptorHome.breadcrumb')
                          : t('dashboard.breadcrumb')

  if (profile === PROFILES.ALUNO) {
    return (
      <StudentLayout>
        <Outlet />
      </StudentLayout>
    )
  }

  if (profile === PROFILES.PRECEPTOR) {
    return (
      <PreceptorLayout>
        <Outlet />
      </PreceptorLayout>
    )
  }

  return (
    <div className="dashboard-layout dashboard-layout--header-top">
      <AppHeader variant="full" navItems={NAV_COORDENACAO_ITEMS} />
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
              profile === PROFILES.COORDENACAO && (
                <div className="dashboard-cycle-select-wrap">
                  <select className="dashboard-cycle-select" aria-label={t('dashboard.cycle')}>
                    <option>{t('dashboard.cycleValue')}</option>
                  </select>
                  <span className="material-icons dashboard-cycle-arrow">expand_more</span>
                </div>
              )
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
