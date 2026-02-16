import { useProfile, PROFILES } from '../contexts/ProfileContext'
import DashboardHome from './DashboardHome'
import PreceptorHome from './PreceptorHome'
import StudentReportsCertification from './StudentReportsCertification'

export default function DashboardHomeSwitcher() {
  const { profile } = useProfile()

  if (profile === PROFILES.ALUNO) return <StudentReportsCertification />
  if (profile === PROFILES.PRECEPTOR) return <PreceptorHome />
  return <DashboardHome />
}
