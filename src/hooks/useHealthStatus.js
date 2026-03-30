export function useHealthStatus(medicines) {
  const taken = medicines.filter((m) => m.taken).length
  const total = medicines.length
  const pending = total - taken
  const ratio = total > 0 ? taken / total : 0

  if (ratio >= 1) {
    return {
      ratio,
      mood: 'estable',
      energy: 86,
      sleep: 'Muy bien',
      waterIntake: 7,
      recommendation: 'Plan del dia completado. Sigue asi.',
      cardStyle: 'from-emerald-50 to-teal-50 border-emerald-100',
      iconStyle: 'bg-emerald-200 text-emerald-700',
      moodStyle: 'text-emerald-700',
      energyBarStyle: 'bg-emerald-500',
    }
  }

  if (ratio >= 0.5) {
    return {
      ratio,
      mood: 'en seguimiento',
      energy: 68,
      sleep: 'Aceptable',
      waterIntake: 6,
      recommendation: `Te queda ${pending} toma pendiente. Vas bien.`,
      cardStyle: 'from-amber-50 to-orange-50 border-amber-100',
      iconStyle: 'bg-amber-200 text-amber-700',
      moodStyle: 'text-amber-700',
      energyBarStyle: 'bg-amber-500',
    }
  }

  return {
    ratio,
    mood: 'con alerta',
    energy: 48,
    sleep: 'Mejorable',
    waterIntake: 5,
    recommendation: `Faltan ${pending} tomas. Conviene priorizar la medicacion.`,
    cardStyle: 'from-rose-50 to-pink-50 border-rose-100',
    iconStyle: 'bg-rose-200 text-rose-600',
    moodStyle: 'text-rose-700',
    energyBarStyle: 'bg-rose-500',
  }
}
