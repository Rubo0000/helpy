import { Settings } from 'lucide-react'
// import LogoHelpy from '../../assets/LogoHelpy.png'

function ElderlyHeader({ onCaregiverAccess }) {
  return (
    <header className="relative flex flex-col">
      <button
        type="button"
        onClick={onCaregiverAccess}
        className="absolute right-0 top-0 rounded-full p-4 text-slate-300 transition hover:bg-slate-200 hover:text-slate-500"
        aria-label="Acceso cuidador"
      >
        <Settings className="h-6 w-6" />
      </button>

        <div className="mb-4">
            <h1 className="text-[2.75rem] leading-tight font-extrabold text-slate-800 tracking-tight">
                Hola, Papá <span className="inline-block wave-emoji origin-bottom-right">👋</span>
            </h1>
            {/*<p className="text-xl text-slate-500 font-medium mt-1">¿Cómo te encuentras hoy?</p>*/}
        </div>

        {/*<div className="relative">
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
      </p>*/}
    </header>
  )
}

export default ElderlyHeader
