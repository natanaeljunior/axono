import { Routes, Route, Navigate } from 'react-router-dom'
import Login from './pages/Login'
import ForgotPassword from './pages/ForgotPassword'
import FirstAccess from './pages/FirstAccess'
import DashboardLayout from './layouts/DashboardLayout'
import DashboardHomeSwitcher from './pages/DashboardHomeSwitcher'
import Students from './pages/Students'
import Groups from './pages/Groups'
import Rotations from './pages/Rotations'
import Preceptors from './pages/Preceptors'
import Hospitals from './pages/Hospitals'
import Parameters from './pages/Parameters'
import Reports from './pages/Reports'
import StudentDailyForm from './pages/StudentDailyForm'
import PreceptorValidate from './pages/PreceptorValidate'
import PreceptorValidateDetail from './pages/PreceptorValidateDetail'
import PreceptorReportDetail from './pages/PreceptorReportDetail'
import PreceptorSignReport from './pages/PreceptorSignReport'
import PreceptorMyGroup from './pages/PreceptorMyGroup'
import StudentReportsCertification from './pages/StudentReportsCertification'
import Placeholder from './pages/Placeholder'

function App() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/login" replace />} />
      <Route path="/login" element={<Login />} />
      <Route path="/esqueci-senha" element={<ForgotPassword />} />
      <Route path="/primeiro-acesso" element={<FirstAccess />} />
      <Route path="/dashboard" element={<DashboardLayout />}>
        <Route index element={<DashboardHomeSwitcher />} />
        <Route path="alunos" element={<Students />} />
        <Route path="grupos" element={<Groups />} />
        <Route path="rotacoes" element={<Rotations />} />
        <Route path="preceptores" element={<Preceptors />} />
        <Route path="hospitais" element={<Hospitals />} />
        <Route path="parametros" element={<Parameters />} />
        <Route path="relatorios" element={<Reports />} />
        <Route path="formulario-diario" element={<StudentDailyForm />} />
        <Route path="validar-presencas/atividade/:id" element={<PreceptorValidateDetail />} />
        <Route path="validar-presencas/assinar/:id" element={<PreceptorSignReport />} />
        <Route path="validar-presencas/relatorio/:id" element={<PreceptorReportDetail />} />
        <Route path="validar-presencas" element={<PreceptorValidate />} />
        <Route path="meu-grupo" element={<PreceptorMyGroup />} />
        <Route path="certificacao" element={<StudentReportsCertification />} />
        <Route path="cronograma" element={<Placeholder title="Cronograma" />} />
        <Route path="notas" element={<Placeholder title="Notas" />} />
        <Route path="suporte" element={<Placeholder title="Suporte" />} />
      </Route>
      <Route path="*" element={<Navigate to="/login" replace />} />
    </Routes>
  )
}

export default App
