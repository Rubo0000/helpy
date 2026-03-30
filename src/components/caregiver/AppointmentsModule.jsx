import { CalendarDays, ChevronRight } from 'lucide-react'
import { caregiverAppointments } from '../../data/mockData'

function AppointmentsModule() {
  return (
    <section className="space-y-3">
      <div className="flex items-center justify-between px-1">
        <h3 className="text-[1.1rem] font-bold text-slate-800 flex items-center gap-2">
          <CalendarDays className="h-5 w-5 text-blue-500" />
          Próximas Citas
        </h3>
        <button className="text-sm font-bold text-blue-600 hover:text-blue-700 underline underline-offset-4">
          Ver todas
        </button>
      </div>

      <div className="rounded-3xl bg-white p-2 shadow-sm border border-slate-200">
        <ul className="divide-y divide-slate-100">
          {caregiverAppointments.map((appointment) => (
            <li key={appointment.id} className="p-2">
              <button className="w-full flex items-center gap-4 text-left group p-2 rounded-2xl transition hover:bg-slate-50">
                <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-2xl bg-blue-50/50 text-blue-600 font-black text-xs uppercase border border-blue-50">
                  {appointment.day}
                </div>
                <div className="flex-1">
                  <p className="text-sm font-bold text-slate-800">{appointment.title}</p>
                  <p className="text-xs font-semibold text-slate-500 mt-0.5">{appointment.date} · {appointment.time}</p>
                  <p className="text-[11px] font-semibold text-slate-400 mt-0.5">{appointment.location} · {appointment.type}</p>
                </div>
                <ChevronRight className="h-5 w-5 text-slate-300" />
              </button>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}

export default AppointmentsModule
