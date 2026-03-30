import { useState } from 'react'
import { ArrowLeft } from 'lucide-react'
import { useApp } from '../../context/AppContext'
import LogoHelpy from '../../assets/LogoHelpy.png'

function CaregiverHeader() {
  const { setIsCaregiverMode } = useApp()
  const [logoError, setLogoError] = useState(false)

  return (
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
  )
}

export default CaregiverHeader
