import { Area, Bar, CartesianGrid, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts'
import { motion } from 'framer-motion'
import Header from '../../components/Layout/Header.jsx'
import { trendData, batchPerformance } from '../../utils/chartData.js'
import { useAttendance } from '../../context/AttendanceContext.jsx'

const statCards = [
  { title: 'Total Students', value: '42', color: 'from-slate-900 to-brand-600', icon: '👥' },
  { title: 'Total Batches', value: '5', color: 'from-emerald-500 to-cyan-500', icon: '📚' },
  { title: 'Present Today', value: '31', color: 'from-brand-500 to-violet-500', icon: '✅' },
  { title: 'Absent Today', value: '11', color: 'from-rose-500 to-orange-500', icon: '❌' },
]

const DashboardPage = () => {
  const { students, batches, filteredAttendance } = useAttendance()
  const presentToday = filteredAttendance.filter((item) => item.status === 'present').length
  const absentToday = filteredAttendance.filter((item) => item.status === 'absent').length
  const overallPercent = Math.round((presentToday / Math.max(filteredAttendance.length, 1)) * 100)

  return (
    <div className="space-y-8 px-4 py-6 sm:px-6 lg:px-8">
      <Header title="Attendance Dashboard" subtitle="Daily training overview" />
      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
        {statCards.map((card) => (
          <motion.div
            key={card.title}
            className={`rounded-[2rem] border border-slate-200 bg-white p-6 shadow-soft dark:border-slate-800 dark:bg-slate-900`}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
          >
            <div className="flex items-center justify-between gap-3">
              <div>
                <p className="text-sm font-medium uppercase tracking-[0.3em] text-slate-400 dark:text-slate-500">{card.title}</p>
                <p className="mt-4 text-3xl font-semibold text-slate-900 dark:text-white">{card.value}</p>
              </div>
              <div className={`flex h-12 w-12 items-center justify-center rounded-3xl bg-gradient-to-br ${card.color} text-white shadow-soft`}>
                <span className="text-xl">{card.icon}</span>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      <div className="grid gap-6 xl:grid-cols-2">
        <section className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-soft dark:border-slate-800 dark:bg-slate-900">
          <div className="mb-6 flex items-center justify-between">
            <div>
              <p className="text-sm font-medium uppercase tracking-[0.3em] text-slate-400">Attendance Trend</p>
              <h3 className="mt-2 text-xl font-semibold text-slate-900 dark:text-white">Last 7 days</h3>
            </div>
          </div>
          <div className="h-72 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={trendData} margin={{ top: 20, right: 10, left: -16, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                <XAxis dataKey="name" stroke="#64748b" />
                <YAxis stroke="#64748b" />
                <Tooltip />
                <Line type="monotone" dataKey="attendance" stroke="#2563eb" strokeWidth={3} dot={{ r: 4 }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </section>

        <section className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-soft dark:border-slate-800 dark:bg-slate-900">
          <div className="mb-6 flex items-center justify-between">
            <div>
              <p className="text-sm font-medium uppercase tracking-[0.3em] text-slate-400">Batch Performance</p>
              <h3 className="mt-2 text-xl font-semibold text-slate-900 dark:text-white">This month</h3>
            </div>
          </div>
          <div className="h-72 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <Bar data={batchPerformance} margin={{ top: 20, right: 10, left: -16, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                <XAxis dataKey="name" stroke="#64748b" />
                <YAxis stroke="#64748b" />
                <Tooltip />
                <Bar dataKey="present" fill="#22c55e" radius={[12, 12, 0, 0]} />
                <Bar dataKey="absent" fill="#ef4444" radius={[12, 12, 0, 0]} />
              </Bar>
            </ResponsiveContainer>
          </div>
        </section>
      </div>

      <div className="grid gap-6 xl:grid-cols-3">
        <section className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-soft dark:border-slate-800 dark:bg-slate-900">
          <div className="mb-4 flex items-center justify-between">
            <div>
              <p className="text-sm uppercase tracking-[0.3em] text-slate-400">Summary</p>
              <h3 className="text-xl font-semibold text-slate-900 dark:text-white">Key metrics</h3>
            </div>
          </div>
          <div className="space-y-4">
            <div className="rounded-3xl bg-slate-50 p-4 dark:bg-slate-950">
              <p className="text-sm text-slate-500 dark:text-slate-400">Active batches</p>
              <p className="mt-2 text-3xl font-semibold text-slate-900 dark:text-white">{batches.length}</p>
            </div>
            <div className="rounded-3xl bg-slate-50 p-4 dark:bg-slate-950">
              <p className="text-sm text-slate-500 dark:text-slate-400">Students tracked</p>
              <p className="mt-2 text-3xl font-semibold text-slate-900 dark:text-white">{students.length}</p>
            </div>
            <div className="rounded-3xl bg-slate-50 p-4 dark:bg-slate-950">
              <p className="text-sm text-slate-500 dark:text-slate-400">Overall attendance</p>
              <p className="mt-2 text-3xl font-semibold text-slate-900 dark:text-white">{overallPercent}%</p>
            </div>
          </div>
        </section>
      </div>
    </div>
  )
}

export default DashboardPage
