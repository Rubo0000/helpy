import { AppProvider, useApp } from './context/AppContext'
import ElderlyView from './components/elderly/ElderlyView'
import CaregiverDashboard from './components/caregiver/CaregiverDashboard'
import Toast from './components/common/Toast'

function AppContent() {
  const { isCaregiverMode } = useApp()

  return (
    <div className="min-h-screen bg-slate-100 flex items-center justify-center font-sans tracking-tight">
      <Toast />
      <main className="w-full max-w-md h-[100dvh] sm:h-[90vh] sm:max-h-[850px] sm:rounded-[2.5rem] bg-white shadow-2xl relative overflow-hidden sm:border-8 sm:border-slate-800 ring-1 ring-slate-900/5">
        <div className="h-full w-full overflow-y-auto overflow-x-hidden scroll-smooth bg-[#f8fafc]">
          {isCaregiverMode ? <CaregiverDashboard /> : <ElderlyView />}
        </div>
      </main>
    </div>
  )
}

function App() {
  return (
    <AppProvider>
      <AppContent />
    </AppProvider>
  )
}

export default App
