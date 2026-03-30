import { Settings, ShieldCheck } from 'lucide-react'
import LogoHelpy from '../../assets/LogoHelpy.png'

function ElderlyHeader({ onCaregiverAccess }) {
  return (
    <header className="relative flex flex-col items-center pb-8">
      <button
        type="button"
        onClick={onCaregiverAccess}
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
      <p className="mt-3 text-lg font-bold text-slate-400 tracking-wide uppercase text-[0.8rem]">
        Helpy, Siempre Contigo
      </p>
    </header>
  )
}

export default ElderlyHeader
