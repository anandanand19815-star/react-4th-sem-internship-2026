import { useMemo, useState } from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'react-toastify'
import { useAttendance } from '../../context/AttendanceContext.jsx'
import Header from '../../components/Layout/Header.jsx'

const StudentsPage = () => {
  const { students, batches, addStudent, updateStudent, removeStudent } = useAttendance()
  const [editId, setEditId] = useState(null)
  const { register, handleSubmit, reset } = useForm()

  const editingStudent = useMemo(
    () => students.find((student) => student.id === editId),
    [students, editId],
  )

  const onSubmit = (data) => {
    if (editId) {
      updateStudent(editId, data)
      toast.success('Student updated')
      setEditId(null)
    } else {
      addStudent(data)
      toast.success('Student added')
    }
    reset()
  }

  const handleEdit = (student) => {
    setEditId(student.id)
    reset(student)
  }

  const handleDelete = (id) => {
    removeStudent(id)
    toast.success('Student removed')
  }

  return (
    <div className="space-y-8 px-4 py-6 sm:px-6 lg:px-8">
      <Header title="Students" subtitle="Manage student profiles" />
      <div className="grid gap-6 xl:grid-cols-3">
        <section className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-soft dark:border-slate-800 dark:bg-slate-900 xl:col-span-1">
          <h3 className="mb-4 text-xl font-semibold text-slate-900 dark:text-white">{editId ? 'Edit student' : 'Add student'}</h3>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <label className="block text-sm text-slate-700 dark:text-slate-200">
              Name
              <input {...register('name', { required: true })} className="mt-3 w-full rounded-3xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none dark:border-slate-800 dark:bg-slate-950 dark:text-white" />
            </label>
            <label className="block text-sm text-slate-700 dark:text-slate-200">
              Email
              <input {...register('email', { required: true })} type="email" className="mt-3 w-full rounded-3xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none dark:border-slate-800 dark:bg-slate-950 dark:text-white" />
            </label>
            <label className="block text-sm text-slate-700 dark:text-slate-200">
              Mobile
              <input {...register('mobile', { required: true })} className="mt-3 w-full rounded-3xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none dark:border-slate-800 dark:bg-slate-950 dark:text-white" />
            </label>
            <label className="block text-sm text-slate-700 dark:text-slate-200">
              Batch
              <select {...register('batchId', { required: true })} className="mt-3 w-full rounded-3xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none dark:border-slate-800 dark:bg-slate-950 dark:text-white">
                <option value="">Select batch</option>
                {batches.map((batch) => (
                  <option key={batch.id} value={batch.id}>{batch.name}</option>
                ))}
              </select>
            </label>
            <button type="submit" className="w-full rounded-3xl bg-brand-600 px-4 py-3 text-sm font-semibold text-white transition hover:bg-brand-700">
              {editId ? 'Update student' : 'Add student'}
            </button>
          </form>
        </section>

        <section className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-soft dark:border-slate-800 dark:bg-slate-900 xl:col-span-2">
          <h3 className="mb-4 text-xl font-semibold text-slate-900 dark:text-white">Student directory</h3>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-slate-200 text-sm dark:divide-slate-800">
              <thead className="bg-slate-50 uppercase tracking-[0.2em] text-slate-500 dark:bg-slate-950 dark:text-slate-400">
                <tr>
                  <th className="px-4 py-3 text-left">Name</th>
                  <th className="px-4 py-3 text-left">Email</th>
                  <th className="px-4 py-3 text-left">Batch</th>
                  <th className="px-4 py-3 text-left">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200 dark:divide-slate-800">
                {students.map((student) => (
                  <tr key={student.id} className="hover:bg-slate-50 dark:hover:bg-slate-950">
                    <td className="px-4 py-4 text-slate-900 dark:text-white">{student.name}</td>
                    <td className="px-4 py-4 text-slate-500 dark:text-slate-300">{student.email}</td>
                    <td className="px-4 py-4 text-slate-500 dark:text-slate-300">{batches.find((batch) => batch.id === student.batchId)?.name}</td>
                    <td className="px-4 py-4 space-x-2">
                      <button type="button" onClick={() => handleEdit(student)} className="rounded-full bg-brand-600 px-3 py-2 text-xs font-semibold text-white transition hover:bg-brand-700">Edit</button>
                      <button type="button" onClick={() => handleDelete(student.id)} className="rounded-full bg-rose-600 px-3 py-2 text-xs font-semibold text-white transition hover:bg-rose-700">Delete</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      </div>
    </div>
  )
}

export default StudentsPage
