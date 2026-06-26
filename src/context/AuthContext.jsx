import { createContext, useContext, useEffect, useState, useCallback } from 'react'
import { api, getToken, setToken, hasBackend } from '../api/client.js'

const AuthContext = createContext(null)

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [progress, setProgress] = useState({})
  const [loading, setLoading] = useState(true)

  // Restore an existing session on first load.
  useEffect(() => {
    let active = true
    async function bootstrap() {
      if (!getToken()) {
        setLoading(false)
        return
      }
      try {
        const { user } = await api.me()
        const { progress } = await api.getProgress()
        if (active) {
          setUser(user)
          setProgress(progress || {})
        }
      } catch {
        setToken(null)
      } finally {
        if (active) setLoading(false)
      }
    }
    bootstrap()
    return () => { active = false }
  }, [])

  const refreshProgress = useCallback(async () => {
    try {
      const { progress } = await api.getProgress()
      setProgress(progress || {})
    } catch { /* keep current progress on failure */ }
  }, [])

  const completeAuth = useCallback(async ({ token, user }) => {
    setToken(token)
    setUser(user)
    try {
      const { progress } = await api.getProgress()
      setProgress(progress || {})
    } catch { setProgress({}) }
  }, [])

  const signup = useCallback(async (payload) => {
    const res = await api.register(payload)
    await completeAuth(res)
    return res.user
  }, [completeAuth])

  const login = useCallback(async (payload) => {
    const res = await api.login(payload)
    await completeAuth(res)
    return res.user
  }, [completeAuth])

  const logout = useCallback(() => {
    setToken(null)
    setUser(null)
    setProgress({})
  }, [])

  // Record an answered question and optimistically update local progress.
  const recordAnswer = useCallback(async ({ lessonId, questionId, correct }) => {
    setProgress((prev) => {
      const lesson = prev[lessonId] || { answered: {}, completedAt: null }
      return {
        ...prev,
        [lessonId]: {
          ...lesson,
          answered: { ...lesson.answered, [questionId]: { correct, at: new Date().toISOString() } },
        },
      }
    })
    try {
      const { progress } = await api.saveProgress({ lessonId, questionId, correct })
      if (progress) setProgress(progress)
    } catch { /* optimistic state already applied */ }
  }, [])

  const upgradeToPremium = useCallback((updatedUser) => {
    setUser((prev) => ({ ...prev, ...updatedUser, plan: 'premium' }))
  }, [])

  const value = {
    user, progress, loading, hasBackend,
    signup, login, logout, recordAnswer, refreshProgress, upgradeToPremium,
  }
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuth must be used within AuthProvider')
  return ctx
}
