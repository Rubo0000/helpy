import { Phone } from 'lucide-react'
import { emergencyContacts } from '../../data/mockData'
import { useConfirmation } from '../../hooks/useConfirmation'

function EmergencyButton() {
  const { pending: callConfirmation, request: requestCall, cancel: cancelCall } = useConfirmation()

  const handleCall = () => {
    if (!callConfirmation) {
      requestCall(true)
      setTimeout(cancelCall, 5000)
      return
    }
    window.alert(`Llamando a ${emergencyContacts[0].name}...`)
    cancelCall()
  }

  return (
    <div className="absolute bottom-0 left-0 right-0 w-full z-30 p-6 pt-16 bg-gradient-to-t from-[#f8fafc] via-[#f8fafc]/90 to-transparent pointer-events-none">
      <div className="pointer-events-auto mx-auto flex w-full flex-col items-center gap-2">
        <button
          type="button"
          onClick={handleCall}
          className="mx-auto flex w-full items-center justify-center gap-4 rounded-[2rem] bg-rose-500 px-6 py-6 text-[1.35rem] font-black text-white shadow-[0_8px_0_rgb(190,18,60)] transition-all hover:bg-rose-400 hover:translate-y-1 hover:shadow-[0_4px_0_rgb(190,18,60)] active:shadow-none active:translate-y-2"
        >
          <Phone className="h-8 w-8 fill-current" />
          {callConfirmation ? 'Pulsa otra vez para llamar' : `Llamar a ${emergencyContacts[0].name}`}
        </button>

        <div className="h-10 w-full">
          {callConfirmation ? (
            <button
              type="button"
              onClick={cancelCall}
              className="w-full rounded-[1.2rem] bg-slate-300 px-6 py-3 text-sm font-bold text-slate-700 transition-all hover:bg-slate-400"
            >
              Cancelar
            </button>
          ) : (
            <div className="h-full w-full" />
          )}
        </div>
      </div>
    </div>
  )
}

export default EmergencyButton
