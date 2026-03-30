import { Heart } from 'lucide-react'
import { useApp } from '../../context/AppContext'
import { useHealthStatus } from '../../hooks/useHealthStatus'

function HealthStatusCard() {
  const { medicines } = useApp()
  const status = useHealthStatus(medicines)

  return (
    <article className={`rounded-[2rem] bg-gradient-to-br border-2 p-6 shadow-sm ${status.cardStyle}`}>
      <div className="flex items-center gap-4 mb-4">
        <div className={`p-3 rounded-2xl ${status.iconStyle}`}>
          <Heart className="h-8 w-8" />
        </div>
        <h2 className="text-2xl font-bold text-slate-800">Tu salud hoy</h2>
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div className="bg-white rounded-xl p-4 border border-slate-100">
          <p className="text-sm text-slate-600 font-semibold">Ánimo</p>
          <p className={`text-2xl font-bold mt-2 capitalize ${status.moodStyle}`}>{status.mood}</p>
        </div>
        <div className="bg-white rounded-xl p-4 border border-slate-100">
          <p className="text-sm text-slate-600 font-semibold">Energía</p>
          <div className="mt-2 bg-slate-200 rounded-full h-3">
            <div
              className={`h-3 rounded-full ${status.energyBarStyle}`}
              style={{ width: `${status.energy}%` }}
            />
          </div>
          <p className="text-sm font-bold text-slate-700 mt-1">{status.energy}%</p>
        </div>
        <div className="bg-white rounded-xl p-4 border border-slate-100">
          <p className="text-sm text-slate-600 font-semibold">Descanso</p>
          <p className={`text-lg font-bold mt-2 ${status.moodStyle}`}>{status.sleep} 😴</p>
        </div>
        <div className="bg-white rounded-xl p-4 border border-slate-100">
          <p className="text-sm text-slate-600 font-semibold">Agua</p>
          <p className={`text-lg font-bold mt-2 ${status.moodStyle}`}>{status.waterIntake} vasos</p>
        </div>
      </div>
      <div className="mt-4 rounded-xl bg-white/80 border border-white p-3">
        <p className="text-xs font-bold uppercase tracking-wide text-slate-500">Recomendacion</p>
        <p className="mt-1 text-sm font-semibold text-slate-700">{status.recommendation}</p>
      </div>
    </article>
  )
}

export default HealthStatusCard
