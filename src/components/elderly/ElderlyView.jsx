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


        <AppointmentsCard />
          <MedicationCard />
        <HealthStatusCard />
        <EmergencyContacts />
      </section>

    </div>
  )
}

export default ElderlyView
