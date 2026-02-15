import { Routes, Route, Navigate } from 'react-router-dom'
import Login from './pages/Login'
import ForgotPassword from './pages/ForgotPassword'
import FirstAccess from './pages/FirstAccess'
import DashboardLayout from './layouts/DashboardLayout'
import DashboardHome from './pages/DashboardHome'
import Students from './pages/Students'
import Groups from './pages/Groups'

function App() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/login" replace />} />
      <Route path="/login" element={<Login />} />
      <Route path="/esqueci-senha" element={<ForgotPassword />} />
      <Route path="/primeiro-acesso" element={<FirstAccess />} />
      <Route path="/dashboard" element={<DashboardLayout />}>
        <Route index element={<DashboardHome />} />
        <Route path="alunos" element={<Students />} />
        <Route path="grupos" element={<Groups />} />
      </Route>
      <Route path="*" element={<Navigate to="/login" replace />} />
    </Routes>
  )
}

export default App
