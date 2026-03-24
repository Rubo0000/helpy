import { useState } from 'react'
import { Settings, Phone, Pill, CalendarClock, ShieldCheck, Heart, MapPin } from 'lucide-react'
import LogoHelpy from '../images/LogoHelpy.png'

function ElderlyView({ setIsCaregiverMode, medicines, setMedicines }) {
    // Datos mock de citas
    const appointmentsList = [
        { id: 1, doctor: 'Médico de cabecera', date: 'Mañana', time: '10:00', location: 'Centro de salud', priority: 'high' },
        { id: 2, doctor: 'Oftalmólogo', date: 'En 5 días', time: '15:30', location: 'Clínica privada', priority: 'normal' },
        { id: 3, doctor: 'Cardiólogo', date: 'En 15 días', time: '11:00', location: 'Hospital central', priority: 'normal' }
    ]

    // Datos mock de contactos emergencia
    const emergencyContacts = [
        { name: 'Carlos (hijo)', phone: '+34 623 456 789', relation: 'hijo' },
        { name: 'María (vecina)', phone: '+34 612 345 678', relation: 'amiga' }
    ]

    const [callConfirmation, setCallConfirmation] = useState(false)
    const [pendingUnmarkMedicineId, setPendingUnmarkMedicineId] = useState(null)
    const [pendingContactCallName, setPendingContactCallName] = useState(null)

    const medicationsTaken = medicines.filter((medicine) => medicine.taken).length
    const totalMedicines = medicines.length
    const pendingMedicines = totalMedicines - medicationsTaken
    const completionRatio = totalMedicines > 0 ? medicationsTaken / totalMedicines : 0

    const healthStatus = completionRatio >= 1
        ? {
            mood: 'estable',
            energy: 86,
            sleep: 'Muy bien',
            waterIntake: 7,
            recommendation: 'Plan del dia completado. Sigue asi.',
            cardStyle: 'from-emerald-50 to-teal-50 border-emerald-100',
            iconStyle: 'bg-emerald-200 text-emerald-700',
            moodStyle: 'text-emerald-700',
        }
        : completionRatio >= 0.5
            ? {
                mood: 'en seguimiento',
                energy: 68,
                sleep: 'Aceptable',
                waterIntake: 6,
                recommendation: `Te queda ${pendingMedicines} toma pendiente. Vas bien.`,
                cardStyle: 'from-amber-50 to-orange-50 border-amber-100',
                iconStyle: 'bg-amber-200 text-amber-700',
                moodStyle: 'text-amber-700',
            }
            : {
                mood: 'con alerta',
                energy: 48,
                sleep: 'Mejorable',
                waterIntake: 5,
                recommendation: `Faltan ${pendingMedicines} tomas. Conviene priorizar la medicacion.`,
                cardStyle: 'from-rose-50 to-pink-50 border-rose-100',
                iconStyle: 'bg-rose-200 text-rose-600',
                moodStyle: 'text-rose-700',
            }

    const handleMedicineTaken = (medicineId) => {
        setMedicines((previousMedicines) =>
            previousMedicines.map((medicine) =>
                medicine.id === medicineId ? { ...medicine, taken: true } : medicine
            )
        )
        setPendingUnmarkMedicineId(null)
    }

    const requestMedicineUnmark = (medicineId) => {
        setPendingUnmarkMedicineId(medicineId)
    }

    const cancelMedicineUnmark = () => {
        setPendingUnmarkMedicineId(null)
    }

    const confirmMedicineUnmark = (medicineId) => {
        setMedicines((previousMedicines) =>
            previousMedicines.map((medicine) =>
                medicine.id === medicineId ? { ...medicine, taken: false } : medicine
            )
        )
        setPendingUnmarkMedicineId(null)
    }

    const handleEmergencyCall = () => {
        if (!callConfirmation) {
            setCallConfirmation(true)
            setTimeout(() => setCallConfirmation(false), 5000)
            return
        }
        window.alert(`Llamando a ${emergencyContacts[0].name}...`)
        setCallConfirmation(false)
    }

    const requestContactCall = (contactName) => {
        setPendingContactCallName(contactName)
    }

    const cancelContactCall = () => {
        setPendingContactCallName(null)
    }

    const confirmContactCall = (contactName) => {
        window.alert(`Llamando a ${contactName}...`)
        setPendingContactCallName(null)
    }

    const handleCaregiverAccess = () => {
        const pin = window.prompt('Introduce el PIN del cuidador (ej. 1234)')
        if (pin === '1234') {
            setIsCaregiverMode(true)
            return
        }
        if (pin !== null && pin.trim() !== '') {
            window.alert('PIN incorrecto')
        }
    }

    return (
        <div className="relative min-h-full px-5 pt-8 pb-40 flex flex-col fade-in">
            <header className="relative flex flex-col items-center pb-8">
                <button
                    type="button"
                    onClick={handleCaregiverAccess}
                    className="absolute right-0 top-0 rounded-full p-4 text-slate-300 transition hover:bg-slate-200 hover:text-slate-500"
                    aria-label="Acceso cuidador"
                >
                    <Settings className="h-6 w-6" />
                </button>

                <div className="relative">
                    <img
                        src={LogoHelpy}
                        alt="Helpy"
                        className="h-20 w-20 rounded-3xl object-cover shadow-md border-2 border-white bg-slate-100"
                    />
                    <div className="absolute -bottom-2 -right-2 bg-emerald-500 p-1.5 rounded-full border-2 border-white shadow-sm">
                        <ShieldCheck className="h-4 w-4 text-white" />
                    </div>
                </div>
                <p className="mt-3 text-lg font-bold text-slate-400 tracking-wide uppercase text-[0.8rem]">Helpy, Siempre Contigo</p>
            </header>

            <section className="space-y-6 flex-1">
                <div className="mb-4">
                    <h1 className="text-[2.75rem] leading-tight font-extrabold text-slate-800 tracking-tight">
                        Hola, Papá <span className="inline-block wave-emoji origin-bottom-right"></span>
                    </h1>
                    <p className="text-xl text-slate-500 font-medium mt-1">¿Cómo te encuentras hoy?</p>
                </div>

                {/* Tarjeta Estado de Salud */}
                <article className={`rounded-[2rem] bg-gradient-to-br border-2 p-6 shadow-sm ${healthStatus.cardStyle}`}>
                    <div className="flex items-center gap-4 mb-4">
                        <div className={`p-3 rounded-2xl ${healthStatus.iconStyle}`}>
                            <Heart className="h-8 w-8" />
                        </div>
                        <h2 className="text-2xl font-bold text-slate-800">Tu salud hoy</h2>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                        <div className="bg-white rounded-xl p-4 border border-slate-100">
                            <p className="text-sm text-slate-600 font-semibold">Ánimo</p>
                            <p className={`text-2xl font-bold mt-2 capitalize ${healthStatus.moodStyle}`}>{healthStatus.mood}</p>
                        </div>
                        <div className="bg-white rounded-xl p-4 border border-slate-100">
                            <p className="text-sm text-slate-600 font-semibold">Energía</p>
                            <div className="mt-2 bg-slate-200 rounded-full h-3">
                                <div
                                    className={`h-3 rounded-full ${completionRatio >= 1 ? 'bg-emerald-500' : completionRatio >= 0.5 ? 'bg-amber-500' : 'bg-rose-500'}`}
                                    style={{ width: `${healthStatus.energy}%` }}
                                />
                            </div>
                            <p className="text-sm font-bold text-slate-700 mt-1">{healthStatus.energy}%</p>
                        </div>
                        <div className="bg-white rounded-xl p-4 border border-slate-100">
                            <p className="text-sm text-slate-600 font-semibold">Descanso</p>
                            <p className={`text-lg font-bold mt-2 ${healthStatus.moodStyle}`}>{healthStatus.sleep} 😴</p>
                        </div>
                        <div className="bg-white rounded-xl p-4 border border-slate-100">
                            <p className="text-sm text-slate-600 font-semibold">Agua</p>
                            <p className={`text-lg font-bold mt-2 ${healthStatus.moodStyle}`}>{healthStatus.waterIntake} vasos</p>
                        </div>
                    </div>
                    <div className="mt-4 rounded-xl bg-white/80 border border-white p-3">
                        <p className="text-xs font-bold uppercase tracking-wide text-slate-500">Recomendacion</p>
                        <p className="mt-1 text-sm font-semibold text-slate-700">{healthStatus.recommendation}</p>
                    </div>
                </article>

                {/* Tarjeta Medicación */}
                <article className="rounded-[2rem] bg-white border-2 border-blue-100 p-6 shadow-sm">
                    <div className="flex items-center gap-4 mb-4">
                        <div className="p-3 bg-blue-100 text-blue-600 rounded-2xl">
                            <Pill className="h-8 w-8" />
                        </div>
                        <div className="flex-1">
                            <h2 className="text-2xl font-bold text-slate-800">Medicación</h2>
                            <p className="text-lg font-semibold text-blue-600 mt-1">{medicationsTaken} de {medicines.length} tomadas</p>
                        </div>
                    </div>

                    {/* Barra de progreso */}
                    <div className="mb-6 flex gap-2">
                        {medicines.map((medicine) => (
                            <div
                                key={medicine.id}
                                className={`flex-1 h-4 rounded-full transition-all ${medicine.taken
                                    ? 'bg-emerald-500 shadow-[0_2px_8px_rgba(16,185,129,0.3)]'
                                    : 'bg-slate-200'
                                    }`}
                            />
                        ))}
                    </div>

                    {/* Lista de medicinas */}
                    <div className="space-y-3">
                        {medicines.map((medicine) => (
                            <div key={medicine.id} className={`rounded-xl p-4 border-2 transition-all ${medicine.taken
                                ? 'bg-emerald-50 border-emerald-200'
                                : 'bg-slate-50 border-slate-200'
                                }`}>
                                <div className="flex flex-col gap-3">
                                    <div className="flex items-start justify-between gap-3">
                                        <div className="flex-1 min-w-0">
                                            <p className="font-bold text-slate-800 break-words leading-snug">{medicine.name}</p>
                                            <p className="text-sm text-slate-600">Hora: {medicine.time}</p>
                                        </div>
                                        {medicine.taken ? (
                                            <div className="flex items-center gap-2 bg-emerald-100 px-3 py-2 rounded-lg shrink-0">
                                                <ShieldCheck className="h-5 w-5 text-emerald-600" />
                                                <span className="text-sm font-bold text-emerald-700">Tomada</span>
                                            </div>
                                        ) : (
                                            <button
                                                type="button"
                                                onClick={() => handleMedicineTaken(medicine.id)}
                                                className="shrink-0 px-4 py-2 bg-blue-500 text-white rounded-lg font-bold hover:bg-blue-400 transition-all"
                                            >
                                                Tomar
                                            </button>
                                        )}
                                    </div>

                                    {medicine.taken && (
                                        pendingUnmarkMedicineId === medicine.id ? (
                                            <div className="flex items-center justify-between gap-2 rounded-xl border border-rose-200 bg-rose-50 px-3 py-2">
                                                <p className="text-xs font-semibold text-rose-700">Quieres desmarcar esta toma?</p>
                                                <div className="flex items-center gap-2">
                                                    <button
                                                        type="button"
                                                        onClick={() => confirmMedicineUnmark(medicine.id)}
                                                        className="rounded-md bg-rose-500 px-2.5 py-1 text-xs font-bold text-white hover:bg-rose-400 transition-all"
                                                    >
                                                        Si
                                                    </button>
                                                    <button
                                                        type="button"
                                                        onClick={cancelMedicineUnmark}
                                                        className="rounded-md bg-slate-200 px-2.5 py-1 text-xs font-bold text-slate-700 hover:bg-slate-300 transition-all"
                                                    >
                                                        No
                                                    </button>
                                                </div>
                                            </div>
                                        ) : (
                                            <div className="flex justify-end">
                                                <button
                                                    type="button"
                                                    onClick={() => requestMedicineUnmark(medicine.id)}
                                                    className="px-2.5 py-1 text-xs bg-slate-200 text-slate-700 rounded-md font-semibold hover:bg-slate-300 transition-all"
                                                >
                                                    Desmarcar
                                                </button>
                                            </div>
                                        )
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>
                </article>

                {/* Tarjeta Citas */}
                <article className="rounded-[2rem] bg-white border-2 border-slate-100 p-6 shadow-sm">
                    <div className="flex items-center gap-4 mb-4">
                        <div className="p-3 bg-slate-100 text-slate-600 rounded-2xl">
                            <CalendarClock className="h-8 w-8" />
                        </div>
                        <h2 className="text-2xl font-bold text-slate-800">Tus citas médicas</h2>
                    </div>

                    <div className="space-y-3">
                        {appointmentsList.map((appointment, index) => (
                            <div key={appointment.id} className={`rounded-xl p-4 border-2 ${index === 0
                                ? 'bg-blue-50 border-blue-200'
                                : 'bg-slate-50 border-slate-200'
                                }`}>
                                <div className="flex items-start justify-between">
                                    <div className="flex-1">
                                        <div className="flex items-center gap-2">
                                            <p className="font-bold text-slate-800">{appointment.doctor}</p>
                                            {index === 0 && <span className="text-xs font-bold bg-red-100 text-red-700 px-2 py-1 rounded">PRÓXIMA</span>}
                                        </div>
                                        <p className="text-sm text-slate-600 mt-2">
                                            {appointment.date}, {appointment.time}
                                        </p>
                                        <div className="flex items-center gap-1 mt-2 text-slate-600">
                                            <MapPin className="h-4 w-4" />
                                            <span className="text-sm">{appointment.location}</span>
                                        </div>
                                    </div>
                                    <div className={`text-3xl ${index === 0 ? 'animate-pulse' : ''}`}>
                                        📅
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </article>

                {/* Tarjeta Contactos de Emergencia */}
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
                                {pendingContactCallName === contact.name ? (
                                    <div className="mt-3 space-y-2">
                                        <button
                                            type="button"
                                            onClick={() => confirmContactCall(contact.name)}
                                            className="w-full py-2 bg-rose-500 text-white rounded-lg font-bold hover:bg-rose-400 transition-all text-sm"
                                        >
                                            Pulsa otra vez para llamar
                                        </button>
                                        <button
                                            type="button"
                                            onClick={cancelContactCall}
                                            className="w-full py-1.5 bg-slate-200 text-slate-700 rounded-lg font-semibold hover:bg-slate-300 transition-all text-xs"
                                        >
                                            Cancelar
                                        </button>
                                    </div>
                                ) : (
                                    <button
                                        type="button"
                                        onClick={() => requestContactCall(contact.name)}
                                        className="mt-3 w-full py-2 bg-orange-500 text-white rounded-lg font-bold hover:bg-orange-400 transition-all text-sm"
                                    >
                                        Llamar
                                    </button>
                                )}
                            </div>
                        ))}
                    </div>
                </article>
            </section>

            {/* Botón de emergencia */}
            <div className="absolute bottom-0 left-0 right-0 w-full z-30 p-6 pt-16 bg-gradient-to-t from-[#f8fafc] via-[#f8fafc]/90 to-transparent pointer-events-none">
                <div className="pointer-events-auto mx-auto flex w-full flex-col items-center gap-2">
                    <button
                        type="button"
                        onClick={handleEmergencyCall}
                        className="mx-auto flex w-full items-center justify-center gap-4 rounded-[2rem] bg-rose-500 px-6 py-6 text-[1.35rem] font-black text-white shadow-[0_8px_0_rgb(190,18,60)] transition-all hover:bg-rose-400 hover:translate-y-1 hover:shadow-[0_4px_0_rgb(190,18,60)] active:shadow-none active:translate-y-2"
                    >
                        <Phone className="h-8 w-8 fill-current" />
                        {callConfirmation ? 'Pulsa otra vez para llamar' : `Llamar a ${emergencyContacts[0].name}`}
                    </button>

                    <div className="h-10 w-full">
                        {callConfirmation ? (
                            <button
                                type="button"
                                onClick={() => setCallConfirmation(false)}
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
        </div>
    )
}

export default ElderlyView
