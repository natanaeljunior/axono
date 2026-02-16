import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import LanguageSwitcher from '../components/LanguageSwitcher'
import './Login.css'
import './ForgotPassword.css'

export default function ForgotPassword() {
  const { t } = useTranslation()
  const navigate = useNavigate()
  const [email, setEmail] = useState('')
  const [sent, setSent] = useState(false)
  const [loading, setLoading] = useState(false)

  function handleSubmit(e) {
    e.preventDefault()
    setLoading(true)
    // TODO: integrar com API de recuperação de senha
    setTimeout(() => {
      setLoading(false)
      setSent(true)
    }, 800)
  }

  if (sent) {
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
                <img src="/logo-axono-blue.png" alt="" className="login-brand-logo" width="48" height="48" />
                <span className="login-brand-wordmark">{t('common.brandName')}</span>
              </div>
              <h1>{t('forgot.successTitle')}</h1>
              <p>{t('forgot.successMessage')}</p>
            </div>

            <div className="forgot-success-actions">
              <button type="button" className="login-submit" onClick={() => navigate('/login')}>
                {t('forgot.backToLogin')}
              </button>
              <button
                type="button"
                className="forgot-back-link"
                onClick={() => { setSent(false); setEmail(''); }}
              >
                {t('forgot.sendToAnother')}
              </button>
            </div>

            <div className="login-footer">
              <p>
                <span className="material-icons">help_outline</span>
                {t('forgot.didNotReceive')} <a href="#">{t('common.contactSupport')}</a>
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
              <img src="/logo-axono-blue.png" alt="" className="login-brand-logo" width="48" height="48" />
              <span className="login-brand-wordmark">{t('common.brandName')}</span>
            </div>
            <h1>{t('forgot.title')}</h1>
            <p>{t('forgot.subtitle')}</p>
          </div>

          <form className="login-form forgot-form" onSubmit={handleSubmit}>
            <div className="login-field">
              <label htmlFor="forgot-email">{t('forgot.emailLabel')}</label>
              <div className="login-input-wrap">
                <span className="material-icons">mail</span>
                <input
                  id="forgot-email"
                  name="email"
                  type="email"
                  className="login-input"
                  placeholder={t('forgot.emailPlaceholder')}
                  autoComplete="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
            </div>

            <button type="submit" className="login-submit" disabled={loading}>
              {loading ? t('forgot.sending') : t('forgot.submit')}
            </button>

            <div className="forgot-back-wrap">
              <button type="button" className="forgot-back-link" onClick={() => navigate('/login')}>
                <span className="material-icons">arrow_back</span>
                {t('forgot.backToLogin')}
              </button>
            </div>
          </form>

          <div className="login-footer">
            <p>
              <span className="material-icons">help_outline</span>
              {t('forgot.rememberedPassword')} <a href="#" onClick={(e) => { e.preventDefault(); navigate('/login'); }}>{t('forgot.doLogin')}</a>
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
