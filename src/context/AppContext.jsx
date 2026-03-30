import { createContext, useContext, useState } from 'react'
import { initialMedicines } from '../data/mockData'

const AppContext = createContext(null)

export function AppProvider({ children }) {
  const [isCaregiverMode, setIsCaregiverMode] = useState(false)
  const [medicines, setMedicines] = useState(initialMedicines)

  return (
    <AppContext.Provider value={{ isCaregiverMode, setIsCaregiverMode, medicines, setMedicines }}>
      {children}
    </AppContext.Provider>
  )
}

export function useApp() {
  const context = useContext(AppContext)
  if (!context) throw new Error('useApp must be used within AppProvider')
  return context
}
