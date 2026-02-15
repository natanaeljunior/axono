import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import LanguageSwitcher from '../components/LanguageSwitcher'
import './Login.css'

export default function Login() {
  const { t } = useTranslation()
  const navigate = useNavigate()
  const [showPassword, setShowPassword] = useState(false)
  const [rememberMe, setRememberMe] = useState(false)

  function handleSubmit(e) {
    e.preventDefault()
    // TODO: integrar com auth; por ora redireciona para configuração de primeiro acesso
    navigate('/dashboard')
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
              <img src="/logo.svg" alt="" className="login-brand-logo" width="48" height="48" />
              <span className="login-brand-wordmark">{t('common.brandName')}</span>
            </div>
            <h1>{t('login.title')}</h1>
            <p>{t('login.subtitle')}</p>
          </div>

          <form className="login-form" onSubmit={handleSubmit}>
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

            <button type="submit" className="login-submit">
              {t('login.submit')}
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
