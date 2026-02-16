import { Outlet, useLocation } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import AppHeader from '../components/AppHeader'
import '../pages/Dashboard.css'
import './StudentLayout.css'

const NAV_ALUNO = [
  { key: 'studentHome', path: '/dashboard', labelKey: 'dashboard.nav.studentHome' },
]

export default function StudentLayout() {
  const { t } = useTranslation()
  const location = useLocation()
  const isCertPage = location.pathname.includes('/certificacao') || location.pathname === '/dashboard' || location.pathname === '/dashboard/'

  return (
    <div className={`student-layout ${isCertPage ? 'student-layout--cert-page' : ''}`}>
      <AppHeader
        variant={isCertPage ? 'minimal' : 'full'}
        navItems={NAV_ALUNO}
        className="student-layout-header student-layout-header--global"
      />

      <main className="student-layout-main">
        <div className="student-layout-main-inner">
          <Outlet />
        </div>
      </main>

      {!isCertPage && (
        <button
          type="button"
          className="student-layout-help-btn"
          aria-label={t('login.needHelp')}
        >
          <span className="material-icons">help</span>
        </button>
      )}
    </div>
  )
}
