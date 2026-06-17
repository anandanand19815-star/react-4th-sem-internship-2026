import { useMemo, useState } from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'react-toastify'
import { useAttendance } from '../../context/AttendanceContext.jsx'
import Header from '../../components/Layout/Header.jsx'

const dateOptions = [
  { value: 'today', label: 'Today' },
  { value: 'yesterday', label: 'Yesterday' },
  { value: 'last7', label: 'Last 7 Days' },
  { value: 'last30', label: 'Last 30 Days' },
  { value: 'custom', label: 'Custom Range' },
]

const AttendancePage = () => {
  const { students, batches, filteredAttendance, dateFilter, customRange, setDateFilter, setCustomRange, markAttendance, bulkUpdate } = useAttendance()
  const [selectedBatch, setSelectedBatch] = useState(batches[0]?.id || '')
  const [bulkStatus, setBulkStatus] = useState('present')
  const { handleSubmit } = useForm()

  const today = new Date().toISOString().slice(0, 10)

  const batchStudents = useMemo(
    () => students.filter((student) => student.batchId === selectedBatch),
    [students, selectedBatch],
  )

  const attendanceMap = useMemo(() => {
    return filteredAttendance.reduce((acc, record) => {
      acc[record.studentId] = record.status
      return acc
    }, {})
  }, [filteredAttendance])

  const handleMark = (studentId, status) => {
    markAttendance({ studentId, batchId: selectedBatch, date: today, status })
    toast.success('Attendance updated')
  }

  const handleBulk = () => {
    bulkUpdate({ batchId: selectedBatch, date: today, status: bulkStatus })
    toast.success('Bulk attendance applied')
  }

  return (
    <div className="space-y-8 px-4 py-6 sm:px-6 lg:px-8">
      <Header title="Attendance" subtitle="Mark daily attendance" />
      <div className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-soft dark:border-slate-800 dark:bg-slate-900">
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          <div className="space-y-3">
            <p className="text-sm font-medium uppercase tracking-[0.3em] text-slate-400">Batch</p>
            <select
              value={selectedBatch}
              onChange={(e) => setSelectedBatch(e.target.value)}
              className="w-full rounded-3xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none dark:border-slate-800 dark:bg-slate-950 dark:text-white"
            >
              {batches.map((batch) => (
                <option key={batch.id} value={batch.id}>{batch.name}</option>
              ))}
            </select>
          </div>
          <div className="space-y-3">
            <p className="text-sm font-medium uppercase tracking-[0.3em] text-slate-400">Filter</p>
            <select
              value={dateFilter}
              onChange={(e) => setDateFilter(e.target.value)}
              className="w-full rounded-3xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none dark:border-slate-800 dark:bg-slate-950 dark:text-white"
            >
              {dateOptions.map((option) => (
                <option key={option.value} value={option.value}>{option.label}</option>
              ))}
            </select>
          </div>
          {dateFilter === 'custom' ? (
            <>
              <div className="space-y-3">
                <p className="text-sm font-medium uppercase tracking-[0.3em] text-slate-400">From</p>
                <input
                  type="date"
                  value={customRange.from}
                  onChange={(e) => setCustomRange({ ...customRange, from: e.target.value })}
                  className="w-full rounded-3xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none dark:border-slate-800 dark:bg-slate-950 dark:text-white"
                />
              </div>
              <div className="space-y-3">
                <p className="text-sm font-medium uppercase tracking-[0.3em] text-slate-400">To</p>
                <input
                  type="date"
                  value={customRange.to}
                  onChange={(e) => setCustomRange({ ...customRange, to: e.target.value })}
                  className="w-full rounded-3xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none dark:border-slate-800 dark:bg-slate-950 dark:text-white"
                />
              </div>
            </>
          ) : null}
          <div className="space-y-3">
            <p className="text-sm font-medium uppercase tracking-[0.3em] text-slate-400">Bulk update</p>
            <div className="flex gap-3">
              <select
                value={bulkStatus}
                onChange={(e) => setBulkStatus(e.target.value)}
                className="flex-1 rounded-3xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none dark:border-slate-800 dark:bg-slate-950 dark:text-white"
              >
                <option value="present">Present</option>
                <option value="absent">Absent</option>
              </select>
              <button
                type="button"
                onClick={handleBulk}
                className="rounded-3xl bg-brand-600 px-4 py-3 text-sm font-semibold text-white transition hover:bg-brand-700"
              >
                Apply
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-soft dark:border-slate-800 dark:bg-slate-900">
        <h3 className="mb-5 text-xl font-semibold text-slate-900 dark:text-white">Attendance records</h3>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-slate-200 text-sm">
            <thead className="bg-slate-50 text-left text-xs uppercase tracking-[0.2em] text-slate-500 dark:bg-slate-950 dark:text-slate-400">
              <tr>
                <th className="px-4 py-3">Student</th>
                <th className="px-4 py-3">Batch</th>
                <th className="px-4 py-3">Status</th>
                <th className="px-4 py-3">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200 dark:divide-slate-800">
              {batchStudents.map((student) => {
                const status = attendanceMap[student.id] || 'absent'
                return (
                  <tr key={student.id} className="hover:bg-slate-50 dark:hover:bg-slate-950">
                    <td className="px-4 py-4 text-slate-900 dark:text-white">{student.name}</td>
                    <td className="px-4 py-4 text-slate-500 dark:text-slate-300">{batches.find((batch) => batch.id === student.batchId)?.name}</td>
                    <td className="px-4 py-4">
                      <span className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold ${status === 'present' ? 'bg-emerald-100 text-emerald-700' : 'bg-rose-100 text-rose-700'}`}>
                        {status}
                      </span>
                    </td>
                    <td className="px-4 py-4 space-x-2">
                      <button
                        type="button"
                        onClick={() => handleMark(student.id, 'present')}
                        className="rounded-full bg-emerald-600 px-3 py-2 text-xs font-semibold text-white transition hover:bg-emerald-700"
                      >
                        Present
                      </button>
                      <button
                        type="button"
                        onClick={() => handleMark(student.id, 'absent')}
                        className="rounded-full bg-rose-600 px-3 py-2 text-xs font-semibold text-white transition hover:bg-rose-700"
                      >
                        Absent
                      </button>
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

export default AttendancePage
