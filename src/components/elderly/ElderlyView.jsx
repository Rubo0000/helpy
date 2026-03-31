import { useState } from 'react'
import { useApp } from '../../context/AppContext'
import ElderlyHeader from './ElderlyHeader'
import HealthStatusCard from './HealthStatusCard'
import MedicationCard from './MedicationCard'
import AppointmentsCard from './AppointmentsCard'
import EmergencyContacts from './EmergencyContacts'
import EmergencyButton from './EmergencyButton'
import PinModal from '../common/PinModal'

function ElderlyView() {
  const { setIsCaregiverMode } = useApp()
  const [showPinModal, setShowPinModal] = useState(false)

  return (
    <div className="relative min-h-full px-5 pt-8 pb-40 flex flex-col fade-in">
      {showPinModal && (
        <PinModal
          onSuccess={() => { setShowPinModal(false); setIsCaregiverMode(true) }}
          onClose={() => setShowPinModal(false)}
        />
      )}

      <ElderlyHeader onCaregiverAccess={() => setShowPinModal(true)} />

      <section className="space-y-6 flex-1 stagger-group">
        <div className="mb-4 stagger-item" style={{ '--delay': '60ms' }}>
          <h1 className="text-[2.75rem] leading-tight font-extrabold text-slate-800 tracking-tight">
            Hola, Papá <span className="inline-block wave-emoji origin-bottom-right">👋</span>
          </h1>
          <p className="text-xl text-slate-500 font-medium mt-1">¿Cómo te encuentras hoy?</p>
        </div>

        <div className="stagger-item" style={{ '--delay': '120ms' }}><HealthStatusCard /></div>
        <div className="stagger-item" style={{ '--delay': '180ms' }}><MedicationCard /></div>
        <div className="stagger-item" style={{ '--delay': '240ms' }}><AppointmentsCard /></div>
        <div className="stagger-item" style={{ '--delay': '300ms' }}><EmergencyContacts /></div>
      </section>

      <EmergencyButton />
    </div>
  )
}

export default ElderlyView
