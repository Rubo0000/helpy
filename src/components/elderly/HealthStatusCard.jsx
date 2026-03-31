import { Heart, Droplets, Minus, Plus, Stethoscope } from 'lucide-react'
import { useApp } from '../../context/AppContext'
import { useHealthStatus } from '../../hooks/useHealthStatus'

const SYMPTOM_OPTIONS = [
  { id: 'dolor', label: 'Dolor' },
  { id: 'mareo', label: 'Mareo' },
  { id: 'cansancio', label: 'Cansancio' },
]

function HealthStatusCard() {
  const { medicines, hydration, setHydration, symptoms, toggleSymptom, addLogEntry } = useApp()
  const status = useHealthStatus(medicines)

  const adjustHydration = (delta) => {
    const next = Math.max(0, Math.min(12, hydration + delta))
    if (next === hydration) return
    setHydration(next)
    addLogEntry(`Hidratacion actualizada a ${next} vasos`, 'info')
  }

  const handleSymptomToggle = (symptom) => {
    const willActivate = !symptoms.includes(symptom)
    toggleSymptom(symptom)
    addLogEntry(
      willActivate ? `Sintoma marcado: ${symptom}` : `Sintoma retirado: ${symptom}`,
      willActivate ? 'warn' : 'info'
    )
  }

  return (
    <article className={`rounded-[2rem] bg-gradient-to-br border-2 p-6 shadow-sm transition-transform duration-500 hover:-translate-y-1 ${status.cardStyle}`}>
      <div className="flex items-center gap-4 mb-4">
        <div className={`p-3 rounded-2xl ${status.iconStyle}`}>
          <Heart className="h-8 w-8" />
        </div>
        <h2 className="text-2xl font-bold text-slate-800">Tu salud hoy</h2>
      </div>
      {/*<div className="grid grid-cols-2 gap-4">
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
          <div className="mt-2 flex items-center justify-between gap-2">
            <button
              type="button"
              onClick={() => adjustHydration(-1)}
              className="inline-flex h-8 w-8 items-center justify-center rounded-lg border border-sky-200 bg-sky-50 text-sky-700 transition hover:bg-sky-100"
              aria-label="Reducir hidratacion"
            >
              <Minus className="h-4 w-4" />
            </button>
            <p className={`text-lg font-bold ${status.moodStyle} flex items-center gap-1`}>
              <Droplets className="h-4 w-4 text-sky-500" /> {hydration} vasos
            </p>
            <button
              type="button"
              onClick={() => adjustHydration(1)}
              className="inline-flex h-8 w-8 items-center justify-center rounded-lg border border-sky-200 bg-sky-50 text-sky-700 transition hover:bg-sky-100"
              aria-label="Aumentar hidratacion"
            >
              <Plus className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>*/}

      <div className="mt-4 rounded-xl border border-slate-200 bg-white p-4">
        <p className="text-xs font-bold uppercase tracking-wide text-slate-500 flex items-center gap-1">
          <Stethoscope className="h-3.5 w-3.5" /> Registro de sintomas
        </p>
        <div className="mt-3 flex flex-wrap gap-2">
          {SYMPTOM_OPTIONS.map((symptom) => {
            const active = symptoms.includes(symptom.id)
            return (
              <button
                key={symptom.id}
                type="button"
                onClick={() => handleSymptomToggle(symptom.id)}
                className={`rounded-full px-4 py-2 text-sm font-bold transition ${active
                    ? 'bg-rose-500 text-white shadow-[0_4px_0_rgb(190,18,60)]'
                    : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                  }`}
                aria-pressed={active}
              >
                {symptom.label}
              </button>
            )
          })}
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
