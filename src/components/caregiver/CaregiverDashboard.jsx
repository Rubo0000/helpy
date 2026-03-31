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

      <main className="px-5 pt-6 space-y-6 stagger-group">
        <div className="stagger-item" style={{ '--delay': '60ms' }}><StatusCard /></div>
        <div className="stagger-item" style={{ '--delay': '120ms' }}><QuickSummary /></div>
        <div className="stagger-item" style={{ '--delay': '180ms' }}><DailyMonitoring /></div>
        <div className="stagger-item" style={{ '--delay': '240ms' }}><MedicationModule /></div>
        <div className="stagger-item" style={{ '--delay': '300ms' }}><AppointmentsModule /></div>
        <div className="stagger-item" style={{ '--delay': '360ms' }}><ActivityLog /></div>
      </main>

    </div>
  )
}

export default CaregiverDashboard
