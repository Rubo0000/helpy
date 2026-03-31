import { createContext, useContext, useState, useCallback } from 'react'
import { initialMedicines, activityLog as initialActivityLog } from '../data/mockData'

const AppContext = createContext(null)

const MEDICINES_KEY = 'helpy_medicines'
const MEDICINES_DATE_KEY = 'helpy_medicines_date'
const ACTIVITY_LOG_KEY = 'helpy_activity_log'
const ACTIVITY_DATE_KEY = 'helpy_activity_date'

function todayKey() {
  return new Date().toISOString().slice(0, 10)
}

function loadMedicines() {
  try {
    if (localStorage.getItem(MEDICINES_DATE_KEY) === todayKey()) {
      const stored = localStorage.getItem(MEDICINES_KEY)
      if (stored) return JSON.parse(stored)
    }
    // New day: reset taken status automatically
    return initialMedicines.map((m) => ({ ...m, taken: false }))
  } catch {
    return initialMedicines
  }
}

function loadActivityLog() {
  try {
    if (localStorage.getItem(ACTIVITY_DATE_KEY) === todayKey()) {
      const stored = localStorage.getItem(ACTIVITY_LOG_KEY)
      if (stored) return JSON.parse(stored)
    }
    return initialActivityLog
  } catch {
    return initialActivityLog
  }
}

export function AppProvider({ children }) {
  const [isCaregiverMode, setIsCaregiverMode] = useState(false)
  const [medicines, setMedicinesState] = useState(loadMedicines)
  const [activityLog, setActivityLogState] = useState(loadActivityLog)
  const [toasts, setToasts] = useState([])

  const setMedicines = useCallback((updater) => {
    setMedicinesState((prev) => {
      const next = typeof updater === 'function' ? updater(prev) : updater
      try {
        localStorage.setItem(MEDICINES_KEY, JSON.stringify(next))
        localStorage.setItem(MEDICINES_DATE_KEY, todayKey())
      } catch {}
      return next
    })
  }, [])

  const addLogEntry = useCallback((text, tone = 'info') => {
    const when = new Date().toLocaleTimeString('es-ES', { hour: '2-digit', minute: '2-digit' })
    setActivityLogState((prev) => {
      const next = [{ id: Date.now(), text, when, tone }, ...prev].slice(0, 30)
      try {
        localStorage.setItem(ACTIVITY_LOG_KEY, JSON.stringify(next))
        localStorage.setItem(ACTIVITY_DATE_KEY, todayKey())
      } catch {}
      return next
    })
  }, [])

  const addToast = useCallback((message, type = 'info') => {
    const id = Date.now()
    setToasts((prev) => [...prev, { id, message, type }])
    setTimeout(() => setToasts((prev) => prev.filter((t) => t.id !== id)), 3500)
  }, [])

  const removeToast = useCallback((id) => {
    setToasts((prev) => prev.filter((t) => t.id !== id))
  }, [])

  return (
    <AppContext.Provider value={{
      isCaregiverMode, setIsCaregiverMode,
      medicines, setMedicines,
      activityLog, addLogEntry,
      toasts, addToast, removeToast,
    }}>
      {children}
    </AppContext.Provider>
  )
}

export function useApp() {
  const context = useContext(AppContext)
  if (!context) throw new Error('useApp must be used within AppProvider')
  return context
}
