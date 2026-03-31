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

      <section className="space-y-6 flex-1">
        <div className="mb-4">
          <h1 className="text-[2.75rem] leading-tight font-extrabold text-slate-800 tracking-tight">
            Hola, Papá <span className="inline-block wave-emoji origin-bottom-right">👋</span>
          </h1>
          <p className="text-xl text-slate-500 font-medium mt-1">¿Cómo te encuentras hoy?</p>
        </div>

        <HealthStatusCard />
        <MedicationCard />
        <AppointmentsCard />
        <EmergencyContacts />
      </section>

      <EmergencyButton />
    </div>
  )
}

export default ElderlyView
