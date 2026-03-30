import { CalendarClock, MapPin } from 'lucide-react'
import { appointmentsList } from '../../data/mockData'

function AppointmentsCard() {
  return (
    <article className="rounded-[2rem] bg-white border-2 border-slate-100 p-6 shadow-sm">
      <div className="flex items-center gap-4 mb-4">
        <div className="p-3 bg-slate-100 text-slate-600 rounded-2xl">
          <CalendarClock className="h-8 w-8" />
        </div>
        <h2 className="text-2xl font-bold text-slate-800">Tus citas médicas</h2>
      </div>

      <div className="space-y-3">
        {appointmentsList.map((appointment, index) => (
          <div
            key={appointment.id}
            className={`rounded-xl p-4 border-2 ${index === 0 ? 'bg-blue-50 border-blue-200' : 'bg-slate-50 border-slate-200'}`}
          >
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <p className="font-bold text-slate-800">{appointment.doctor}</p>
                  {index === 0 && (
                    <span className="text-xs font-bold bg-red-100 text-red-700 px-2 py-1 rounded">PRÓXIMA</span>
                  )}
                </div>
                <p className="text-sm text-slate-600 mt-2">{appointment.date}, {appointment.time}</p>
                <div className="flex items-center gap-1 mt-2 text-slate-600">
                  <MapPin className="h-4 w-4" />
                  <span className="text-sm">{appointment.location}</span>
                </div>
              </div>
              <div className={`text-3xl ${index === 0 ? 'animate-pulse' : ''}`}>📅</div>
            </div>
          </div>
        ))}
      </div>
    </article>
  )
}

export default AppointmentsCard
