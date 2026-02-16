import { useState, useMemo } from 'react'
import { useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import LanguageSwitcher from '../components/LanguageSwitcher'
import './Login.css'
import './FirstAccess.css'

function getPasswordStrength(password) {
  if (!password) return { level: 0, label: '' }
  let score = 0
  if (password.length >= 8) score++
  if (/[A-Z]/.test(password)) score++
  if (/[0-9]/.test(password) || /[^A-Za-z0-9]/.test(password)) score++
  if (password.length >= 12) score++
  const labels = ['', 'weak', 'medium', 'strong', 'very_strong']
  return { level: Math.min(score, 4), label: labels[score] }
}

export default function FirstAccess() {
  const { t } = useTranslation()
  const navigate = useNavigate()
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirm, setShowConfirm] = useState(false)
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [acceptTerms, setAcceptTerms] = useState(false)
  const [touched, setTouched] = useState({ password: false, confirm: false })

  // Dados simulados (viriam do auth/cadastro)
  const user = {
    fullName: 'DRA. MARIANA SILVA OLIVEIRA',
    cpf: '***.452.188-**',
    matricula: '2023004589',
  }

  const strength = useMemo(() => getPasswordStrength(password), [password])
  const passwordsMatch = confirmPassword && password === confirmPassword
  const confirmError = touched.confirm && confirmPassword && !passwordsMatch

  const canSubmit =
    password.length >= 8 &&
    /[A-Z]/.test(password) &&
    (/[0-9]/.test(password) || /[^A-Za-z0-9]/.test(password)) &&
    passwordsMatch &&
    acceptTerms

  function handleSubmit(e) {
    e.preventDefault()
    if (!canSubmit) return
    // TODO: chamar API para ativar conta
    navigate('/login')
  }

  return (
    <div className="login-page first-access-page">
      <div className="login-bg" aria-hidden>
        <div className="login-bg-base" />
        <div className="login-bg-pattern" />
        <div className="login-bg-blob login-bg-blob--1" />
        <div className="login-bg-blob login-bg-blob--2" />
        <div className="login-bg-blob login-bg-blob--3" />
        <div className="login-bg-blob login-bg-blob--4" />
        <div className="login-bg-glow login-bg-glow--center" />
      </div>

      <main className="first-access-main">
        <div className="first-access-card">
          <div className="first-access-card-header">
            <div className="first-access-brand">
              <img src="/logo-axono-blue.png" alt="" className="first-access-logo" width="40" height="40" />
              <div>
                <span className="first-access-brand-title">{t('firstAccess.brandTitle')}</span>
                <span className="first-access-brand-subtitle">{t('firstAccess.brandSubtitle')}</span>
              </div>
            </div>
            <LanguageSwitcher />
          </div>

          <div className="first-access-content">
            <h1 className="first-access-title">{t('firstAccess.title')}</h1>
            <p className="first-access-intro">{t('firstAccess.intro')}</p>

            <form onSubmit={handleSubmit} className="first-access-form">
              {/* Seção 1: Confirmação de identidade */}
              <section className="first-access-section">
                <div className="first-access-step">
                  <span className="first-access-step-num">1</span>
                  <h2 className="first-access-section-title">{t('firstAccess.identityTitle')}</h2>
                </div>
                <div className="first-access-fields">
                  <div className="first-access-field full">
                    <label>{t('firstAccess.fullName')}</label>
                    <input type="text" className="first-access-input" value={user.fullName} readOnly />
                  </div>
                  <div className="first-access-field">
                    <label>{t('firstAccess.cpf')}</label>
                    <input type="text" className="first-access-input" value={user.cpf} readOnly />
                  </div>
                  <div className="first-access-field">
                    <label>{t('firstAccess.matriculaCrm')}</label>
                    <input type="text" className="first-access-input" value={user.matricula} readOnly />
                  </div>
                </div>
                <p className="first-access-note">{t('firstAccess.preRegisteredNote')}</p>
              </section>

              {/* Seção 2: Segurança da conta */}
              <section className="first-access-section">
                <div className="first-access-step">
                  <span className="first-access-step-num">2</span>
                  <h2 className="first-access-section-title">{t('firstAccess.securityTitle')}</h2>
                </div>

                <div className="first-access-field">
                  <label>{t('firstAccess.newPassword')}</label>
                  <div className="login-input-wrap has-toggle">
                    <span className="material-icons">lock</span>
                    <input
                      type={showPassword ? 'text' : 'password'}
                      className="first-access-input first-access-password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      onBlur={() => setTouched((t) => ({ ...t, password: true }))}
                      placeholder="********"
                    />
                    <button
                      type="button"
                      className="login-toggle-pwd"
                      onClick={() => setShowPassword((v) => !v)}
                      aria-label={showPassword ? t('login.hidePassword') : t('login.showPassword')}
                    >
                      <span className="material-icons">{showPassword ? 'visibility' : 'visibility_off'}</span>
                    </button>
                  </div>
                  {password && (
                    <div className="first-access-strength">
                      <span className="first-access-strength-label">{t('firstAccess.strengthLabel')}: </span>
                      <div className="first-access-strength-bar">
                        {[1, 2, 3, 4].map((i) => (
                          <span key={i} className={`first-access-strength-segment ${i <= strength.level ? 'filled' : ''}`} />
                        ))}
                      </div>
                      <span className="first-access-strength-text">{strength.label ? t(`firstAccess.strength.${strength.label}`) : ''}</span>
                    </div>
                  )}
                </div>

                <div className="first-access-field">
                  <label>{t('firstAccess.confirmPassword')}</label>
                  <div className="login-input-wrap has-toggle">
                    <span className="material-icons">lock</span>
                    <input
                      type={showConfirm ? 'text' : 'password'}
                      className={`first-access-input ${confirmError ? 'error' : ''}`}
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      onBlur={() => setTouched((t) => ({ ...t, confirm: true }))}
                      placeholder="********"
                    />
                    <button
                      type="button"
                      className="login-toggle-pwd"
                      onClick={() => setShowConfirm((v) => !v)}
                      aria-label={showConfirm ? t('login.hidePassword') : t('login.showPassword')}
                    >
                      <span className="material-icons">{showConfirm ? 'visibility' : 'visibility_off'}</span>
                    </button>
                  </div>
                  {confirmError && <p className="first-access-error">{t('firstAccess.passwordMismatch')}</p>}
                </div>

                <div className="first-access-requirements">
                  <span className="material-icons first-access-requirements-icon">info</span>
                  <ul>
                    <li>{t('firstAccess.requirementMin')}</li>
                    <li>{t('firstAccess.requirementUpper')}</li>
                    <li>{t('firstAccess.requirementNumber')}</li>
                  </ul>
                </div>

                <div className="first-access-terms">
                  <input
                    id="accept-terms"
                    type="checkbox"
                    checked={acceptTerms}
                    onChange={(e) => setAcceptTerms(e.target.checked)}
                  />
                  <label htmlFor="accept-terms">
                    {t('firstAccess.termsPrefix')}{' '}
                    <a href="#">{t('firstAccess.termsLink')}</a> {t('firstAccess.termsAnd')}{' '}
                    <a href="#">{t('firstAccess.privacyLink')}</a> {t('firstAccess.termsSuffix')}
                  </label>
                </div>

                <button type="submit" className="first-access-submit" disabled={!canSubmit}>
                  {t('firstAccess.submit')}
                  <span className="material-icons">arrow_forward</span>
                </button>
              </section>
            </form>
          </div>

          <p className="first-access-support">
            {t('firstAccess.dataIncorrect')}{' '}
            <a href="#">{t('firstAccess.contactSupport')}</a>
            <span className="material-icons first-access-external">open_in_new</span>
          </p>
        </div>

        <footer className="first-access-footer">
          <p className="first-access-meta">{t('firstAccess.footerCopy')}</p>
          <div className="first-access-footer-links">
            <a href="#">{t('firstAccess.help')}</a>
            <a href="#">{t('firstAccess.security')}</a>
            <a href="#">{t('firstAccess.lgpd')}</a>
          </div>
        </footer>
      </main>
    </div>
  )
}
