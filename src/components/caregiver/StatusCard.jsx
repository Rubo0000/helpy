import { Activity } from 'lucide-react'
import { useApp } from '../../context/AppContext'

function StatusCard() {
  const { medicines } = useApp()
  const pendingMedicines = medicines.filter((m) => !m.taken)
  const hasPending = pendingMedicines.length > 0

  return (
    <section>
      <div className={`flex items-center gap-4 p-5 rounded-3xl text-white shadow-lg relative overflow-hidden ${hasPending
        ? 'bg-gradient-to-br from-amber-500 to-orange-600 shadow-orange-500/30'
        : 'bg-gradient-to-br from-blue-600 to-blue-700 shadow-blue-600/30'
        }`}>
        <div className="absolute -right-6 -top-6 h-24 w-24 rounded-full bg-white/10 blur-2xl" />
        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-white/20 backdrop-blur-sm border border-white/10 z-10">
          <Activity className="h-6 w-6 text-white" />
        </div>
        <div className="z-10">
          <h2 className="text-sm font-medium text-white/80">Estado General de Papá</h2>
          <p className="text-2xl font-bold">
            {hasPending ? 'Atención requerida' : 'Todo en orden'}
          </p>
          <p className="text-xs font-semibold text-white/85 mt-1">
            {hasPending
              ? `${pendingMedicines.length} toma${pendingMedicines.length > 1 ? 's' : ''} pendiente${pendingMedicines.length > 1 ? 's' : ''}`
              : 'Sin alertas activas en este momento'}
          </p>
        </div>
      </div>
    </section>
  )
}

export default StatusCard
