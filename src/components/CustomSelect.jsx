import { useState, useRef, useEffect, useMemo } from 'react'
import './CustomSelect.css'

const LIST_ID_PREFIX = 'custom-select-list-'

/**
 * Select customizado: trigger + lista estilizável, com acessibilidade (teclado + ARIA).
 */
export default function CustomSelect({
  id,
  options = [],
  value,
  onChange,
  placeholder = '—',
  className = '',
  'aria-label': ariaLabel,
  'aria-labelledby': ariaLabelledby,
}) {
  const [open, setOpen] = useState(false)
  const [highlightedIndex, setHighlightedIndex] = useState(0)
  const ref = useRef(null)
  const listRef = useRef(null)

  const items = useMemo(
    () => [{ value: '', label: placeholder }, ...options],
    [placeholder, options]
  )

  const selectedOption = options.find((o) => String(o.value) === String(value))
  const displayLabel = selectedOption ? selectedOption.label : placeholder
  const selectedIndex = items.findIndex((it) => String(it.value) === String(value))
  const effectiveHighlighted = selectedIndex >= 0 ? selectedIndex : 0

  const listId = `${LIST_ID_PREFIX}${id || 'select'}`

  const openList = () => {
    setOpen(true)
    setHighlightedIndex(selectedIndex >= 0 ? selectedIndex : 0)
  }

  const closeList = () => setOpen(false)

  const selectByIndex = (index) => {
    if (index < 0 || index >= items.length) return
    const item = items[index]
    onChange(item.value)
    closeList()
  }

  useEffect(() => {
    if (!open) return
    const onDocClick = (e) => {
      if (ref.current && !ref.current.contains(e.target)) closeList()
    }
    document.addEventListener('click', onDocClick)
    return () => document.removeEventListener('click', onDocClick)
  }, [open])

  useEffect(() => {
    if (!open) return
    const onKeyDown = (e) => {
      switch (e.key) {
        case 'Escape':
          e.preventDefault()
          closeList()
          return
        case 'ArrowDown':
          e.preventDefault()
          setHighlightedIndex((i) => (i < items.length - 1 ? i + 1 : 0))
          return
        case 'ArrowUp':
          e.preventDefault()
          setHighlightedIndex((i) => (i > 0 ? i - 1 : items.length - 1))
          return
        case 'Enter':
        case ' ':
          e.preventDefault()
          selectByIndex(highlightedIndex)
          return
        default:
          return
      }
    }
    document.addEventListener('keydown', onKeyDown)
    return () => document.removeEventListener('keydown', onKeyDown)
  }, [open, highlightedIndex, items])

  useEffect(() => {
    if (open && listRef.current) {
      const opt = listRef.current.querySelector(`[data-index="${highlightedIndex}"]`)
      opt?.scrollIntoView({ block: 'nearest' })
    }
  }, [open, highlightedIndex])

  const handleTriggerKeyDown = (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault()
      setOpen((o) => !o)
      return
    }
    if (e.key === 'ArrowDown' || e.key === 'ArrowUp') {
      e.preventDefault()
      if (!open) {
        openList()
        return
      }
      setHighlightedIndex((i) => (e.key === 'ArrowDown' ? Math.min(i + 1, items.length - 1) : Math.max(i - 1, 0)))
    }
  }

  const isPlaceholder = value === '' || value == null

  return (
    <div className={`custom-select ${open ? 'open' : ''} ${className}`.trim()} ref={ref}>
      <button
        type="button"
        id={id}
        className={`custom-select-trigger ${isPlaceholder ? 'custom-select-trigger--placeholder' : ''}`.trim()}
        onClick={() => setOpen((o) => !o)}
        onKeyDown={handleTriggerKeyDown}
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-controls={listId}
        aria-activedescendant={open ? `custom-select-option-${highlightedIndex}` : undefined}
        aria-label={ariaLabel}
        aria-labelledby={ariaLabelledby}
      >
        <span className="custom-select-value">{displayLabel}</span>
        <span className="custom-select-chevron material-icons" aria-hidden>expand_more</span>
      </button>
      {open && (
        <ul
          ref={listRef}
          id={listId}
          className="custom-select-list"
          role="listbox"
          aria-labelledby={ariaLabelledby || id}
          tabIndex={-1}
        >
          {items.map((item, index) => (
            <li
              key={index}
              role="option"
              id={`custom-select-option-${index}`}
              data-index={index}
              className={`custom-select-option ${index === highlightedIndex ? 'custom-select-option--highlighted' : ''} ${String(item.value) === String(value) ? 'custom-select-option--selected' : ''}`.trim()}
              aria-selected={String(item.value) === String(value)}
              onClick={() => selectByIndex(index)}
              onMouseEnter={() => setHighlightedIndex(index)}
            >
              {item.label}
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}
