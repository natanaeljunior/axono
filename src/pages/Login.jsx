import { useState } from 'react'
import { useNavigate, Navigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import LanguageSwitcher from '../components/LanguageSwitcher'
import { LOGO_AXONO } from '../constants/brand'
import { useAuth } from '../contexts/AuthContext'
import { useProfile } from '../contexts/ProfileContext'
import { PROFILES } from '../contexts/ProfileContext'
import './Login.css'

const ROLE_TO_PROFILE = {
  COORDENACAO: PROFILES.COORDENACAO,
  DIRETOR: PROFILES.COORDENACAO,
  ALUNO: PROFILES.ALUNO,
  PRECEPTOR: PROFILES.PRECEPTOR,
}

/** Escolhe o perfil inicial a partir das permissões do usuário (prioridade: coordenação > preceptor > aluno). */
function profileFromRoles(roles) {
  const list = Array.isArray(roles) ? roles : []
  if (list.includes('COORDENACAO') || list.includes('DIRETOR')) return PROFILES.COORDENACAO
  if (list.includes('PRECEPTOR')) return PROFILES.PRECEPTOR
  if (list.includes('ALUNO')) return PROFILES.ALUNO
  return PROFILES.COORDENACAO
}

export default function Login() {
  const { t } = useTranslation()
  const navigate = useNavigate()
  const { login, isAuthenticated } = useAuth()
  const { setProfile } = useProfile()
  const [showPassword, setShowPassword] = useState(false)
  const [rememberMe, setRememberMe] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  if (isAuthenticated) {
    return <Navigate to="/dashboard" replace />
  }

  async function handleSubmit(e) {
    e.preventDefault()
    setError('')
    const form = e.target
    const identifier = form.identifier?.value
    const password = form.password?.value

    if (!identifier?.trim()) {
      setError(t('login.identifierRequired') || 'Informe e-mail, matrícula ou CRM.')
      return
    }
    if (!password) {
      setError(t('login.passwordRequired') || 'Informe a senha.')
      return
    }

    setLoading(true)
    try {
      const { user } = await login(identifier, password)
      const profile = profileFromRoles(user.roles)
      setProfile(profile)
      navigate('/dashboard', { replace: true })
    } catch (err) {
      const msg = err.response?.data?.message || err.message || 'Credenciais inválidas.'
      setError(msg)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="login-page">
      <div className="login-bg" aria-hidden>
        <div className="login-bg-base" />
        <div className="login-bg-pattern" />
        <div className="login-bg-blob login-bg-blob--1" />
        <div className="login-bg-blob login-bg-blob--2" />
        <div className="login-bg-blob login-bg-blob--3" />
        <div className="login-bg-blob login-bg-blob--4" />
        <div className="login-bg-glow login-bg-glow--center" />
      </div>

      <main className="login-main">
        <div className="login-card">
          <div className="login-card-header">
            <span />
            <LanguageSwitcher />
          </div>
          <div className="login-brand">
            <div className="login-brand-lockup">
              <img src={LOGO_AXONO} alt="" className="login-brand-logo" width="48" height="48" />
            </div>
            <h1>{t('login.title')}</h1>
            <p>{t('login.subtitle')}</p>
          </div>

          <form className="login-form" onSubmit={handleSubmit}>
            {error && (
              <div className="login-error" role="alert">
                <span className="material-icons">error_outline</span>
                {error}
              </div>
            )}
            <div className="login-field">
              <label htmlFor="identifier">{t('login.identifierLabel')}</label>
              <div className="login-input-wrap">
                <span className="material-icons">badge</span>
                <input
                  id="identifier"
                  name="identifier"
                  type="text"
                  className="login-input"
                  placeholder={t('login.identifierPlaceholder')}
                  autoComplete="username"
                />
              </div>
              <p className="login-field-hint">{t('login.identifierHint')}</p>
            </div>

            <div className="login-field">
              <div className="login-field-row">
                <label htmlFor="password">{t('login.passwordLabel')}</label>
                <a href="#" onClick={(e) => { e.preventDefault(); navigate('/esqueci-senha'); }}>{t('login.forgotPassword')}</a>
              </div>
              <div className="login-input-wrap has-toggle">
                <span className="material-icons">lock</span>
                <input
                  id="password"
                  name="password"
                  type={showPassword ? 'text' : 'password'}
                  className="login-input"
                  placeholder={t('login.passwordPlaceholder')}
                  autoComplete="current-password"
                />
                <button
                  type="button"
                  className="login-toggle-pwd"
                  onClick={() => setShowPassword((v) => !v)}
                  aria-label={showPassword ? t('login.hidePassword') : t('login.showPassword')}
                >
                  <span className="material-icons">
                    {showPassword ? 'visibility' : 'visibility_off'}
                  </span>
                </button>
              </div>
            </div>

            <div className="login-remember">
              <input
                id="remember-me"
                name="remember-me"
                type="checkbox"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
              />
              <label htmlFor="remember-me">{t('login.rememberMe')}</label>
            </div>

            <button type="submit" className="login-submit" disabled={loading}>
              {loading ? (t('login.submitting') || 'Entrando...') : t('login.submit')}
            </button>
          </form>

          <div className="login-footer">
            <p>
              <span className="material-icons">help_outline</span>
              {t('login.needHelp')}{' '}
              <a href="#">{t('common.contactSupport')}</a>
            </p>
          </div>
        </div>

        <div className="login-meta">
          <p>{t('common.meta')}</p>
        </div>
      </main>
    </div>
  )
}
