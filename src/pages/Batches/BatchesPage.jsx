import { useMemo, useState } from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'react-toastify'
import { useAttendance } from '../../context/AttendanceContext.jsx'
import Header from '../../components/Layout/Header.jsx'

const BatchesPage = () => {
  const { batches, addBatch, updateBatch, removeBatch } = useAttendance()
  const [editId, setEditId] = useState(null)
  const { register, handleSubmit, reset } = useForm()

  const onSubmit = (data) => {
    if (editId) {
      updateBatch(editId, data)
      toast.success('Batch updated')
      setEditId(null)
    } else {
      addBatch(data)
      toast.success('Batch added')
    }
    reset()
  }

  const handleEdit = (batch) => {
    setEditId(batch.id)
    reset(batch)
  }

  const handleDelete = (id) => {
    removeBatch(id)
    toast.success('Batch removed')
  }

  return (
    <div className="space-y-8 px-4 py-6 sm:px-6 lg:px-8">
      <Header title="Batches" subtitle="Manage learning cohorts" />
      <div className="grid gap-6 xl:grid-cols-3">
        <section className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-soft dark:border-slate-800 dark:bg-slate-900 xl:col-span-1">
          <h3 className="mb-4 text-xl font-semibold text-slate-900 dark:text-white">{editId ? 'Edit batch' : 'Add batch'}</h3>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <label className="block text-sm text-slate-700 dark:text-slate-200">
              Batch name
              <input {...register('name', { required: true })} className="mt-3 w-full rounded-3xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none dark:border-slate-800 dark:bg-slate-950 dark:text-white" />
            </label>
            <label className="block text-sm text-slate-700 dark:text-slate-200">
              Trainer
              <input {...register('trainer', { required: true })} className="mt-3 w-full rounded-3xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none dark:border-slate-800 dark:bg-slate-950 dark:text-white" />
            </label>
            <label className="block text-sm text-slate-700 dark:text-slate-200">
              Start date
              <input {...register('startDate', { required: true })} type="date" className="mt-3 w-full rounded-3xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none dark:border-slate-800 dark:bg-slate-950 dark:text-white" />
            </label>
            <label className="block text-sm text-slate-700 dark:text-slate-200">
              End date
              <input {...register('endDate', { required: true })} type="date" className="mt-3 w-full rounded-3xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none dark:border-slate-800 dark:bg-slate-950 dark:text-white" />
            </label>
            <button type="submit" className="w-full rounded-3xl bg-brand-600 px-4 py-3 text-sm font-semibold text-white transition hover:bg-brand-700">
              {editId ? 'Update batch' : 'Add batch'}
            </button>
          </form>
        </section>

        <section className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-soft dark:border-slate-800 dark:bg-slate-900 xl:col-span-2">
          <h3 className="mb-4 text-xl font-semibold text-slate-900 dark:text-white">Batch list</h3>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-slate-200 text-sm dark:divide-slate-800">
              <thead className="bg-slate-50 uppercase tracking-[0.2em] text-slate-500 dark:bg-slate-950 dark:text-slate-400">
                <tr>
                  <th className="px-4 py-3 text-left">Name</th>
                  <th className="px-4 py-3 text-left">Trainer</th>
                  <th className="px-4 py-3 text-left">Dates</th>
                  <th className="px-4 py-3 text-left">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200 dark:divide-slate-800">
                {batches.map((batch) => (
                  <tr key={batch.id} className="hover:bg-slate-50 dark:hover:bg-slate-950">
                    <td className="px-4 py-4 text-slate-900 dark:text-white">{batch.name}</td>
                    <td className="px-4 py-4 text-slate-500 dark:text-slate-300">{batch.trainer}</td>
                    <td className="px-4 py-4 text-slate-500 dark:text-slate-300">{batch.startDate} - {batch.endDate}</td>
                    <td className="px-4 py-4 space-x-2">
                      <button type="button" onClick={() => handleEdit(batch)} className="rounded-full bg-brand-600 px-3 py-2 text-xs font-semibold text-white transition hover:bg-brand-700">Edit</button>
                      <button type="button" onClick={() => handleDelete(batch.id)} className="rounded-full bg-rose-600 px-3 py-2 text-xs font-semibold text-white transition hover:bg-rose-700">Delete</button>
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

export default BatchesPage
