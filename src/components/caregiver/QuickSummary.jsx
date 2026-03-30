import { useApp } from '../../context/AppContext'

function QuickSummary() {
  const { medicines } = useApp()
  const takenCount = medicines.filter((m) => m.taken).length
  const pendingCount = medicines.length - takenCount
  const riskLevel = pendingCount >= 2 ? 'Alto' : pendingCount === 1 ? 'Medio' : 'Bajo'

  return (
    <section className="grid grid-cols-3 gap-3">
      <article className="rounded-2xl border border-slate-200 bg-white p-3 shadow-sm">
        <p className="text-xs font-bold text-slate-500 uppercase tracking-wide">Tomadas</p>
        <p className="text-2xl font-black text-emerald-600 mt-1">{takenCount}</p>
      </article>
      <article className="rounded-2xl border border-slate-200 bg-white p-3 shadow-sm">
        <p className="text-xs font-bold text-slate-500 uppercase tracking-wide">Pendientes</p>
        <p className="text-2xl font-black text-orange-600 mt-1">{pendingCount}</p>
      </article>
      <article className="rounded-2xl border border-slate-200 bg-white p-3 shadow-sm">
        <p className="text-xs font-bold text-slate-500 uppercase tracking-wide">Riesgo hoy</p>
        <p className={`text-2xl font-black mt-1 ${riskLevel === 'Alto' ? 'text-rose-600' : riskLevel === 'Medio' ? 'text-amber-600' : 'text-blue-600'}`}>
          {riskLevel}
        </p>
      </article>
    </section>
  )
}

export default QuickSummary
