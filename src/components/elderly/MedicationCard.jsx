import { Pill, ShieldCheck } from 'lucide-react'
import { useApp } from '../../context/AppContext'
import { useConfirmation } from '../../hooks/useConfirmation'
import ConfirmDialog from '../common/ConfirmDialog'

function MedicationCard() {
  const { medicines, setMedicines } = useApp()
  const { pending: pendingUnmarkId, request: requestUnmark, cancel: cancelUnmark } = useConfirmation()
  const taken = medicines.filter((m) => m.taken).length

  const handleTaken = (id) => {
    setMedicines((prev) => prev.map((m) => m.id === id ? { ...m, taken: true } : m))
  }

  const confirmUnmark = (id) => {
    setMedicines((prev) => prev.map((m) => m.id === id ? { ...m, taken: false } : m))
    cancelUnmark()
  }

  return (
    <article className="rounded-[2rem] bg-white border-2 border-blue-100 p-6 shadow-sm">
      <div className="flex items-center gap-4 mb-4">
        <div className="p-3 bg-blue-100 text-blue-600 rounded-2xl">
          <Pill className="h-8 w-8" />
        </div>
        <div className="flex-1">
          <h2 className="text-2xl font-bold text-slate-800">Medicación</h2>
          <p className="text-lg font-semibold text-blue-600 mt-1">{taken} de {medicines.length} tomadas</p>
        </div>
      </div>

      <div className="mb-6 flex gap-2">
        {medicines.map((m) => (
          <div
            key={m.id}
            className={`flex-1 h-4 rounded-full transition-all ${m.taken ? 'bg-emerald-500 shadow-[0_2px_8px_rgba(16,185,129,0.3)]' : 'bg-slate-200'}`}
          />
        ))}
      </div>

      <div className="space-y-3">
        {medicines.map((medicine) => (
          <div
            key={medicine.id}
            className={`rounded-xl p-4 border-2 transition-all ${medicine.taken ? 'bg-emerald-50 border-emerald-200' : 'bg-slate-50 border-slate-200'}`}
          >
            <div className="flex flex-col gap-3">
              <div className="flex items-start justify-between gap-3">
                <div className="flex-1 min-w-0">
                  <p className="font-bold text-slate-800 break-words leading-snug">{medicine.name}</p>
                  <p className="text-sm text-slate-600">Hora: {medicine.time}</p>
                </div>
                {medicine.taken ? (
                  <div className="flex items-center gap-2 bg-emerald-100 px-3 py-2 rounded-lg shrink-0">
                    <ShieldCheck className="h-5 w-5 text-emerald-600" />
                    <span className="text-sm font-bold text-emerald-700">Tomada</span>
                  </div>
                ) : (
                  <button
                    type="button"
                    onClick={() => handleTaken(medicine.id)}
                    className="shrink-0 px-4 py-2 bg-blue-500 text-white rounded-lg font-bold hover:bg-blue-400 transition-all"
                  >
                    Tomar
                  </button>
                )}
              </div>

              {medicine.taken && (
                pendingUnmarkId === medicine.id ? (
                  <ConfirmDialog
                    message="¿Quieres desmarcar esta toma?"
                    onConfirm={() => confirmUnmark(medicine.id)}
                    onCancel={cancelUnmark}
                  />
                ) : (
                  <div className="flex justify-end">
                    <button
                      type="button"
                      onClick={() => requestUnmark(medicine.id)}
                      className="px-2.5 py-1 text-xs bg-slate-200 text-slate-700 rounded-md font-semibold hover:bg-slate-300 transition-all"
                    >
                      Desmarcar
                    </button>
                  </div>
                )
              )}
            </div>
          </div>
        ))}
      </div>
    </article>
  )
}

export default MedicationCard
