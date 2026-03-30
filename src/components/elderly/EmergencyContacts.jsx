import { Phone } from 'lucide-react'
import { emergencyContacts } from '../../data/mockData'
import { useConfirmation } from '../../hooks/useConfirmation'

function EmergencyContacts() {
  const { pending: pendingCallName, request: requestCall, cancel: cancelCall } = useConfirmation()

  const confirmCall = (name) => {
    window.alert(`Llamando a ${name}...`)
    cancelCall()
  }

  return (
    <article className="rounded-[2rem] bg-gradient-to-br from-orange-50 to-amber-50 border-2 border-orange-100 p-6 shadow-sm">
      <div className="flex items-center gap-4 mb-4">
        <div className="p-3 bg-orange-200 text-orange-600 rounded-2xl">
          <Phone className="h-8 w-8" />
        </div>
        <h2 className="text-2xl font-bold text-slate-800">Contactos</h2>
      </div>

      <div className="space-y-3">
        {emergencyContacts.map((contact) => (
          <div key={contact.name} className="bg-white rounded-xl p-4 border border-orange-100">
            <p className="font-bold text-slate-800">{contact.name}</p>
            <p className="text-sm text-slate-600 mt-1">{contact.phone}</p>
            {pendingCallName === contact.name ? (
              <div className="mt-3 space-y-2">
                <button
                  type="button"
                  onClick={() => confirmCall(contact.name)}
                  className="w-full py-2 bg-rose-500 text-white rounded-lg font-bold hover:bg-rose-400 transition-all text-sm"
                >
                  Pulsa otra vez para llamar
                </button>
                <button
                  type="button"
                  onClick={cancelCall}
                  className="w-full py-1.5 bg-slate-200 text-slate-700 rounded-lg font-semibold hover:bg-slate-300 transition-all text-xs"
                >
                  Cancelar
                </button>
              </div>
            ) : (
              <button
                type="button"
                onClick={() => requestCall(contact.name)}
                className="mt-3 w-full py-2 bg-orange-500 text-white rounded-lg font-bold hover:bg-orange-400 transition-all text-sm"
              >
                Llamar
              </button>
            )}
          </div>
        ))}
      </div>
    </article>
  )
}

export default EmergencyContacts
