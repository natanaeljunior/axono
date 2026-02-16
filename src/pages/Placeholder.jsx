import { useTranslation } from 'react-i18next'

export default function Placeholder({ title }) {
  const { t } = useTranslation()
  return (
    <div style={{ padding: '2rem', textAlign: 'center' }}>
      <h1 style={{ marginBottom: '0.5rem', fontSize: '1.5rem' }}>{title}</h1>
      <p style={{ color: '#64748b' }}>{t('common.comingSoon', 'Em breve.')}</p>
    </div>
  )
}
