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

    </div>
  )
}

export default CaregiverDashboard
