import { useTranslation } from 'react-i18next'
import './LanguageSwitcher.css'

const LANGUAGES = [
  { code: 'pt-BR', label: 'PT' },
  { code: 'es', label: 'ES' },
]

export default function LanguageSwitcher() {
  const { i18n } = useTranslation()

  function handleChange(lng) {
    i18n.changeLanguage(lng)
    localStorage.setItem('axono-lang', lng)
  }

  return (
    <div className="language-switcher" role="group" aria-label="Idioma">
      {LANGUAGES.map(({ code, label }) => (
        <button
          key={code}
          type="button"
          className={`language-switcher-btn ${i18n.language === code ? 'active' : ''}`}
          onClick={() => handleChange(code)}
          aria-pressed={i18n.language === code}
        >
          {label}
        </button>
      ))}
    </div>
  )
}
