import { useState } from 'react'
import { ArrowLeft, CheckCircle2, Plus, Activity, CalendarDays, Pill, BellRing, ChevronRight, AlertTriangle, Clock3, HeartPulse, Droplets } from 'lucide-react'
import LogoHelpy from '../images/LogoHelpy.png'

function CaregiverDashboard({ setIsCaregiverMode, medicines }) {
    const [logoError, setLogoError] = useState(false)
    const [callReminderConfirmation, setCallReminderConfirmation] = useState(false)
    const takenCount = medicines.filter((medicine) => medicine.taken).length
    const pendingMedicines = medicines.filter((medicine) => !medicine.taken)
    const hasPendingMedication = pendingMedicines.length > 0
    const pendingCount = pendingMedicines.length
    const riskLevel = pendingCount >= 2 ? 'Alto' : pendingCount === 1 ? 'Medio' : 'Bajo'
    const nextPendingMedicine = pendingMedicines[0]

    const upcomingAppointments = [
        { id: 1, title: 'Médico de cabecera', day: 'MIE', date: '26 Mar', time: '10:00', location: 'Centro de salud', type: 'Presencial' },
        { id: 2, title: 'Analítica de sangre', day: 'VIE', date: '28 Mar', time: '12:30', location: 'Laboratorio Norte', type: 'Presencial' },
        { id: 3, title: 'Revisión cardiología', day: 'LUN', date: '31 Mar', time: '09:15', location: 'Hospital Central', type: 'Presencial' },
        { id: 4, title: 'Teleconsulta nutrición', day: 'JUE', date: '03 Abr', time: '17:00', location: 'Videollamada', type: 'Online' },
    ]

    const dailyMockStatus = {
        sleepHours: 7.5,
        hydrationGlasses: 6,
        bloodPressure: '132/82',
        pulse: 72,
    }

    const activityLog = [
        { id: 1, text: 'Pastilla Atorvastatina confirmada', when: '08:05', tone: 'ok' },
        { id: 2, text: 'Recordatorio enviado para toma de las 14:00', when: '14:10', tone: 'warn' },
        { id: 3, text: 'Llamada de seguimiento completada', when: '14:25', tone: 'info' },
        { id: 4, text: 'Nueva cita añadida: Teleconsulta nutrición', when: '15:02', tone: 'info' },
    ]

    const requestCaregiverCall = () => {
        setCallReminderConfirmation(true)
    }

    const cancelCaregiverCall = () => {
        setCallReminderConfirmation(false)
    }

    const confirmCaregiverCall = () => {
        window.alert('Llamando para recordar la toma pendiente...')
        setCallReminderConfirmation(false)
    }

    return (
        <div className="min-h-full pb-24 fade-in bg-slate-50">
            {/* Cabecera */}
            <header className="sticky top-0 z-20 bg-white/80 backdrop-blur-xl border-b border-slate-200 px-5 py-4 flex items-center justify-between shadow-sm">
                <div className="flex items-center gap-3">
                    {logoError ? (
                        <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-100 text-sm font-black text-blue-700">
                            H
                        </div>
                    ) : (
                        <img
                            src={LogoHelpy}
                            alt="Helpy"
                            className="h-11 w-11 rounded-xl object-cover ring-1 ring-slate-200"
                            onError={() => setLogoError(true)}
                        />
                    )}
                    <div>
                        <p className="text-[0.7rem] font-bold text-blue-600 uppercase tracking-wider">Panel Cuidador</p>
                        <p className="text-lg font-bold text-slate-800 leading-tight">Métricas Helpy</p>
                    </div>
                </div>

                <button
                    type="button"
                    onClick={() => setIsCaregiverMode(false)}
                    className="flex h-10 w-10 items-center justify-center rounded-full bg-slate-100 text-slate-600 transition hover:bg-slate-200 active:scale-95"
                    aria-label="Volver"
                >
                    <ArrowLeft className="h-5 w-5" />
                </button>
            </header>

            <main className="px-5 pt-6 space-y-6">
                {/* Tarjeta de estado general */}
                <section>
                    <div className={`flex items-center gap-4 p-5 rounded-3xl text-white shadow-lg relative overflow-hidden ${hasPendingMedication
                        ? 'bg-gradient-to-br from-amber-500 to-orange-600 shadow-orange-500/30'
                        : 'bg-gradient-to-br from-blue-600 to-blue-700 shadow-blue-600/30'
                        }`}>
                        {/* Decoración de fondo */}
                        <div className="absolute -right-6 -top-6 h-24 w-24 rounded-full bg-white/10 blur-2xl"></div>

                        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-white/20 backdrop-blur-sm border border-white/10 z-10">
                            <Activity className="h-6 w-6 text-white" />
                        </div>
                        <div className="z-10">
                            <h2 className="text-sm font-medium text-white/80">Estado General de Papá</h2>
                            <p className="text-2xl font-bold">
                                {hasPendingMedication ? 'Atencion requerida' : 'Todo en orden'}
                            </p>
                            <p className="text-xs font-semibold text-white/85 mt-1">
                                {hasPendingMedication
                                    ? `${pendingMedicines.length} toma${pendingMedicines.length > 1 ? 's' : ''} pendiente${pendingMedicines.length > 1 ? 's' : ''}`
                                    : 'Sin alertas activas en este momento'}
                            </p>
                        </div>
                    </div>
                </section>

                {/* Resumen rápido */}
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

                {/* Seguimiento diario */}
                <section className="rounded-3xl bg-white p-5 shadow-sm border border-slate-200 space-y-3">
                    <div className="flex items-center gap-2">
                        <HeartPulse className="h-5 w-5 text-rose-500" />
                        <h3 className="text-[1.05rem] font-bold text-slate-800">Seguimiento diario</h3>
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                        <article className="rounded-2xl border border-slate-100 bg-slate-50 p-3">
                            <p className="text-xs font-bold text-slate-500 uppercase">Sueno</p>
                            <p className="text-lg font-black text-slate-800 mt-1">{dailyMockStatus.sleepHours}h</p>
                        </article>
                        <article className="rounded-2xl border border-slate-100 bg-slate-50 p-3">
                            <p className="text-xs font-bold text-slate-500 uppercase">Pulso</p>
                            <p className="text-lg font-black text-slate-800 mt-1">{dailyMockStatus.pulse} bpm</p>
                        </article>
                        <article className="rounded-2xl border border-slate-100 bg-slate-50 p-3">
                            <p className="text-xs font-bold text-slate-500 uppercase">Tension</p>
                            <p className="text-lg font-black text-slate-800 mt-1">{dailyMockStatus.bloodPressure}</p>
                        </article>
                        <article className="rounded-2xl border border-slate-100 bg-slate-50 p-3">
                            <p className="text-xs font-bold text-slate-500 uppercase">Hidratacion</p>
                            <p className="text-lg font-black text-slate-800 mt-1 flex items-center gap-1">
                                <Droplets className="h-4 w-4 text-cyan-500" /> {dailyMockStatus.hydrationGlasses} vasos
                            </p>
                        </article>
                    </div>
                </section>

                {/* Módulo de Medicación */}
                <section className="space-y-3">
                    <div className="flex items-center justify-between px-1">
                        <h3 className="text-[1.1rem] font-bold text-slate-800 flex items-center gap-2">
                            <Pill className="h-5 w-5 text-blue-500" />
                            Medicación Hoy
                        </h3>
                    </div>

                    <article className="rounded-3xl bg-white p-5 shadow-sm border border-slate-200">
                        {!hasPendingMedication ? (
                            <div className="flex items-center gap-4">
                                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-emerald-100 text-emerald-600">
                                    <CheckCircle2 className="h-6 w-6" />
                                </div>
                                <div>
                                    <p className="text-base font-bold text-slate-800">Todas las tomas completadas</p>
                                    <p className="text-sm font-semibold text-emerald-600">Rutina de medicacion completada hoy</p>
                                </div>
                            </div>
                        ) : (
                            <div className="flex items-center gap-4">
                                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-orange-100 text-orange-600 relative pulse-soft">
                                    <BellRing className="h-6 w-6" />
                                    <span className="absolute top-0 right-0 h-3.5 w-3.5 rounded-full bg-rose-500 border-2 border-white"></span>
                                </div>
                                <div className="flex-1">
                                    <p className="text-base font-bold text-slate-800">{nextPendingMedicine?.name} ({nextPendingMedicine?.time})</p>
                                    <p className="text-sm font-bold text-orange-600 flex items-center gap-1">
                                        <AlertTriangle className="h-3.5 w-3.5" /> Pendiente
                                    </p>
                                </div>
                            </div>
                        )}

                        {hasPendingMedication && (
                            callReminderConfirmation ? (
                                <div className="mt-3 flex items-center justify-between gap-2 rounded-xl border border-rose-200 bg-rose-50 px-3 py-2">
                                    <p className="text-xs font-semibold text-rose-700">Confirmar llamada de recordatorio</p>
                                    <div className="flex items-center gap-2">
                                        <button
                                            type="button"
                                            onClick={confirmCaregiverCall}
                                            className="rounded-md bg-rose-500 px-2.5 py-1 text-xs font-bold text-white hover:bg-rose-400 transition-all"
                                        >
                                            Si
                                        </button>
                                        <button
                                            type="button"
                                            onClick={cancelCaregiverCall}
                                            className="rounded-md bg-slate-200 px-2.5 py-1 text-xs font-bold text-slate-700 hover:bg-slate-300 transition-all"
                                        >
                                            No
                                        </button>
                                    </div>
                                </div>
                            ) : (
                                <div className="mt-3 flex justify-end">
                                    <button
                                        type="button"
                                        onClick={requestCaregiverCall}
                                        className="px-3 py-2 text-sm font-bold text-orange-700 bg-orange-50 rounded-xl hover:bg-orange-100 transition shadow-sm border border-orange-100"
                                    >
                                        Llamar
                                    </button>
                                </div>
                            )
                        )}

                        <div className="mt-4 space-y-2">
                            {medicines.map((medicine) => (
                                <div key={medicine.id} className={`flex items-center justify-between rounded-xl px-3 py-2 border ${medicine.taken
                                    ? 'bg-emerald-50 border-emerald-100'
                                    : 'bg-orange-50 border-orange-100'
                                    }`}>
                                    <div>
                                        <p className="text-sm font-bold text-slate-800">{medicine.name}</p>
                                        <p className="text-xs font-semibold text-slate-500">{medicine.time}</p>
                                    </div>
                                    <span className={`text-xs font-black px-2 py-1 rounded-lg ${medicine.taken
                                        ? 'text-emerald-700 bg-emerald-100'
                                        : 'text-orange-700 bg-orange-100'
                                        }`}>
                                        {medicine.taken ? 'Tomada' : 'Pendiente'}
                                    </span>
                                </div>
                            ))}
                        </div>
                    </article>
                </section>

                {/* Módulo de Citas */}
                <section className="space-y-3">
                    <div className="flex items-center justify-between px-1">
                        <h3 className="text-[1.1rem] font-bold text-slate-800 flex items-center gap-2">
                            <CalendarDays className="h-5 w-5 text-blue-500" />
                            Próximas Citas
                        </h3>
                        <button className="text-sm font-bold text-blue-600 hover:text-blue-700 underline underline-offset-4">Ver todas</button>
                    </div>

                    <div className="rounded-3xl bg-white p-2 shadow-sm border border-slate-200">
                        <ul className="divide-y divide-slate-100">
                            {upcomingAppointments.map((appointment) => (
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

                {/* Actividad reciente */}
                <section className="space-y-3">
                    <div className="flex items-center justify-between px-1">
                        <h3 className="text-[1.05rem] font-bold text-slate-800 flex items-center gap-2">
                            <Clock3 className="h-5 w-5 text-slate-500" />
                            Actividad reciente
                        </h3>
                    </div>

                    <div className="rounded-3xl bg-white p-4 shadow-sm border border-slate-200">
                        <ul className="space-y-3">
                            {activityLog.map((event) => (
                                <li key={event.id} className="flex items-start gap-3">
                                    <span className={`mt-1 h-2.5 w-2.5 rounded-full ${event.tone === 'ok' ? 'bg-emerald-500' : event.tone === 'warn' ? 'bg-amber-500' : 'bg-blue-500'
                                        }`} />
                                    <div className="flex-1">
                                        <p className="text-sm font-semibold text-slate-700">{event.text}</p>
                                        <p className="text-xs font-bold text-slate-400 mt-0.5">{event.when}</p>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    </div>
                </section>
            </main>

            {/* FAB Agregar Cita */}
            <div className="fixed bottom-6 right-6 z-30">
                <button
                    type="button"
                    className="flex h-[3.5rem] w-[3.5rem] items-center justify-center rounded-full bg-blue-600 text-white shadow-[0_8px_20px_rgb(37,99,235,0.4)] hover:bg-blue-700 hover:scale-105 transition-all active:scale-95"
                    aria-label="Añadir cita"
                >
                    <Plus className="h-7 w-7" />
                </button>
            </div>
        </div>
    )
}

export default CaregiverDashboard
