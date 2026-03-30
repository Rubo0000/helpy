import { Plus } from 'lucide-react'
import CaregiverHeader from './CaregiverHeader'
import StatusCard from './StatusCard'
import QuickSummary from './QuickSummary'
import DailyMonitoring from './DailyMonitoring'
import MedicationModule from './MedicationModule'
import AppointmentsModule from './AppointmentsModule'
import ActivityLog from './ActivityLog'

function CaregiverDashboard() {
  return (
    <div className="min-h-full pb-24 fade-in bg-slate-50">
      <CaregiverHeader />

      <main className="px-5 pt-6 space-y-6">
        <StatusCard />
        <QuickSummary />
        <DailyMonitoring />
        <MedicationModule />
        <AppointmentsModule />
        <ActivityLog />
      </main>

      <div className="fixed bottom-6 right-6 z-30">
        <button
          type="button"
          className="flex h-[3.5rem] w-[3.5rem] items-center justify-center rounded-full bg-blue-600 text-white shadow-[0_8px_20px_rgb(37,99,235,0.4)] hover:bg-blue-700 hover:scale-105 transition-all active:scale-95"
          aria-label="Añadir cita"
        >
          <Plus className="h-7 w-7" />
        </button>
      </div>
    </div>
  )
}

export default CaregiverDashboard
