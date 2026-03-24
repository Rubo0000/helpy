import { useState } from 'react'
import ElderlyView from './components/ElderlyView'
import CaregiverDashboard from './components/CaregiverDashboard'

const initialMedicinesMock = [
  { id: 1, name: 'Atorvastatina', time: '08:00', taken: true },
  { id: 2, name: 'Losartan', time: '14:00', taken: false },
  { id: 3, name: 'Omeprazol', time: '20:00', taken: false },
]

function App() {
  const [isCaregiverMode, setIsCaregiverMode] = useState(false)
  const [medicines, setMedicines] = useState(initialMedicinesMock)

  return (
    <div className="min-h-screen bg-slate-100 flex items-center justify-center font-sans tracking-tight">
      <main className="w-full max-w-md h-[100dvh] sm:h-[90vh] sm:max-h-[850px] sm:rounded-[2.5rem] bg-white shadow-2xl relative overflow-hidden sm:border-8 sm:border-slate-800 ring-1 ring-slate-900/5">
        <div className="h-full w-full overflow-y-auto overflow-x-hidden scroll-smooth bg-[#f8fafc]">
          {isCaregiverMode ? (
            <CaregiverDashboard
              setIsCaregiverMode={setIsCaregiverMode}
              medicines={medicines}
            />
          ) : (
            <ElderlyView
              setIsCaregiverMode={setIsCaregiverMode}
              medicines={medicines}
              setMedicines={setMedicines}
            />
          )}
        </div>
      </main>
    </div>
  )
}

export default App
