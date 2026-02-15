import { useProfile, PROFILES } from '../contexts/ProfileContext'
import DashboardHome from './DashboardHome'
import StudentHome from './StudentHome'
import PreceptorHome from './PreceptorHome'

export default function DashboardHomeSwitcher() {
  const { profile } = useProfile()

  if (profile === PROFILES.ALUNO) return <StudentHome />
  if (profile === PROFILES.PRECEPTOR) return <PreceptorHome />
  return <DashboardHome />
}
