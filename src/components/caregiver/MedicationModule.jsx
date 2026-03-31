import { useState } from 'react'
import { Pill, CheckCircle2, BellRing, AlertTriangle } from 'lucide-react'
import { useApp } from '../../context/AppContext'
import { useConfirmation } from '../../hooks/useConfirmation'
import ConfirmDialog from '../common/ConfirmDialog'

function MedicationModule() {
  const { medicines, addMedicine, removeMedicine, addToast, addLogEntry } = useApp()
  const { pending: callConfirm, request: requestCall, cancel: cancelCall } = useConfirmation()
  const [newName, setNewName] = useState('')
  const [newTime, setNewTime] = useState('08:00')

  const pendingMedicines = medicines.filter((m) => !m.taken)
  const hasPending = pendingMedicines.length > 0
  const nextPending = pendingMedicines[0]

  const confirmCall = () => {
    addToast(`Recordatorio enviado a Papá: ${nextPending?.name} (${nextPending?.time})`, 'warn')
    addLogEntry(`Recordatorio enviado para toma de ${nextPending?.name} (${nextPending?.time})`, 'warn')
    cancelCall()
  }

  const handleAddMedicine = (event) => {
    event.preventDefault()
    const cleanName = newName.trim()
    if (!cleanName) return
    addMedicine(cleanName, newTime)
    addLogEntry(`Medicamento anadido: ${cleanName} (${newTime})`, 'info')
    addToast(`Medicamento anadido: ${cleanName}`, 'info')
    setNewName('')
  }

  const handleRemoveMedicine = (medicine) => {
    removeMedicine(medicine.id)
    addLogEntry(`Medicamento eliminado: ${medicine.name}`, 'warn')
    addToast(`Eliminado: ${medicine.name}`, 'warn')
  }

  return (
    <section className="space-y-3">
      <div className="flex items-center justify-between px-1">
        <h3 className="text-[1.1rem] font-bold text-slate-800 flex items-center gap-2">
          <Pill className="h-5 w-5 text-blue-500" />
          Medicación Hoy
        </h3>
      </div>

      <article className="rounded-3xl bg-white p-5 shadow-sm border border-slate-200">
        {hasPending ? (
          <div className="flex items-center gap-4">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-orange-100 text-orange-600 relative pulse-soft">
              <BellRing className="h-6 w-6" />
              <span className="absolute top-0 right-0 h-3.5 w-3.5 rounded-full bg-rose-500 border-2 border-white" />
            </div>
            <div className="flex-1">
              <p className="text-base font-bold text-slate-800">{nextPending?.name} ({nextPending?.time})</p>
              <p className="text-sm font-bold text-orange-600 flex items-center gap-1">
                <AlertTriangle className="h-3.5 w-3.5" /> Pendiente
              </p>
            </div>
          </div>
        ) : (
          <div className="flex items-center gap-4">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-emerald-100 text-emerald-600">
              <CheckCircle2 className="h-6 w-6" />
            </div>
            <div>
              <p className="text-base font-bold text-slate-800">Todas las tomas completadas</p>
              <p className="text-sm font-semibold text-emerald-600">Rutina de medicación completada hoy</p>
            </div>
          </div>
        )}

        {hasPending && (
          callConfirm ? (
            <div className="mt-3">
              <ConfirmDialog
                message="Confirmar llamada de recordatorio"
                onConfirm={confirmCall}
                onCancel={cancelCall}
              />
            </div>
          ) : (
            <div className="mt-3 flex justify-end">
              <button
                type="button"
                onClick={requestCall}
                className="px-3 py-2 text-sm font-bold text-orange-700 bg-orange-50 rounded-xl hover:bg-orange-100 transition shadow-sm border border-orange-100"
              >
                Llamar
              </button>
            </div>
          )
        )}

        <div className="mt-4 space-y-2">
          {medicines.map((medicine) => (
            <div
              key={medicine.id}
              className={`flex items-center justify-between rounded-xl px-3 py-2 border ${medicine.taken ? 'bg-emerald-50 border-emerald-100' : 'bg-orange-50 border-orange-100'}`}
            >
              <div>
                <p className="text-sm font-bold text-slate-800">{medicine.name}</p>
                <p className="text-xs font-semibold text-slate-500">{medicine.time}</p>
              </div>
              <div className="flex items-center gap-2">
                <span className={`text-xs font-black px-2 py-1 rounded-lg ${medicine.taken ? 'text-emerald-700 bg-emerald-100' : 'text-orange-700 bg-orange-100'}`}>
                  {medicine.taken ? 'Tomada' : 'Pendiente'}
                </span>
                <button
                  type="button"
                  onClick={() => handleRemoveMedicine(medicine)}
                  className="rounded-lg bg-slate-200 px-2 py-1 text-[11px] font-bold text-slate-700 transition hover:bg-slate-300"
                >
                  Quitar
                </button>
              </div>
            </div>
          ))}
        </div>

        <form onSubmit={handleAddMedicine} className="mt-4 rounded-2xl border border-slate-200 bg-slate-50 p-3">
          <p className="text-xs font-bold uppercase tracking-wide text-slate-500">Editar medicamentos</p>
          <div className="mt-2 grid grid-cols-[1fr_auto] gap-2">
            <input
              type="text"
              value={newName}
              onChange={(event) => setNewName(event.target.value)}
              placeholder="Nombre medicamento"
              className="w-full rounded-xl border border-slate-300 px-3 py-2 text-sm font-semibold text-slate-700 outline-none ring-blue-300 focus:ring"
            />
            <input
              type="time"
              value={newTime}
              onChange={(event) => setNewTime(event.target.value)}
              className="rounded-xl border border-slate-300 px-3 py-2 text-sm font-semibold text-slate-700 outline-none ring-blue-300 focus:ring"
            />
          </div>
          <button
            type="submit"
            className="mt-2 w-full rounded-xl bg-blue-600 px-3 py-2 text-sm font-bold text-white transition hover:bg-blue-500"
          >
            Anadir medicamento
          </button>
        </form>
      </article>
    </section>
  )
}

export default MedicationModule
