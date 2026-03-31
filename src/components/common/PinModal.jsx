import { useState, useEffect, useRef } from 'react'
import { X, ShieldCheck } from 'lucide-react'

const CAREGIVER_PIN = '1234'

function PinModal({ onSuccess, onClose }) {
  const [pin, setPin] = useState('')
  const [error, setError] = useState(false)
  const inputRef = useRef(null)

  useEffect(() => {
    inputRef.current?.focus()
  }, [])

  const handleSubmit = (e) => {
    e.preventDefault()
    if (pin === CAREGIVER_PIN) {
      onSuccess()
    } else {
      setError(true)
      setPin('')
      setTimeout(() => {
        setError(false)
        inputRef.current?.focus()
      }, 1200)
    }
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-6"
      role="dialog"
      aria-modal="true"
      aria-labelledby="pin-modal-title"
      onClick={(e) => { if (e.target === e.currentTarget) onClose() }}
    >
      <div className="w-full max-w-xs rounded-3xl bg-white p-6 shadow-2xl fade-in">
        <div className="flex items-center justify-between mb-1">
          <div className="flex items-center gap-2">
            <ShieldCheck className="h-6 w-6 text-blue-600" aria-hidden="true" />
            <h2 id="pin-modal-title" className="text-lg font-bold text-slate-800">
              Acceso cuidador
            </h2>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Cerrar"
            className="text-slate-400 hover:text-slate-600 rounded-full p-1 transition"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <p className="text-sm text-slate-500 mb-5">
          Introduce el PIN para acceder al panel del cuidador.
        </p>

        <form onSubmit={handleSubmit}>
          <input
            ref={inputRef}
            type="password"
            inputMode="numeric"
            maxLength={6}
            value={pin}
            onChange={(e) => setPin(e.target.value.replace(/\D/g, ''))}
            placeholder="••••"
            autoComplete="off"
            className={`w-full text-center text-3xl tracking-[0.5em] font-bold border-2 rounded-2xl py-4 outline-none transition ${
              error
                ? 'border-rose-400 bg-rose-50 text-rose-700 animate-[shake_0.3s_ease]'
                : 'border-slate-200 focus:border-blue-400 bg-slate-50'
            }`}
            aria-label="PIN de cuidador"
            aria-invalid={error}
            aria-describedby={error ? 'pin-error' : undefined}
          />
          {error && (
            <p id="pin-error" role="alert" className="text-sm text-rose-600 font-semibold text-center mt-2">
              PIN incorrecto. Inténtalo de nuevo.
            </p>
          )}
          <button
            type="submit"
            disabled={pin.length < 4}
            className="mt-4 w-full py-3 rounded-2xl bg-blue-600 text-white font-bold text-base hover:bg-blue-500 transition disabled:opacity-40 disabled:cursor-not-allowed"
          >
            Acceder
          </button>
        </form>
      </div>
    </div>
  )
}

export default PinModal
