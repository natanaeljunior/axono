import { NavLink, Outlet, useNavigate, useLocation } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { useProfile, PROFILES } from '../contexts/ProfileContext'
import '../pages/Dashboard.css'
import './StudentLayout.css'

export default function StudentLayout() {
  const { t } = useTranslation()
  const navigate = useNavigate()
  const location = useLocation()
  const { profile, setProfile } = useProfile()
  const isCertPage = location.pathname.includes('/certificacao') || location.pathname === '/dashboard' || location.pathname === '/dashboard/'

  const handleProfileChange = (e) => {
    const value = e.target.value
    setProfile(value)
    navigate('/dashboard')
  }

  return (
    <div className={`student-layout ${isCertPage ? 'student-layout--cert-page' : ''}`}>
      {!isCertPage && (
      <header className="student-layout-header">
        <div className="student-layout-header-inner">
          <div className="student-layout-brand">
            <img src="/logo-axono-blue.png" alt="" className="student-layout-brand-logo" />
          </div>
          <nav className="student-layout-nav">
            <NavLink
              to="/dashboard"
              end
              className={({ isActive }) =>
                `student-layout-nav-link ${isActive ? 'student-layout-nav-link--active' : ''}`
              }
            >
              {t('dashboard.nav.studentHome')}
            </NavLink>
            <NavLink
              to="/dashboard/cronograma"
              className={({ isActive }) =>
                `student-layout-nav-link ${isActive ? 'student-layout-nav-link--active' : ''}`
              }
            >
              {t('studentLayout.schedule')}
            </NavLink>
            <NavLink
              to="/dashboard/notas"
              className={({ isActive }) =>
                `student-layout-nav-link ${isActive ? 'student-layout-nav-link--active' : ''}`
              }
            >
              {t('studentLayout.grades')}
            </NavLink>
            <NavLink
              to="/dashboard/suporte"
              className={({ isActive }) =>
                `student-layout-nav-link ${isActive ? 'student-layout-nav-link--active' : ''}`
              }
            >
              {t('studentLayout.support')}
            </NavLink>
          </nav>
          <div className="student-layout-header-right">
            <div className="student-layout-profile-switcher-wrap">
              <span className="material-icons student-layout-profile-switcher-icon">person</span>
              <select
                className="student-layout-profile-switcher"
                value={profile}
                onChange={handleProfileChange}
                aria-label={t('profileSwitcher.label')}
              >
                <option value={PROFILES.COORDENACAO}>{t('profileSwitcher.coordenacao')}</option>
                <option value={PROFILES.ALUNO}>{t('profileSwitcher.aluno')}</option>
                <option value={PROFILES.PRECEPTOR}>{t('profileSwitcher.preceptor')}</option>
              </select>
              <span className="material-icons student-layout-profile-switcher-arrow">expand_more</span>
            </div>
            <div className="student-layout-user">
              <div className="student-layout-user-info">
                <p className="student-layout-user-name">{t('profileSwitcher.userAluno')}</p>
                <p className="student-layout-user-role">{t('studentLayout.internSemester')}</p>
              </div>
              <div className="student-layout-avatar">AS</div>
            </div>
          </div>
        </div>
      </header>
      )}

      <main className="student-layout-main">
        <Outlet />
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
