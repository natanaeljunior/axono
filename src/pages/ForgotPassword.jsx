import { useState } from 'react'
import './Login.css'
import './ForgotPassword.css'

export default function ForgotPassword({ onBack }) {
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
            <div className="login-brand">
              <div className="login-brand-lockup">
                <img src="/logo.svg" alt="" className="login-brand-logo" width="48" height="48" />
                <span className="login-brand-wordmark">ResidencyFlow</span>
              </div>
              <h1>Verifique seu e-mail</h1>
              <p>Se o endereço estiver cadastrado, você receberá um link para redefinir sua senha.</p>
            </div>

            <div className="forgot-success-actions">
              <button type="button" className="login-submit" onClick={onBack}>
                Voltar ao login
              </button>
              <button
                type="button"
                className="forgot-back-link"
                onClick={() => { setSent(false); setEmail(''); }}
              >
                Enviar para outro e-mail
              </button>
            </div>

            <div className="login-footer">
              <p>
                <span className="material-icons">help_outline</span>
                Não recebeu? <a href="#">Entre em contato com o suporte</a>
              </p>
            </div>
          </div>

          <div className="login-meta">
            <p>© 2024 ResidencyFlow • Faculdade de Medicina • Sistema Internato v4.2.0</p>
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
          <div className="login-brand">
            <div className="login-brand-lockup">
              <img src="/logo.svg" alt="" className="login-brand-logo" width="48" height="48" />
              <span className="login-brand-wordmark">ResidencyFlow</span>
            </div>
            <h1>Recuperar senha</h1>
            <p>Informe seu e-mail e enviaremos um link para redefinir sua senha.</p>
          </div>

          <form className="login-form forgot-form" onSubmit={handleSubmit}>
            <div className="login-field">
              <label htmlFor="forgot-email">E-mail</label>
              <div className="login-input-wrap">
                <span className="material-icons">mail</span>
                <input
                  id="forgot-email"
                  name="email"
                  type="email"
                  className="login-input"
                  placeholder="nome@faculdade.edu.br"
                  autoComplete="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
            </div>

            <button type="submit" className="login-submit" disabled={loading}>
              {loading ? 'Enviando…' : 'Enviar link de recuperação'}
            </button>

            <div className="forgot-back-wrap">
              <button type="button" className="forgot-back-link" onClick={onBack}>
                <span className="material-icons">arrow_back</span>
                Voltar ao login
              </button>
            </div>
          </form>

          <div className="login-footer">
            <p>
              <span className="material-icons">help_outline</span>
              Lembrou a senha? <a href="#" onClick={(e) => { e.preventDefault(); onBack?.(); }}>Fazer login</a>
            </p>
          </div>
        </div>

        <div className="login-meta">
          <p>© 2024 ResidencyFlow • Faculdade de Medicina • Sistema Internato v4.2.0</p>
        </div>
      </main>
    </div>
  )
}
