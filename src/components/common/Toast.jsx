import { X, CheckCircle2, AlertTriangle, Info } from 'lucide-react'
import { useApp } from '../../context/AppContext'

const ICON = {
  ok: <CheckCircle2 className="h-5 w-5 text-emerald-600 shrink-0" />,
  warn: <AlertTriangle className="h-5 w-5 text-amber-500 shrink-0" />,
  info: <Info className="h-5 w-5 text-blue-500 shrink-0" />,
}

const STYLE = {
  ok: 'border-emerald-200 bg-emerald-50',
  warn: 'border-amber-200 bg-amber-50',
  info: 'border-blue-200 bg-blue-50',
}

function Toast() {
  const { toasts, removeToast } = useApp()

  if (!toasts.length) return null

  return (
    <div
      className="fixed top-4 left-1/2 -translate-x-1/2 z-50 flex flex-col gap-2 w-[88vw] max-w-sm pointer-events-none"
      role="region"
      aria-label="Notificaciones"
      aria-live="polite"
    >
      {toasts.map((toast) => (
        <div
          key={toast.id}
          className={`flex items-center gap-3 px-4 py-3 rounded-2xl border shadow-lg pointer-events-auto fade-in ${STYLE[toast.type] ?? STYLE.info}`}
          role="alert"
        >
          {ICON[toast.type] ?? ICON.info}
          <p className="flex-1 text-sm font-semibold text-slate-700">{toast.message}</p>
          <button
            type="button"
            onClick={() => removeToast(toast.id)}
            aria-label="Cerrar notificación"
            className="text-slate-400 hover:text-slate-600 rounded-full p-0.5"
          >
            <X className="h-4 w-4" />
          </button>
        </div>
      ))}
    </div>
  )
}

export default Toast
