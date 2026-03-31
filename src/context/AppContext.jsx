import { createContext, useContext, useState, useCallback } from 'react'
import { initialMedicines, activityLog as initialActivityLog } from '../data/mockData'

const AppContext = createContext(null)

const MEDICINES_KEY = 'helpy_medicines'
const MEDICINES_DATE_KEY = 'helpy_medicines_date'
const ACTIVITY_LOG_KEY = 'helpy_activity_log'
const ACTIVITY_DATE_KEY = 'helpy_activity_date'
const HYDRATION_KEY = 'helpy_hydration'
const HYDRATION_DATE_KEY = 'helpy_hydration_date'
const SYMPTOMS_KEY = 'helpy_symptoms'
const SYMPTOMS_DATE_KEY = 'helpy_symptoms_date'

function todayKey() {
  return new Date().toISOString().slice(0, 10)
}

function loadFromStorage(key, dateKey, fallback, parse = JSON.parse) {
  try {
    if (localStorage.getItem(dateKey) === todayKey()) {
      const stored = localStorage.getItem(key)
      if (stored !== null) return parse(stored)
    }
  } catch {}
  return fallback
}

function saveToStorage(key, dateKey, value) {
  try {
    localStorage.setItem(key, JSON.stringify(value))
    localStorage.setItem(dateKey, todayKey())
  } catch {}
}

function loadMedicines() {
  try {
    if (localStorage.getItem(MEDICINES_DATE_KEY) === todayKey()) {
      const stored = localStorage.getItem(MEDICINES_KEY)
      if (stored) return JSON.parse(stored)
    }
    return initialMedicines.map((m) => ({ ...m, taken: false }))
  } catch {
    return initialMedicines
  }
}

export function AppProvider({ children }) {
  const [isCaregiverMode, setIsCaregiverMode] = useState(false)
  const [medicines, setMedicinesState] = useState(loadMedicines)
  const [activityLog, setActivityLogState] = useState(() =>
    loadFromStorage(ACTIVITY_LOG_KEY, ACTIVITY_DATE_KEY, initialActivityLog)
  )
  const [hydration, setHydrationState] = useState(() =>
    loadFromStorage(HYDRATION_KEY, HYDRATION_DATE_KEY, 0, Number)
  )
  const [symptoms, setSymptomsState] = useState(() =>
    loadFromStorage(SYMPTOMS_KEY, SYMPTOMS_DATE_KEY, [])
  )
  const [toasts, setToasts] = useState([])

  const setMedicines = useCallback((updater) => {
    setMedicinesState((prev) => {
      const next = typeof updater === 'function' ? updater(prev) : updater
      saveToStorage(MEDICINES_KEY, MEDICINES_DATE_KEY, next)
      return next
    })
  }, [])

  const addMedicine = useCallback((name, time) => {
    setMedicinesState((prev) => {
      const next = [...prev, { id: Date.now(), name, time, taken: false }]
      saveToStorage(MEDICINES_KEY, MEDICINES_DATE_KEY, next)
      return next
    })
  }, [])

  const removeMedicine = useCallback((id) => {
    setMedicinesState((prev) => {
      const next = prev.filter((m) => m.id !== id)
      saveToStorage(MEDICINES_KEY, MEDICINES_DATE_KEY, next)
      return next
    })
  }, [])

  const addLogEntry = useCallback((text, tone = 'info') => {
    const when = new Date().toLocaleTimeString('es-ES', { hour: '2-digit', minute: '2-digit' })
    setActivityLogState((prev) => {
      const next = [{ id: Date.now(), text, when, tone }, ...prev].slice(0, 30)
      saveToStorage(ACTIVITY_LOG_KEY, ACTIVITY_DATE_KEY, next)
      return next
    })
  }, [])

  const setHydration = useCallback((value) => {
    const next = Math.max(0, Math.min(12, value))
    setHydrationState(next)
    saveToStorage(HYDRATION_KEY, HYDRATION_DATE_KEY, next)
  }, [])

  const toggleSymptom = useCallback((symptom) => {
    setSymptomsState((prev) => {
      const next = prev.includes(symptom)
        ? prev.filter((s) => s !== symptom)
        : [...prev, symptom]
      saveToStorage(SYMPTOMS_KEY, SYMPTOMS_DATE_KEY, next)
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
      medicines, setMedicines, addMedicine, removeMedicine,
      activityLog, addLogEntry,
      hydration, setHydration,
      symptoms, toggleSymptom,
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
