import { useState } from 'react'
import './Login.css'

export default function Login({ onForgotPassword }) {
  const [showPassword, setShowPassword] = useState(false)
  const [rememberMe, setRememberMe] = useState(false)

  function handleSubmit(e) {
    e.preventDefault()
    // TODO: integrar com auth
  }

  return (
    <div className="login-page">
      {/* Background - design system */}
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
          {/* Brand: logo + wordmark integrados (fonte da marca) */}
          <div className="login-brand">
            <div className="login-brand-lockup">
              <img src="/logo.svg" alt="" className="login-brand-logo" width="48" height="48" />
              <span className="login-brand-wordmark">ResidencyFlow</span>
            </div>
            <h1>Portal do Internato</h1>
            <p>Plataforma de Gestão Médica Acadêmica</p>
          </div>

          {/* Formulário */}
          <form className="login-form" onSubmit={handleSubmit}>
            <div className="login-field">
              <label htmlFor="identifier">E-mail, matrícula ou CRM</label>
              <div className="login-input-wrap">
                <span className="material-icons">badge</span>
                <input
                  id="identifier"
                  name="identifier"
                  type="text"
                  className="login-input"
                  placeholder="Ex: email@faculdade.edu.br, matrícula ou CRM"
                  autoComplete="username"
                />
              </div>
              <p className="login-field-hint">
                Alunos: matrícula ou e-mail · Preceptores: CRM ou e-mail · Coordenação: e-mail ou matrícula
              </p>
            </div>

            <div className="login-field">
              <div className="login-field-row">
                <label htmlFor="password">Senha</label>
                <a href="#" onClick={(e) => { e.preventDefault(); onForgotPassword?.(); }}>Esqueceu a senha?</a>
              </div>
              <div className="login-input-wrap has-toggle">
                <span className="material-icons">lock</span>
                <input
                  id="password"
                  name="password"
                  type={showPassword ? 'text' : 'password'}
                  className="login-input"
                  placeholder="••••••••"
                  autoComplete="current-password"
                />
                <button
                  type="button"
                  className="login-toggle-pwd"
                  onClick={() => setShowPassword((v) => !v)}
                  aria-label={showPassword ? 'Ocultar senha' : 'Mostrar senha'}
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
              <label htmlFor="remember-me">Manter conectado</label>
            </div>

            <button type="submit" className="login-submit">
              ENTRAR NO PORTAL
            </button>
          </form>

          <div className="login-footer">
            <p>
              <span className="material-icons">help_outline</span>
              Precisa de ajuda?{' '}
              <a href="#">Entre em contato com o suporte</a>
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
