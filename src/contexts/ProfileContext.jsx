import { createContext, useContext, useState, useCallback } from 'react'

const STORAGE_KEY = 'axono_profile'

export const PROFILES = {
  COORDENACAO: 'coordenacao',
  ALUNO: 'aluno',
  PRECEPTOR: 'preceptor',
}

const stored = () => {
  try {
    const v = localStorage.getItem(STORAGE_KEY)
    if (v && Object.values(PROFILES).includes(v)) return v
  } catch (_) {}
  return PROFILES.COORDENACAO
}

const ProfileContext = createContext(null)

export function ProfileProvider({ children }) {
  const [profile, setProfileState] = useState(stored)

  const setProfile = useCallback((value) => {
    const next = Object.values(PROFILES).includes(value) ? value : PROFILES.COORDENACAO
    setProfileState(next)
    try {
      localStorage.setItem(STORAGE_KEY, next)
    } catch (_) {}
  }, [])

  return (
    <ProfileContext.Provider value={{ profile, setProfile }}>
      {children}
    </ProfileContext.Provider>
  )
}

export function useProfile() {
  const ctx = useContext(ProfileContext)
  if (!ctx) throw new Error('useProfile must be used within ProfileProvider')
  return ctx
}
