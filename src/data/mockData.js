export const initialMedicines = [
  { id: 1, name: 'Atorvastatina', time: '08:00', taken: true },
  { id: 2, name: 'Losartan', time: '14:00', taken: false },
  { id: 3, name: 'Omeprazol', time: '20:00', taken: false },
]

export const appointmentsList = [
  { id: 1, doctor: 'Médico de cabecera', date: 'Mañana', time: '10:00', location: 'Centro de salud', priority: 'high' },
  { id: 2, doctor: 'Oftalmólogo', date: 'En 5 días', time: '15:30', location: 'Clínica privada', priority: 'normal' },
  { id: 3, doctor: 'Cardiólogo', date: 'En 15 días', time: '11:00', location: 'Hospital central', priority: 'normal' },
]

export const emergencyContacts = [
  { name: 'Carlos (hijo)', phone: '+34 623 456 789', relation: 'hijo' },
  { name: 'María (vecina)', phone: '+34 612 345 678', relation: 'amiga' },
]

export const caregiverAppointments = [
  { id: 1, title: 'Médico de cabecera', day: 'MIE', date: '26 Mar', time: '10:00', location: 'Centro de salud', type: 'Presencial' },
  { id: 2, title: 'Analítica de sangre', day: 'VIE', date: '28 Mar', time: '12:30', location: 'Laboratorio Norte', type: 'Presencial' },
  { id: 3, title: 'Revisión cardiología', day: 'LUN', date: '31 Mar', time: '09:15', location: 'Hospital Central', type: 'Presencial' },
  { id: 4, title: 'Teleconsulta nutrición', day: 'JUE', date: '03 Abr', time: '17:00', location: 'Videollamada', type: 'Online' },
]

export const dailyStatus = {
  sleepHours: 7.5,
  hydrationGlasses: 6,
  bloodPressure: '132/82',
  pulse: 72,
}

export const activityLog = [
  { id: 1, text: 'Pastilla Atorvastatina confirmada', when: '08:05', tone: 'ok' },
  { id: 2, text: 'Recordatorio enviado para toma de las 14:00', when: '14:10', tone: 'warn' },
  { id: 3, text: 'Llamada de seguimiento completada', when: '14:25', tone: 'info' },
  { id: 4, text: 'Nueva cita añadida: Teleconsulta nutrición', when: '15:02', tone: 'info' },
]
