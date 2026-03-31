import { Pill, ShieldCheck, Clock, AlertCircle } from 'lucide-react'
import { useApp } from '../../context/AppContext'
import { useConfirmation } from '../../hooks/useConfirmation'
import ConfirmDialog from '../common/ConfirmDialog'

/**
 * Returns 'overdue' if >30 min past scheduled time and not taken,
 * 'upcoming' if within ±30 min window, or null otherwise.
 */
function getMedTimeStatus(timeStr, taken) {
  if (taken) return null
  const [h, m] = timeStr.split(':').map(Number)
  const now = new Date()
  const medTime = new Date()
  medTime.setHours(h, m, 0, 0)
  const diffMin = (now - medTime) / 60000
  if (diffMin > 30) return 'overdue'
  if (diffMin >= -30) return 'upcoming'
  return null
}

function MedicationCard() {
  const { medicines, setMedicines, addLogEntry } = useApp()
  const { pending: pendingUnmarkId, request: requestUnmark, cancel: cancelUnmark } = useConfirmation()
  const taken = medicines.filter((m) => m.taken).length
  const nowMinutes = new Date().getHours() * 60 + new Date().getMinutes()
  const sortedMedicines = [...medicines].sort((a, b) => a.time.localeCompare(b.time))
  const dayStart = sortedMedicines.length ? Number(sortedMedicines[0].time.slice(0, 2)) * 60 + Number(sortedMedicines[0].time.slice(3, 5)) : 0
  const dayEnd = sortedMedicines.length ? Number(sortedMedicines[sortedMedicines.length - 1].time.slice(0, 2)) * 60 + Number(sortedMedicines[sortedMedicines.length - 1].time.slice(3, 5)) : 1
  const markerPercent = sortedMedicines.length > 1
    ? Math.min(100, Math.max(0, ((nowMinutes - dayStart) / Math.max(dayEnd - dayStart, 1)) * 100))
    : 0

  const handleTaken = (medicine) => {
    setMedicines((prev) => prev.map((m) => m.id === medicine.id ? { ...m, taken: true } : m))
    addLogEntry(`Pastilla ${medicine.name} confirmada`, 'ok')
    if (navigator.vibrate) navigator.vibrate(50)
  }

  const confirmUnmark = (medicine) => {
    setMedicines((prev) => prev.map((m) => m.id === medicine.id ? { ...m, taken: false } : m))
    addLogEntry(`Toma de ${medicine.name} desmarcada`, 'warn')
    cancelUnmark()
  }

  return (
    <article
      className="rounded-[2rem] bg-white border-2 border-blue-100 p-6 shadow-sm"
      aria-label="Tarjeta de medicación"
    >
      <div className="flex items-center gap-4 mb-4">
        <div className="p-3 bg-blue-100 text-blue-600 rounded-2xl" aria-hidden="true">
          <Pill className="h-8 w-8" />
        </div>
        <div className="flex-1">
          <h2 className="text-2xl font-bold text-slate-800">Medicación</h2>
          <p className="text-lg font-semibold text-blue-600 mt-1" aria-live="polite">
            {taken} de {medicines.length} tomadas
          </p>
        </div>
      </div>

      <div className="mb-6 flex gap-2" role="progressbar" aria-valuenow={taken} aria-valuemin={0} aria-valuemax={medicines.length} aria-label="Progreso de medicación">
        {medicines.map((m) => (
          <div
            key={m.id}
            className={`flex-1 h-4 rounded-full transition-all ${m.taken ? 'bg-emerald-500 shadow-[0_2px_8px_rgba(16,185,129,0.3)]' : 'bg-slate-200'}`}
          />
        ))}
      </div>

      {sortedMedicines.length > 1 && (
        <div className="mb-6 rounded-xl border border-blue-100 bg-blue-50/60 p-4">
          <p className="text-xs font-bold uppercase tracking-wide text-blue-700">Horario del dia</p>
          <div className="relative mt-6">
            <div className="h-1.5 rounded-full bg-blue-100" />
            <div
              className="absolute -top-1.5 h-4 w-4 -translate-x-1/2 rounded-full border-2 border-white bg-blue-500 shadow"
              style={{ left: `${markerPercent}%` }}
              aria-label="Hora actual"
            />
            <div className="absolute -top-6 left-0 text-[11px] font-bold text-blue-700">
              {sortedMedicines[0].time}
            </div>
            <div className="absolute -top-6 right-0 text-[11px] font-bold text-blue-700">
              {sortedMedicines[sortedMedicines.length - 1].time}
            </div>
            <div className="mt-4 flex items-center justify-between gap-3">
              {sortedMedicines.map((medicine) => (
                <div key={medicine.id} className="text-center">
                  <span className={`inline-block h-2.5 w-2.5 rounded-full ${medicine.taken ? 'bg-emerald-500' : 'bg-blue-300'}`} />
                  <p className="mt-1 text-[10px] font-semibold text-slate-600">{medicine.time}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      <div className="space-y-3">
        {medicines.map((medicine) => {
          const timeStatus = getMedTimeStatus(medicine.time, medicine.taken)
          return (
            <div
              key={medicine.id}
              className={`rounded-xl p-4 border-2 transition-all ${medicine.taken
                  ? 'bg-emerald-50 border-emerald-200'
                  : timeStatus === 'overdue'
                    ? 'bg-rose-50 border-rose-200'
                    : timeStatus === 'upcoming'
                      ? 'bg-amber-50 border-amber-200'
                      : 'bg-slate-50 border-slate-200'
                }`}
            >
              <div className="flex flex-col gap-3">
                <div className="flex items-start justify-between gap-3">
                  <div className="flex-1 min-w-0">
                    <p className="font-bold text-slate-800 break-words leading-snug">{medicine.name}</p>
                    <p className="text-sm text-slate-600 flex items-center gap-1 mt-0.5">
                      <Clock className="h-3.5 w-3.5" aria-hidden="true" />
                      {medicine.time}
                      {timeStatus === 'overdue' && (
                        <span className="ml-1 inline-flex items-center gap-0.5 text-xs font-bold text-rose-600">
                          <AlertCircle className="h-3.5 w-3.5" aria-hidden="true" />
                          Vencida
                        </span>
                      )}
                      {timeStatus === 'upcoming' && (
                        <span className="ml-1 text-xs font-bold text-amber-600">¡Ahora!</span>
                      )}
                    </p>
                  </div>
                  {medicine.taken ? (
                    <div className="flex items-center gap-2 bg-emerald-100 px-3 py-2 rounded-lg shrink-0" aria-label="Tomada">
                      <ShieldCheck className="h-5 w-5 text-emerald-600" aria-hidden="true" />
                      <span className="text-sm font-bold text-emerald-700">Tomada</span>
                    </div>
                  ) : (
                    <button
                      type="button"
                      onClick={() => handleTaken(medicine)}
                      aria-label={`Marcar ${medicine.name} como tomada`}
                      className={`shrink-0 px-4 py-2 text-white rounded-lg font-bold transition-all ${timeStatus === 'overdue'
                          ? 'bg-rose-500 hover:bg-rose-400'
                          : timeStatus === 'upcoming'
                            ? 'bg-amber-500 hover:bg-amber-400'
                            : 'bg-blue-500 hover:bg-blue-400'
                        }`}
                    >
                      Tomar
                    </button>
                  )}
                </div>

                {medicine.taken && (
                  pendingUnmarkId === medicine.id ? (
                    <ConfirmDialog
                      message="¿Quieres desmarcar esta toma?"
                      onConfirm={() => confirmUnmark(medicine)}
                      onCancel={cancelUnmark}
                    />
                  ) : (
                    <div className="flex justify-end">
                      <button
                        type="button"
                        onClick={() => requestUnmark(medicine.id)}
                        aria-label={`Desmarcar ${medicine.name}`}
                        className="px-2.5 py-1 text-xs bg-slate-200 text-slate-700 rounded-md font-semibold hover:bg-slate-300 transition-all"
                      >
                        Desmarcar
                      </button>
                    </div>
                  )
                )}
              </div>
            </div>
          )
        })}
      </div>
    </article>
  )
}

export default MedicationCard
