import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext.jsx'
import { toast } from 'react-toastify'

const LoginPage = () => {
  const navigate = useNavigate()
  const { login, user } = useAuth()
  const [form, setForm] = useState({ email: '', password: '', remember: false })

  const handleSubmit = (event) => {
    event.preventDefault()
    const success = login(form)
    if (success) {
      navigate('/')
    } else {
      toast.error('Unable to sign in. Check credentials.')
    }
  }

  return (
    <div className="min-h-screen bg-slate-100 px-4 py-14 text-slate-900 dark:bg-slate-950 dark:text-white sm:px-6 lg:px-8">
      <div className="mx-auto max-w-xl rounded-[2rem] border border-slate-200 bg-white px-8 py-10 shadow-soft dark:border-slate-800 dark:bg-slate-900 sm:px-10">
        <div className="mb-10 text-center">
          <p className="text-sm uppercase tracking-[0.3em] text-brand-600">Trainer Session</p>
          <h1 className="mt-4 text-4xl font-semibold">Welcome back</h1>
          <p className="mt-3 text-sm text-slate-500 dark:text-slate-400">Login with your trainer or manager account.</p>
        </div>
        <form onSubmit={handleSubmit} className="space-y-5">
          <label className="block text-sm font-medium text-slate-700 dark:text-slate-200">
            Email
            <input
              type="email"
              required
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              className="mt-3 w-full rounded-3xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-brand-400 focus:ring-2 focus:ring-brand-100 dark:border-slate-800 dark:bg-slate-950 dark:text-white"
            />
          </label>
          <label className="block text-sm font-medium text-slate-700 dark:text-slate-200">
            Password
            <input
              type="password"
              required
              value={form.password}
              onChange={(e) => setForm({ ...form, password: e.target.value })}
              className="mt-3 w-full rounded-3xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-brand-400 focus:ring-2 focus:ring-brand-100 dark:border-slate-800 dark:bg-slate-950 dark:text-white"
            />
          </label>
          <div className="flex items-center justify-between gap-3 text-sm text-slate-600 dark:text-slate-300">
            <label className="inline-flex items-center gap-2">
              <input
                type="checkbox"
                checked={form.remember}
                onChange={(e) => setForm({ ...form, remember: e.target.checked })}
                className="h-4 w-4 rounded border-slate-300 text-brand-600 focus:ring-brand-500"
              />
              Remember me
            </label>
            <span className="font-medium text-brand-600">Manager / Trainer Demo</span>
          </div>
          <button
            type="submit"
            className="w-full rounded-3xl bg-brand-600 px-4 py-3 text-sm font-semibold text-white transition hover:bg-brand-700"
          >
            Sign In
          </button>
        </form>
        <div className="mt-8 rounded-3xl bg-slate-50 p-5 text-sm text-slate-600 dark:bg-slate-950 dark:text-slate-300">
          <p className="font-semibold">Demo accounts</p>
          <p className="mt-2">Trainer: trainer@example.com / trainer123</p>
          <p>Manager: manager@example.com / manager123</p>
        </div>
      </div>
    </div>
  )
}

export default LoginPage
