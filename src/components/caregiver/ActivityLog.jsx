import { Clock3 } from 'lucide-react'
import { useApp } from '../../context/AppContext'

const DOT_STYLES = {
  ok: 'bg-emerald-500',
  warn: 'bg-amber-500',
  info: 'bg-blue-500',
}

function ActivityLog() {
  const { activityLog } = useApp()

  return (
    <section className="space-y-3">
      <div className="flex items-center justify-between px-1">
        <h3 className="text-[1.05rem] font-bold text-slate-800 flex items-center gap-2">
          <Clock3 className="h-5 w-5 text-slate-500" aria-hidden="true" />
          Actividad reciente
        </h3>
      </div>

      <div className="rounded-3xl bg-white p-4 shadow-sm border border-slate-200">
        {activityLog.length === 0 ? (
          <p className="text-sm text-slate-400 text-center py-4">Sin actividad registrada hoy.</p>
        ) : (
          <ul className="space-y-3" aria-label="Registro de actividad">
            {activityLog.map((event) => (
              <li key={event.id} className="flex items-start gap-3">
                <span
                  className={`mt-1 h-2.5 w-2.5 rounded-full shrink-0 ${DOT_STYLES[event.tone] ?? 'bg-slate-500'}`}
                  aria-hidden="true"
                />
                <div className="flex-1">
                  <p className="text-sm font-semibold text-slate-700">{event.text}</p>
                  <p className="text-xs font-bold text-slate-400 mt-0.5">{event.when}</p>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </section>
  )
}

export default ActivityLog
