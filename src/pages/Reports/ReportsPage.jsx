import { saveAs } from 'file-saver'
import { utils, write } from 'xlsx'
import { jsPDF } from 'jspdf'
import { useMemo, useState } from 'react'
import { useAttendance } from '../../context/AttendanceContext.jsx'
import Header from '../../components/Layout/Header.jsx'

const ReportsPage = () => {
  const { students, batches, attendance } = useAttendance()
  const [search, setSearch] = useState('')
  const [selectedBatch, setSelectedBatch] = useState('')

  const reportData = useMemo(() => {
    return students
      .filter((student) =>
        student.name.toLowerCase().includes(search.toLowerCase()) ||
        student.email.toLowerCase().includes(search.toLowerCase()),
      )
      .filter((student) => (selectedBatch ? student.batchId === selectedBatch : true))
      .map((student) => {
        const history = attendance.filter((record) => record.studentId === student.id)
        const present = history.filter((item) => item.status === 'present').length
        const absent = history.filter((item) => item.status === 'absent').length
        const total = present + absent
        return {
          ...student,
          batchName: batches.find((batch) => batch.id === student.batchId)?.name || 'Unknown',
          present,
          absent,
          percentage: total ? Math.round((present / total) * 100) : 0,
        }
      })
  }, [students, attendance, batches, search, selectedBatch])

  const exportCSV = () => {
    const rows = [
      ['Name', 'Email', 'Batch', 'Present', 'Absent', 'Attendance %'],
      ...reportData.map((item) => [item.name, item.email, item.batchName, item.present, item.absent, item.percentage]),
    ]
    const csv = rows.map((row) => row.join(',')).join('\n')
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' })
    saveAs(blob, 'attendance-report.csv')
  }

  const exportExcel = () => {
    const worksheet = utils.json_to_sheet(reportData)
    const workbook = utils.book_new()
    utils.book_append_sheet(workbook, worksheet, 'Report')
    const excelBuffer = write(workbook, { bookType: 'xlsx', type: 'array' })
    const blob = new Blob([excelBuffer], { type: 'application/octet-stream' })
    saveAs(blob, 'attendance-report.xlsx')
  }

  const exportPDF = () => {
    const doc = new jsPDF({ orientation: 'landscape' })
    doc.text('Attendance Report', 14, 20)
    reportData.slice(0, 20).forEach((item, index) => {
      doc.text(`${item.name} - ${item.batchName} - ${item.percentage}%`, 14, 30 + index * 8)
    })
    doc.save('attendance-report.pdf')
  }

  return (
    <div className="space-y-8 px-4 py-6 sm:px-6 lg:px-8">
      <Header title="Reports" subtitle="Attendance exports & analytics" />
      <div className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-soft dark:border-slate-800 dark:bg-slate-900">
        <div className="grid gap-4 md:grid-cols-3">
          <input
            type="search"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search student or email"
            className="w-full rounded-3xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none dark:border-slate-800 dark:bg-slate-950 dark:text-white"
          />
          <select
            value={selectedBatch}
            onChange={(e) => setSelectedBatch(e.target.value)}
            className="w-full rounded-3xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none dark:border-slate-800 dark:bg-slate-950 dark:text-white"
          >
            <option value="">All batches</option>
            {batches.map((batch) => (
              <option key={batch.id} value={batch.id}>{batch.name}</option>
            ))}
          </select>
          <div className="flex gap-2">
            <button onClick={exportCSV} className="rounded-3xl bg-brand-600 px-4 py-3 text-sm font-semibold text-white transition hover:bg-brand-700">Export CSV</button>
            <button onClick={exportExcel} className="rounded-3xl bg-slate-900 px-4 py-3 text-sm font-semibold text-white transition hover:bg-slate-700">Export XLSX</button>
            <button onClick={exportPDF} className="rounded-3xl bg-rose-600 px-4 py-3 text-sm font-semibold text-white transition hover:bg-rose-700">Export PDF</button>
          </div>
        </div>
      </div>
      <div className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-soft dark:border-slate-800 dark:bg-slate-900">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-slate-200 text-sm dark:divide-slate-800">
            <thead className="bg-slate-50 uppercase tracking-[0.2em] text-slate-500 dark:bg-slate-950 dark:text-slate-400">
              <tr>
                <th className="px-4 py-3 text-left">Student</th>
                <th className="px-4 py-3 text-left">Batch</th>
                <th className="px-4 py-3 text-left">Present</th>
                <th className="px-4 py-3 text-left">Absent</th>
                <th className="px-4 py-3 text-left">Attendance %</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200 dark:divide-slate-800">
              {reportData.map((item) => (
                <tr key={item.id} className="hover:bg-slate-50 dark:hover:bg-slate-950">
                  <td className="px-4 py-4 text-slate-900 dark:text-white">{item.name}</td>
                  <td className="px-4 py-4 text-slate-500 dark:text-slate-300">{item.batchName}</td>
                  <td className="px-4 py-4 text-slate-900 dark:text-white">{item.present}</td>
                  <td className="px-4 py-4 text-slate-900 dark:text-white">{item.absent}</td>
                  <td className="px-4 py-4">
                    <span className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold ${item.percentage >= 75 ? 'bg-emerald-100 text-emerald-700' : item.percentage >= 50 ? 'bg-amber-100 text-amber-700' : 'bg-rose-100 text-rose-700'}`}>
                      {item.percentage}%
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

export default ReportsPage
