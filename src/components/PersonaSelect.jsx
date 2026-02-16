import { useState, useRef, useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { PROFILES } from '../contexts/ProfileContext'
import './PersonaSelect.css'

const OPTIONS = [
  { value: PROFILES.COORDENACAO, labelKey: 'profileSwitcher.coordenacao' },
  { value: PROFILES.ALUNO, labelKey: 'profileSwitcher.aluno' },
  { value: PROFILES.PRECEPTOR, labelKey: 'profileSwitcher.preceptor' },
]

/**
 * Dropdown customizado para troca de persona (Coordenação / Aluno / Preceptor).
 * Lista abre abaixo do trigger com espaçamento, ícone em cada opção, sem sobreposição.
 */
export default function PersonaSelect({ allowed, value, onChange, className = '', 'aria-label': ariaLabel }) {
  const { t } = useTranslation()
  const [open, setOpen] = useState(false)
  const ref = useRef(null)

  const current = allowed.includes(value) ? value : allowed[0]
  const options = OPTIONS.filter((o) => allowed.includes(o.value))

  useEffect(() => {
    if (!open) return
    const onDocClick = (e) => {
      if (ref.current && !ref.current.contains(e.target)) setOpen(false)
    }
    const onEscape = (e) => {
      if (e.key === 'Escape') setOpen(false)
    }
    document.addEventListener('click', onDocClick)
    document.addEventListener('keydown', onEscape)
    return () => {
      document.removeEventListener('click', onDocClick)
      document.removeEventListener('keydown', onEscape)
    }
  }, [open])

  const handleSelect = (val) => {
    if (val !== current) onChange(val)
    setOpen(false)
  }

  const label = (val) => {
    const o = OPTIONS.find((opt) => opt.value === val)
    return o ? t(o.labelKey) : ''
  }

  return (
    <div
      className={`persona-select ${open ? 'persona-select--open' : ''} ${className}`.trim()}
      ref={ref}
    >
      <button
        type="button"
        className="persona-select-trigger"
        onClick={() => setOpen((v) => !v)}
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-label={ariaLabel || t('profileSwitcher.label')}
      >
        <span className="material-icons persona-select-icon" aria-hidden>person</span>
        <span className="persona-select-label">{label(current)}</span>
        <span className="material-icons persona-select-arrow" aria-hidden>expand_more</span>
      </button>

      {open && (
        <div
          className="persona-select-dropdown"
          role="listbox"
          aria-activedescendant={current}
        >
          {options.map((opt) => (
            <button
              key={opt.value}
              type="button"
              role="option"
              id={opt.value}
              aria-selected={opt.value === current}
              className={`persona-select-option ${opt.value === current ? 'persona-select-option--selected' : ''}`}
              onClick={() => handleSelect(opt.value)}
            >
              <span className="material-icons persona-select-option-icon">person</span>
              <span>{t(opt.labelKey)}</span>
              {opt.value === current && (
                <span className="material-icons persona-select-option-check">check</span>
              )}
            </button>
          ))}
        </div>
      )}
    </div>
  )
}
