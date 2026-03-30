import { HeartPulse, Droplets } from 'lucide-react'
import { dailyStatus } from '../../data/mockData'

function DailyMonitoring() {
  return (
    <section className="rounded-3xl bg-white p-5 shadow-sm border border-slate-200 space-y-3">
      <div className="flex items-center gap-2">
        <HeartPulse className="h-5 w-5 text-rose-500" />
        <h3 className="text-[1.05rem] font-bold text-slate-800">Seguimiento diario</h3>
      </div>
      <div className="grid grid-cols-2 gap-3">
        <article className="rounded-2xl border border-slate-100 bg-slate-50 p-3">
          <p className="text-xs font-bold text-slate-500 uppercase">Sueño</p>
          <p className="text-lg font-black text-slate-800 mt-1">{dailyStatus.sleepHours}h</p>
        </article>
        <article className="rounded-2xl border border-slate-100 bg-slate-50 p-3">
          <p className="text-xs font-bold text-slate-500 uppercase">Pulso</p>
          <p className="text-lg font-black text-slate-800 mt-1">{dailyStatus.pulse} bpm</p>
        </article>
        <article className="rounded-2xl border border-slate-100 bg-slate-50 p-3">
          <p className="text-xs font-bold text-slate-500 uppercase">Tensión</p>
          <p className="text-lg font-black text-slate-800 mt-1">{dailyStatus.bloodPressure}</p>
        </article>
        <article className="rounded-2xl border border-slate-100 bg-slate-50 p-3">
          <p className="text-xs font-bold text-slate-500 uppercase">Hidratación</p>
          <p className="text-lg font-black text-slate-800 mt-1 flex items-center gap-1">
            <Droplets className="h-4 w-4 text-cyan-500" /> {dailyStatus.hydrationGlasses} vasos
          </p>
        </article>
      </div>
    </section>
  )
}

export default DailyMonitoring
