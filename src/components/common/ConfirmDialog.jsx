function ConfirmDialog({ message, onConfirm, onCancel }) {
  return (
    <div className="flex items-center justify-between gap-2 rounded-xl border border-rose-200 bg-rose-50 px-3 py-2">
      <p className="text-xs font-semibold text-rose-700">{message}</p>
      <div className="flex items-center gap-2">
        <button
          type="button"
          onClick={onConfirm}
          className="rounded-md bg-rose-500 px-2.5 py-1 text-xs font-bold text-white hover:bg-rose-400 transition-all"
        >
          Sí
        </button>
        <button
          type="button"
          onClick={onCancel}
          className="rounded-md bg-slate-200 px-2.5 py-1 text-xs font-bold text-slate-700 hover:bg-slate-300 transition-all"
        >
          No
        </button>
      </div>
    </div>
  )
}

export default ConfirmDialog
