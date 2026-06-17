import { useTheme } from '../../context/ThemeContext.jsx'
import Header from '../../components/Layout/Header.jsx'

const SettingsPage = () => {
  const { theme, toggleTheme } = useTheme()

  return (
    <div className="space-y-8 px-4 py-6 sm:px-6 lg:px-8">
      <Header title="Settings" subtitle="Customize your dashboard" />
      <div className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-soft dark:border-slate-800 dark:bg-slate-900">
        <div className="grid gap-6 md:grid-cols-2">
          <div className="rounded-[2rem] border border-slate-200 bg-slate-50 p-6 dark:border-slate-800 dark:bg-slate-950">
            <h3 className="text-xl font-semibold text-slate-900 dark:text-white">Theme</h3>
            <p className="mt-3 text-sm text-slate-500 dark:text-slate-400">Switch between light and dark mode for a modern training UI.</p>
            <button
              type="button"
              onClick={toggleTheme}
              className="mt-6 rounded-3xl bg-brand-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-brand-700"
            >
              {theme === 'light' ? 'Enable dark mode' : 'Enable light mode'}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default SettingsPage
