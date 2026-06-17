import { NavLink } from 'react-router-dom'
import { FiActivity, FiBookOpen, FiCalendar, FiFileText, FiLock, FiUsers, FiSun, FiMoon } from 'react-icons/fi'
import { useTheme } from '../../context/ThemeContext.jsx'
import { useAuth } from '../../context/AuthContext.jsx'

const navItems = [
  { path: '/', label: 'Dashboard', icon: FiActivity },
  { path: '/attendance', label: 'Attendance', icon: FiCalendar },
  { path: '/students', label: 'Students', icon: FiUsers },
  { path: '/batches', label: 'Batches', icon: FiBookOpen },
  { path: '/reports', label: 'Reports', icon: FiFileText },
  { path: '/settings', label: 'Settings', icon: FiLock },
]

const Sidebar = () => {
  const { theme, toggleTheme } = useTheme()
  const { logout, user } = useAuth()

  return (
    <aside className="flex h-full w-72 flex-col gap-8 border-r border-slate-200 bg-slate-50 px-5 py-6 dark:border-slate-800 dark:bg-slate-950 md:w-80">
      <div>
        <div className="mb-6 flex items-center gap-3">
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-brand-500 text-white shadow-soft">
            TS
          </div>
          <div>
            <p className="text-sm text-slate-500 dark:text-slate-400">Trainer Session</p>
            <h1 className="text-xl font-semibold text-slate-900 dark:text-white">Attendance</h1>
          </div>
        </div>
        <div className="rounded-3xl border border-slate-200 bg-white p-4 shadow-soft dark:border-slate-800 dark:bg-slate-900">
          <p className="text-xs uppercase tracking-[0.3em] text-slate-400">Logged in as</p>
          <p className="mt-2 text-sm font-semibold text-slate-900 dark:text-white">{user?.name}</p>
          <p className="text-xs text-slate-500 dark:text-slate-400">{user?.role}</p>
        </div>
      </div>

      <nav className="flex flex-1 flex-col gap-2">
        {navItems.map((item) => {
          const Icon = item.icon
          return (
            <NavLink
              key={item.path}
              to={item.path}
              end={item.path === '/'}
              className={({ isActive }) =>
                `flex items-center gap-3 rounded-3xl px-4 py-3 text-sm font-medium transition ${
                  isActive
                    ? 'bg-brand-500 text-white shadow-soft'
                    : 'text-slate-600 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-800'
                }`
              }
            >
              <Icon className="h-5 w-5" />
              {item.label}
            </NavLink>
          )
        })}
      </nav>

      <div className="flex flex-col gap-3">
        <button
          type="button"
          onClick={toggleTheme}
          className="inline-flex items-center justify-between rounded-3xl border border-slate-200 bg-white px-4 py-3 text-sm font-medium text-slate-700 shadow-soft transition hover:border-brand-300 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-200"
        >
          <span>{theme === 'light' ? 'Light Theme' : 'Dark Theme'}</span>
          {theme === 'light' ? <FiMoon /> : <FiSun />}
        </button>
        <button
          type="button"
          onClick={logout}
          className="inline-flex items-center justify-center rounded-3xl bg-slate-900 px-4 py-3 text-sm font-medium text-white transition hover:bg-slate-700 dark:bg-slate-100 dark:text-slate-900 dark:hover:bg-slate-200"
        >
          Logout
        </button>
      </div>
    </aside>
  )
}

export default Sidebar
