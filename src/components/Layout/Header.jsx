import { FiBell } from 'react-icons/fi'

const Header = ({ title, subtitle }) => {
  return (
    <header className="mb-6 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
      <div>
        <p className="text-sm font-medium uppercase tracking-[0.25em] text-brand-600">{subtitle}</p>
        <h2 className="mt-2 text-3xl font-semibold text-slate-900 dark:text-white">{title}</h2>
      </div>
      <button className="inline-flex items-center gap-2 rounded-3xl bg-slate-900 px-4 py-3 text-sm font-semibold text-white transition hover:bg-slate-700 dark:bg-brand-500 dark:text-slate-950 dark:hover:bg-brand-400">
        <FiBell className="h-5 w-5" /> Notifications
      </button>
    </header>
  )
}

export default Header
