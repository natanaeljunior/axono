import { useState } from 'react'
import Login from './pages/Login'
import ForgotPassword from './pages/ForgotPassword'

function App() {
  const [screen, setScreen] = useState('login')

  if (screen === 'forgot') {
    return <ForgotPassword onBack={() => setScreen('login')} />
  }

  return <Login onForgotPassword={() => setScreen('forgot')} />
}

export default App
